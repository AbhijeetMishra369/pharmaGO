package com.pharmago.gatewayservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@SpringBootApplication
public class GatewayServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(GatewayServiceApplication.class, args);
    }

    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
                // User Service Routes
                .route("user-service", r -> r.path("/api/auth/**", "/api/users/**")
                        .uri("http://localhost:8081"))
                
                // Medicine Service Routes
                .route("medicine-service", r -> r.path("/api/medicines/**")
                        .uri("http://localhost:8082"))
                
                // Order Service Routes
                .route("order-service", r -> r.path("/api/orders/**")
                        .uri("http://localhost:8083"))
                
                // Notification Service Routes
                .route("notification-service", r -> r.path("/api/notifications/**", "/api/reminders/**")
                        .uri("http://localhost:8084"))
                
                .build();
    }

    @Bean
    public CorsWebFilter corsWebFilter() {
        CorsConfiguration corsConfig = new CorsConfiguration();
        
        // Specific allowed origins instead of wildcard to avoid conflicts
        corsConfig.setAllowedOrigins(List.of("http://localhost:3000"));
        
        // Allow credentials
        corsConfig.setAllowCredentials(true);
        
        // Set max age for preflight requests
        corsConfig.setMaxAge(3600L);
        
        // Allowed methods
        corsConfig.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
        
        // Allowed headers
        corsConfig.setAllowedHeaders(Arrays.asList(
            "Authorization", 
            "Content-Type", 
            "Accept", 
            "Origin", 
            "Access-Control-Request-Method", 
            "Access-Control-Request-Headers"
        ));
        
        // Exposed headers
        corsConfig.setExposedHeaders(Arrays.asList(
            "Access-Control-Allow-Origin",
            "Access-Control-Allow-Credentials",
            "Authorization"
        ));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfig);

        return new CorsWebFilter(source);
    }
}