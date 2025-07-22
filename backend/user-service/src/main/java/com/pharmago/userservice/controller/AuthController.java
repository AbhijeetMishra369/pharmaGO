package com.pharmago.userservice.controller;

import com.pharmago.userservice.dto.JwtResponseDto;
import com.pharmago.userservice.dto.UserLoginDto;
import com.pharmago.userservice.dto.UserRegistrationDto;
import com.pharmago.userservice.dto.UserResponseDto;
import com.pharmago.userservice.entity.User;
import com.pharmago.userservice.security.JwtUtils;
import com.pharmago.userservice.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*", maxAge = 3600)
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtils jwtUtils;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody UserLoginDto loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        User userDetails = (User) authentication.getPrincipal();

        JwtResponseDto jwtResponse = new JwtResponseDto(
                jwt,
                userDetails.getId(),
                userDetails.getName(),
                userDetails.getEmail(),
                userDetails.getRole().name()
        );

        return ResponseEntity.ok(jwtResponse);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody UserRegistrationDto signUpRequest) {
        UserResponseDto user = userService.registerUser(signUpRequest);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "User registered successfully! Please check your email for verification.");
        response.put("user", user);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(@RequestHeader("Authorization") String authHeader) {
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            if (jwtUtils.validateJwtToken(token)) {
                String username = jwtUtils.getUserNameFromJwtToken(token);
                String newToken = jwtUtils.generateTokenFromUsername(username);
                
                Map<String, String> response = new HashMap<>();
                response.put("token", newToken);
                response.put("type", "Bearer");
                
                return ResponseEntity.ok(response);
            }
        }
        
        return ResponseEntity.badRequest().body("Invalid token");
    }

    @PostMapping("/signout")
    public ResponseEntity<?> logoutUser() {
        SecurityContextHolder.clearContext();
        
        Map<String, String> response = new HashMap<>();
        response.put("message", "You've been signed out successfully!");
        
        return ResponseEntity.ok(response);
    }
}