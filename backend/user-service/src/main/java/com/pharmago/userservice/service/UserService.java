package com.pharmago.userservice.service;

import com.pharmago.userservice.dto.UserRegistrationDto;
import com.pharmago.userservice.dto.UserResponseDto;
import com.pharmago.userservice.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Map;

public interface UserService {

    UserResponseDto registerUser(UserRegistrationDto registrationDto);

    UserResponseDto getUserById(Long id);

    UserResponseDto getUserByEmail(String email);

    Page<UserResponseDto> getAllUsers(Pageable pageable);

    Page<UserResponseDto> getUsersWithFilters(String name, String email, User.Role role, Boolean isActive, Pageable pageable);

    UserResponseDto updateUser(Long id, UserRegistrationDto userDto);

    void deleteUser(Long id);

    void activateUser(Long id);

    void deactivateUser(Long id);

    boolean verifyEmailToken(String token);

    void sendPasswordResetEmail(String email);

    boolean resetPassword(String token, String newPassword);

    void resendEmailVerification(String email);

    Map<String, Object> getUserStatistics();

    boolean existsByEmail(String email);

    boolean existsByContactNumber(String contactNumber);
}