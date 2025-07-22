package com.pharmago.userservice.service;

import com.pharmago.userservice.dto.UserRegistrationDto;
import com.pharmago.userservice.dto.UserResponseDto;
import com.pharmago.userservice.entity.User;
import com.pharmago.userservice.exception.ResourceNotFoundException;
import com.pharmago.userservice.exception.UserAlreadyExistsException;
import com.pharmago.userservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JavaMailSender mailSender;

    @Override
    public UserResponseDto registerUser(UserRegistrationDto registrationDto) {
        // Validate passwords match
        if (!registrationDto.getPassword().equals(registrationDto.getConfirmPassword())) {
            throw new IllegalArgumentException("Passwords do not match");
        }

        // Check if user already exists
        if (userRepository.existsByEmail(registrationDto.getEmail())) {
            throw new UserAlreadyExistsException("User already exists with email: " + registrationDto.getEmail());
        }

        if (userRepository.existsByContactNumber(registrationDto.getContactNumber())) {
            throw new UserAlreadyExistsException("User already exists with contact number: " + registrationDto.getContactNumber());
        }

        // Create new user
        User user = new User();
        user.setName(registrationDto.getName());
        user.setEmail(registrationDto.getEmail());
        user.setContactNumber(registrationDto.getContactNumber());
        user.setPassword(passwordEncoder.encode(registrationDto.getPassword()));
        user.setAddress(registrationDto.getAddress());
        user.setCity(registrationDto.getCity());
        user.setState(registrationDto.getState());
        user.setPostalCode(registrationDto.getPostalCode());
        user.setRole(User.Role.CUSTOMER);
        user.setIsActive(true);
        user.setIsEmailVerified(false);
        user.setEmailVerificationToken(UUID.randomUUID().toString());

        User savedUser = userRepository.save(user);

        // Send verification email
        sendVerificationEmail(savedUser);

        return new UserResponseDto(savedUser);
    }

    @Override
    @Transactional(readOnly = true)
    public UserResponseDto getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        return new UserResponseDto(user);
    }

    @Override
    @Transactional(readOnly = true)
    public UserResponseDto getUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
        return new UserResponseDto(user);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<UserResponseDto> getAllUsers(Pageable pageable) {
        Page<User> users = userRepository.findAll(pageable);
        return users.map(UserResponseDto::new);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<UserResponseDto> getUsersWithFilters(String name, String email, User.Role role, Boolean isActive, Pageable pageable) {
        Page<User> users = userRepository.findUsersWithFilters(name, email, role, isActive, pageable);
        return users.map(UserResponseDto::new);
    }

    @Override
    public UserResponseDto updateUser(Long id, UserRegistrationDto userDto) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));

        // Check if email is being changed and if it already exists
        if (!user.getEmail().equals(userDto.getEmail()) && userRepository.existsByEmail(userDto.getEmail())) {
            throw new UserAlreadyExistsException("User already exists with email: " + userDto.getEmail());
        }

        // Check if contact number is being changed and if it already exists
        if (!user.getContactNumber().equals(userDto.getContactNumber()) && userRepository.existsByContactNumber(userDto.getContactNumber())) {
            throw new UserAlreadyExistsException("User already exists with contact number: " + userDto.getContactNumber());
        }

        // Update user fields
        user.setName(userDto.getName());
        user.setEmail(userDto.getEmail());
        user.setContactNumber(userDto.getContactNumber());
        user.setAddress(userDto.getAddress());
        user.setCity(userDto.getCity());
        user.setState(userDto.getState());
        user.setPostalCode(userDto.getPostalCode());

        // Update password if provided
        if (userDto.getPassword() != null && !userDto.getPassword().isEmpty()) {
            if (!userDto.getPassword().equals(userDto.getConfirmPassword())) {
                throw new IllegalArgumentException("Passwords do not match");
            }
            user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        }

        User updatedUser = userRepository.save(user);
        return new UserResponseDto(updatedUser);
    }

    @Override
    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        userRepository.delete(user);
    }

    @Override
    public void activateUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        user.setIsActive(true);
        userRepository.save(user);
    }

    @Override
    public void deactivateUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        user.setIsActive(false);
        userRepository.save(user);
    }

    @Override
    public boolean verifyEmailToken(String token) {
        User user = userRepository.findByEmailVerificationToken(token)
                .orElse(null);

        if (user != null) {
            user.setIsEmailVerified(true);
            user.setEmailVerificationToken(null);
            userRepository.save(user);
            return true;
        }
        return false;
    }

    @Override
    public void sendPasswordResetEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));

        String resetToken = UUID.randomUUID().toString();
        user.setPasswordResetToken(resetToken);
        user.setPasswordResetExpires(LocalDateTime.now().plusHours(1)); // Token expires in 1 hour
        userRepository.save(user);

        // Send password reset email
        sendPasswordResetEmailToUser(user, resetToken);
    }

    @Override
    public boolean resetPassword(String token, String newPassword) {
        User user = userRepository.findByPasswordResetToken(token)
                .orElse(null);

        if (user != null && user.getPasswordResetExpires().isAfter(LocalDateTime.now())) {
            user.setPassword(passwordEncoder.encode(newPassword));
            user.setPasswordResetToken(null);
            user.setPasswordResetExpires(null);
            userRepository.save(user);
            return true;
        }
        return false;
    }

    @Override
    public void resendEmailVerification(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));

        if (user.getIsEmailVerified()) {
            throw new IllegalArgumentException("Email is already verified");
        }

        user.setEmailVerificationToken(UUID.randomUUID().toString());
        userRepository.save(user);

        sendVerificationEmail(user);
    }

    @Override
    @Transactional(readOnly = true)
    public Map<String, Object> getUserStatistics() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUsers", userRepository.count());
        stats.put("activeUsers", userRepository.countActiveUsers());
        stats.put("verifiedUsers", userRepository.countVerifiedUsers());
        stats.put("customers", userRepository.countByRole(User.Role.CUSTOMER));
        stats.put("admins", userRepository.countByRole(User.Role.ADMIN));
        return stats;
    }

    @Override
    @Transactional(readOnly = true)
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    @Transactional(readOnly = true)
    public boolean existsByContactNumber(String contactNumber) {
        return userRepository.existsByContactNumber(contactNumber);
    }

    private void sendVerificationEmail(User user) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(user.getEmail());
            message.setSubject("PharmaGo - Email Verification");
            message.setText("Please click the following link to verify your email address:\n" +
                    "http://localhost:3000/verify-email?token=" + user.getEmailVerificationToken());
            mailSender.send(message);
        } catch (Exception e) {
            // Log the error but don't fail the registration
            System.err.println("Failed to send verification email: " + e.getMessage());
        }
    }

    private void sendPasswordResetEmailToUser(User user, String resetToken) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(user.getEmail());
            message.setSubject("PharmaGo - Password Reset");
            message.setText("Please click the following link to reset your password:\n" +
                    "http://localhost:3000/reset-password?token=" + resetToken);
            mailSender.send(message);
        } catch (Exception e) {
            // Log the error but don't fail the password reset request
            System.err.println("Failed to send password reset email: " + e.getMessage());
        }
    }
}