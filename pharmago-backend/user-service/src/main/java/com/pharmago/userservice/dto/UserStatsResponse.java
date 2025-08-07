package com.pharmago.userservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for user statistics response
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserStatsResponse {

    private long totalUsers;
    private long activeUsers;
    private long inactiveUsers;
    private long verifiedUsers;
    private long unverifiedUsers;
    private long customersCount;
    private long adminsCount;
    private long pharmacistsCount;
    private long usersRegisteredToday;
    private long usersRegisteredThisWeek;
    private long usersRegisteredThisMonth;
}