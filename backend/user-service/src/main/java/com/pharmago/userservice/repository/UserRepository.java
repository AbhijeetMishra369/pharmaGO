package com.pharmago.userservice.repository;

import com.pharmago.userservice.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    Optional<User> findByContactNumber(String contactNumber);

    Optional<User> findByEmailVerificationToken(String token);

    Optional<User> findByPasswordResetToken(String token);

    boolean existsByEmail(String email);

    boolean existsByContactNumber(String contactNumber);

    @Query("SELECT u FROM User u WHERE u.role = 'CUSTOMER'")
    Page<User> findAllCustomers(Pageable pageable);

    @Query("SELECT u FROM User u WHERE u.role = 'ADMIN'")
    Page<User> findAllAdmins(Pageable pageable);

    @Query("SELECT u FROM User u WHERE " +
           "(:name IS NULL OR LOWER(u.name) LIKE LOWER(CONCAT('%', :name, '%'))) AND " +
           "(:email IS NULL OR LOWER(u.email) LIKE LOWER(CONCAT('%', :email, '%'))) AND " +
           "(:role IS NULL OR u.role = :role) AND " +
           "(:isActive IS NULL OR u.isActive = :isActive)")
    Page<User> findUsersWithFilters(@Param("name") String name,
                                   @Param("email") String email,
                                   @Param("role") User.Role role,
                                   @Param("isActive") Boolean isActive,
                                   Pageable pageable);

    long countByRole(User.Role role);

    @Query("SELECT COUNT(u) FROM User u WHERE u.isActive = true")
    long countActiveUsers();

    @Query("SELECT COUNT(u) FROM User u WHERE u.isEmailVerified = true")
    long countVerifiedUsers();
}