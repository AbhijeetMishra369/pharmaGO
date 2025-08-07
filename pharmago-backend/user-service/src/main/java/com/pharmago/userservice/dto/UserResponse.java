package com.pharmago.userservice.dto;

import com.pharmago.userservice.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * DTO for user response (excludes sensitive information)
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponse {

    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private User.Role role;
    private Boolean enabled;
    private Boolean emailVerified;
    private LocalDateTime lastLogin;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    // Address fields
    private String streetAddress;
    private String city;
    private String state;
    private String postalCode;
    private String country;
    
    // Computed field
    public String getFullName() {
        return firstName + " " + lastName;
    }
}