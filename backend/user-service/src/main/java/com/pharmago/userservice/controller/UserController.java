package com.pharmago.userservice.controller;

import com.pharmago.userservice.dto.UserRegistrationDto;
import com.pharmago.userservice.dto.UserResponseDto;
import com.pharmago.userservice.entity.User;
import com.pharmago.userservice.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*", maxAge = 3600)
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/profile")
    @PreAuthorize("hasRole('CUSTOMER') or hasRole('ADMIN')")
    public ResponseEntity<UserResponseDto> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        UserResponseDto user = userService.getUserByEmail(email);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/profile")
    @PreAuthorize("hasRole('CUSTOMER') or hasRole('ADMIN')")
    public ResponseEntity<UserResponseDto> updateProfile(@Valid @RequestBody UserRegistrationDto userDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();
        UserResponseDto updatedUser = userService.updateUser(currentUser.getId(), userDto);
        return ResponseEntity.ok(updatedUser);
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Page<UserResponseDto>> getAllUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) String role,
            @RequestParam(required = false) Boolean isActive) {

        Sort sort = sortDir.equalsIgnoreCase("desc") ? 
            Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);

        User.Role userRole = null;
        if (role != null && !role.isEmpty()) {
            try {
                userRole = User.Role.valueOf(role.toUpperCase());
            } catch (IllegalArgumentException e) {
                // Invalid role, ignore
            }
        }

        Page<UserResponseDto> users = userService.getUsersWithFilters(name, email, userRole, isActive, pageable);
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserResponseDto> getUserById(@PathVariable Long id) {
        UserResponseDto user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserResponseDto> updateUser(@PathVariable Long id, @Valid @RequestBody UserRegistrationDto userDto) {
        UserResponseDto updatedUser = userService.updateUser(id, userDto);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", "User deleted successfully");
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}/activate")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> activateUser(@PathVariable Long id) {
        userService.activateUser(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", "User activated successfully");
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}/deactivate")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deactivateUser(@PathVariable Long id) {
        userService.deactivateUser(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", "User deactivated successfully");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/verify-email")
    public ResponseEntity<?> verifyEmail(@RequestParam String token) {
        boolean verified = userService.verifyEmailToken(token);
        Map<String, Object> response = new HashMap<>();
        if (verified) {
            response.put("message", "Email verified successfully");
            response.put("success", true);
        } else {
            response.put("message", "Invalid or expired verification token");
            response.put("success", false);
        }
        return ResponseEntity.ok(response);
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestParam String email) {
        userService.sendPasswordResetEmail(email);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Password reset email sent successfully");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestParam String token, @RequestParam String newPassword) {
        boolean reset = userService.resetPassword(token, newPassword);
        Map<String, Object> response = new HashMap<>();
        if (reset) {
            response.put("message", "Password reset successfully");
            response.put("success", true);
        } else {
            response.put("message", "Invalid or expired reset token");
            response.put("success", false);
        }
        return ResponseEntity.ok(response);
    }

    @PostMapping("/resend-verification")
    public ResponseEntity<?> resendVerification(@RequestParam String email) {
        userService.resendEmailVerification(email);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Verification email sent successfully");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/check-email")
    public ResponseEntity<?> checkEmail(@RequestParam String email) {
        boolean exists = userService.existsByEmail(email);
        Map<String, Boolean> response = new HashMap<>();
        response.put("exists", exists);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/check-contact")
    public ResponseEntity<?> checkContact(@RequestParam String contactNumber) {
        boolean exists = userService.existsByContactNumber(contactNumber);
        Map<String, Boolean> response = new HashMap<>();
        response.put("exists", exists);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/statistics")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> getUserStatistics() {
        Map<String, Object> stats = userService.getUserStatistics();
        return ResponseEntity.ok(stats);
    }
}