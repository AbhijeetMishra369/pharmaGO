package com.pharmago.notificationservice.dto;

import com.pharmago.notificationservice.entity.Reminder;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

public class ReminderResponseDto {

    private Long id;
    private Long userId;
    private Long medicineId;
    private String medicineName;
    private String dosage;
    private String frequency;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private List<LocalTime> reminderTimes;
    private Boolean isActive;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String notes;

    // Constructor from Reminder entity
    public ReminderResponseDto(Reminder reminder) {
        this.id = reminder.getId();
        this.userId = reminder.getUserId();
        this.medicineId = reminder.getMedicineId();
        this.medicineName = reminder.getMedicineName();
        this.dosage = reminder.getDosage();
        this.frequency = reminder.getFrequency();
        this.startDate = reminder.getStartDate();
        this.endDate = reminder.getEndDate();
        this.reminderTimes = reminder.getReminderTimes();
        this.isActive = reminder.getIsActive();
        this.createdAt = reminder.getCreatedAt();
        this.updatedAt = reminder.getUpdatedAt();
        this.notes = reminder.getNotes();
    }

    // Default constructor
    public ReminderResponseDto() {}

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getMedicineId() {
        return medicineId;
    }

    public void setMedicineId(Long medicineId) {
        this.medicineId = medicineId;
    }

    public String getMedicineName() {
        return medicineName;
    }

    public void setMedicineName(String medicineName) {
        this.medicineName = medicineName;
    }

    public String getDosage() {
        return dosage;
    }

    public void setDosage(String dosage) {
        this.dosage = dosage;
    }

    public String getFrequency() {
        return frequency;
    }

    public void setFrequency(String frequency) {
        this.frequency = frequency;
    }

    public LocalDateTime getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDateTime startDate) {
        this.startDate = startDate;
    }

    public LocalDateTime getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDateTime endDate) {
        this.endDate = endDate;
    }

    public List<LocalTime> getReminderTimes() {
        return reminderTimes;
    }

    public void setReminderTimes(List<LocalTime> reminderTimes) {
        this.reminderTimes = reminderTimes;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}