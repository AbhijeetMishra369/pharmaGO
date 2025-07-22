package com.pharmago.notificationservice.service;

import com.pharmago.notificationservice.dto.ReminderRequestDto;
import com.pharmago.notificationservice.dto.ReminderResponseDto;
import com.pharmago.notificationservice.entity.Reminder;
import com.pharmago.notificationservice.repository.ReminderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class ReminderServiceImpl implements ReminderService {

    @Autowired
    private ReminderRepository reminderRepository;

    @Autowired
    private JavaMailSender mailSender;

    @Override
    public ReminderResponseDto createReminder(ReminderRequestDto reminderRequest) {
        Reminder reminder = new Reminder();
        reminder.setUserId(reminderRequest.getUserId());
        reminder.setMedicineId(reminderRequest.getMedicineId());
        reminder.setMedicineName(reminderRequest.getMedicineName());
        reminder.setDosage(reminderRequest.getDosage());
        reminder.setFrequency(reminderRequest.getFrequency());
        reminder.setStartDate(reminderRequest.getStartDate());
        reminder.setEndDate(reminderRequest.getEndDate());
        reminder.setReminderTimes(reminderRequest.getReminderTimes());
        reminder.setNotes(reminderRequest.getNotes());
        reminder.setIsActive(true);

        Reminder savedReminder = reminderRepository.save(reminder);
        return new ReminderResponseDto(savedReminder);
    }

    @Override
    public ReminderResponseDto getReminderById(Long id) {
        Reminder reminder = reminderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reminder not found with id: " + id));
        return new ReminderResponseDto(reminder);
    }

    @Override
    public Page<ReminderResponseDto> getAllReminders(Pageable pageable) {
        Page<Reminder> reminders = reminderRepository.findAll(pageable);
        return reminders.map(ReminderResponseDto::new);
    }

    @Override
    public Page<ReminderResponseDto> getRemindersByUserId(Long userId, Pageable pageable) {
        Page<Reminder> reminders = reminderRepository.findByUserId(userId, pageable);
        return reminders.map(ReminderResponseDto::new);
    }

    @Override
    public Page<ReminderResponseDto> getActiveRemindersByUserId(Long userId, Pageable pageable) {
        Page<Reminder> reminders = reminderRepository.findByUserIdAndIsActive(userId, true, pageable);
        return reminders.map(ReminderResponseDto::new);
    }

    @Override
    public ReminderResponseDto updateReminder(Long id, ReminderRequestDto reminderRequest) {
        Reminder reminder = reminderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reminder not found with id: " + id));

        reminder.setMedicineName(reminderRequest.getMedicineName());
        reminder.setDosage(reminderRequest.getDosage());
        reminder.setFrequency(reminderRequest.getFrequency());
        reminder.setStartDate(reminderRequest.getStartDate());
        reminder.setEndDate(reminderRequest.getEndDate());
        reminder.setReminderTimes(reminderRequest.getReminderTimes());
        reminder.setNotes(reminderRequest.getNotes());

        Reminder updatedReminder = reminderRepository.save(reminder);
        return new ReminderResponseDto(updatedReminder);
    }

    @Override
    public void deleteReminder(Long id) {
        if (!reminderRepository.existsById(id)) {
            throw new RuntimeException("Reminder not found with id: " + id);
        }
        reminderRepository.deleteById(id);
    }

    @Override
    public void deactivateReminder(Long id) {
        Reminder reminder = reminderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reminder not found with id: " + id));
        reminder.setIsActive(false);
        reminderRepository.save(reminder);
    }

    @Override
    public void activateReminder(Long id) {
        Reminder reminder = reminderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reminder not found with id: " + id));
        reminder.setIsActive(true);
        reminderRepository.save(reminder);
    }

    @Override
    public Map<String, Object> getReminderStatistics() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalReminders", reminderRepository.count());
        stats.put("activeReminders", reminderRepository.countActiveReminders());
        return stats;
    }

    @Override
    @Scheduled(cron = "0 * * * * *") // Run every minute
    public void processScheduledReminders() {
        LocalTime currentTime = LocalTime.now().withSecond(0).withNano(0);
        List<Reminder> reminders = reminderRepository.findActiveRemindersForTime(currentTime);
        
        for (Reminder reminder : reminders) {
            sendReminderNotification(reminder);
        }
    }

    private void sendReminderNotification(Reminder reminder) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo("user@example.com"); // This should be fetched from user service
            message.setSubject("Medicine Reminder - " + reminder.getMedicineName());
            message.setText(String.format(
                "Dear User,\n\n" +
                "This is a reminder to take your medicine:\n\n" +
                "Medicine: %s\n" +
                "Dosage: %s\n" +
                "Frequency: %s\n" +
                "Notes: %s\n\n" +
                "Please take your medicine as prescribed.\n\n" +
                "Best regards,\n" +
                "PharmaGo Team",
                reminder.getMedicineName(),
                reminder.getDosage() != null ? reminder.getDosage() : "As prescribed",
                reminder.getFrequency() != null ? reminder.getFrequency() : "As prescribed",
                reminder.getNotes() != null ? reminder.getNotes() : "N/A"
            ));
            
            mailSender.send(message);
        } catch (Exception e) {
            // Log the error - in production, use proper logging
            System.err.println("Failed to send reminder notification: " + e.getMessage());
        }
    }
}