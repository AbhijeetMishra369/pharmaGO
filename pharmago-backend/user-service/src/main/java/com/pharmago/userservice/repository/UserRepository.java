package com.pharmago.userservice.repository;

import com.pharmago.userservice.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

/**
 * Repository interface for User entity
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * Find user by email
     */
    Optional<User> findByEmail(String email);

    /**
     * Find user by verification token
     */
    Optional<User> findByVerificationToken(String verificationToken);

    /**
     * Find user by password reset token
     */
    Optional<User> findByPasswordResetToken(String passwordResetToken);

    /**
     * Check if user exists by email
     */
    boolean existsByEmail(String email);

    /**
     * Find users by role
     */
    Page<User> findByRole(User.Role role, Pageable pageable);

    /**
     * Find users by enabled status
     */
    Page<User> findByEnabled(Boolean enabled, Pageable pageable);

    /**
     * Find users by email verification status
     */
    Page<User> findByEmailVerified(Boolean emailVerified, Pageable pageable);

    /**
     * Search users by name or email
     */
    @Query("SELECT u FROM User u WHERE " +
           "LOWER(u.firstName) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(u.lastName) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(u.email) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    Page<User> searchUsers(@Param("searchTerm") String searchTerm, Pageable pageable);

    /**
     * Find users created between dates
     */
    @Query("SELECT u FROM User u WHERE u.createdAt BETWEEN :startDate AND :endDate")
    Page<User> findUsersCreatedBetween(@Param("startDate") LocalDateTime startDate, 
                                       @Param("endDate") LocalDateTime endDate, 
                                       Pageable pageable);

    /**
     * Update last login time
     */
    @Modifying
    @Query("UPDATE User u SET u.lastLogin = :lastLogin WHERE u.id = :userId")
    void updateLastLoginTime(@Param("userId") Long userId, @Param("lastLogin") LocalDateTime lastLogin);

    /**
     * Update email verification status
     */
    @Modifying
    @Query("UPDATE User u SET u.emailVerified = :verified, u.verificationToken = null WHERE u.id = :userId")
    void updateEmailVerificationStatus(@Param("userId") Long userId, @Param("verified") Boolean verified);

    /**
     * Update password reset token
     */
    @Modifying
    @Query("UPDATE User u SET u.passwordResetToken = :token, u.passwordResetTokenExpiry = :expiry WHERE u.id = :userId")
    void updatePasswordResetToken(@Param("userId") Long userId, 
                                  @Param("token") String token, 
                                  @Param("expiry") LocalDateTime expiry);

    /**
     * Clear password reset token
     */
    @Modifying
    @Query("UPDATE User u SET u.passwordResetToken = null, u.passwordResetTokenExpiry = null WHERE u.id = :userId")
    void clearPasswordResetToken(@Param("userId") Long userId);

    /**
     * Count users by role
     */
    long countByRole(User.Role role);

    /**
     * Count active users
     */
    long countByEnabled(Boolean enabled);

    /**
     * Count verified users
     */
    long countByEmailVerified(Boolean emailVerified);

    /**
     * Find users with expired password reset tokens
     */
    @Query("SELECT u FROM User u WHERE u.passwordResetTokenExpiry < :currentTime")
    Page<User> findUsersWithExpiredPasswordResetTokens(@Param("currentTime") LocalDateTime currentTime, 
                                                       Pageable pageable);
}