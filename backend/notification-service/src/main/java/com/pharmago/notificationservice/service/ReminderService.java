package com.pharmago.notificationservice.service;

import com.pharmago.notificationservice.dto.ReminderRequestDto;
import com.pharmago.notificationservice.dto.ReminderResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Map;

public interface ReminderService {
    ReminderResponseDto createReminder(ReminderRequestDto reminderRequest);
    ReminderResponseDto getReminderById(Long id);
    Page<ReminderResponseDto> getAllReminders(Pageable pageable);
    Page<ReminderResponseDto> getRemindersByUserId(Long userId, Pageable pageable);
    Page<ReminderResponseDto> getActiveRemindersByUserId(Long userId, Pageable pageable);
    ReminderResponseDto updateReminder(Long id, ReminderRequestDto reminderRequest);
    void deleteReminder(Long id);
    void deactivateReminder(Long id);
    void activateReminder(Long id);
    Map<String, Object> getReminderStatistics();
    void processScheduledReminders();
}