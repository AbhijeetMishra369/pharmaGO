package com.pharmago.userservice.service;

import com.pharmago.userservice.dto.*;
import com.pharmago.userservice.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service interface for User management
 */
public interface UserService {

    /**
     * Register a new user
     */
    UserResponse registerUser(UserRegistrationRequest request);

    /**
     * Login user
     */
    LoginResponse loginUser(LoginRequest request);

    /**
     * Refresh access token
     */
    LoginResponse refreshToken(String refreshToken);

    /**
     * Get user by ID
     */
    UserResponse getUserById(Long userId);

    /**
     * Get user by email
     */
    UserResponse getUserByEmail(String email);

    /**
     * Update user profile
     */
    UserResponse updateUserProfile(Long userId, UserUpdateRequest request);

    /**
     * Change user password
     */
    void changePassword(Long userId, PasswordChangeRequest request);

    /**
     * Initiate password reset
     */
    void initiatePasswordReset(String email);

    /**
     * Reset password with token
     */
    void resetPassword(String token, String newPassword);

    /**
     * Verify email with token
     */
    void verifyEmail(String token);

    /**
     * Resend email verification
     */
    void resendEmailVerification(String email);

    /**
     * Get all users (admin only)
     */
    Page<UserResponse> getAllUsers(Pageable pageable);

    /**
     * Search users (admin only)
     */
    Page<UserResponse> searchUsers(String searchTerm, Pageable pageable);

    /**
     * Get users by role (admin only)
     */
    Page<UserResponse> getUsersByRole(User.Role role, Pageable pageable);

    /**
     * Enable/disable user (admin only)
     */
    UserResponse toggleUserStatus(Long userId, Boolean enabled);

    /**
     * Delete user (admin only)
     */
    void deleteUser(Long userId);

    /**
     * Get user statistics (admin only)
     */
    UserStatsResponse getUserStatistics();

    /**
     * Convert User entity to UserResponse DTO
     */
    UserResponse convertToUserResponse(User user);

    /**
     * Get current authenticated user
     */
    UserResponse getCurrentUser();
}