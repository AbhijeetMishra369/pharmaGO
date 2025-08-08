package com.pharmago.common.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

/**
 * Detailed error information for API responses
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ErrorDetails {
    
    private String code;
    private String message;
    private String details;
    private List<String> validationErrors;
    private Map<String, String> fieldErrors;
    
    public static ErrorDetails of(String code, String message) {
        return ErrorDetails.builder()
                .code(code)
                .message(message)
                .build();
    }
    
    public static ErrorDetails of(String code, String message, String details) {
        return ErrorDetails.builder()
                .code(code)
                .message(message)
                .details(details)
                .build();
    }
    
    public static ErrorDetails validationError(String message, Map<String, String> fieldErrors) {
        return ErrorDetails.builder()
                .code("VALIDATION_ERROR")
                .message(message)
                .fieldErrors(fieldErrors)
                .build();
    }
}