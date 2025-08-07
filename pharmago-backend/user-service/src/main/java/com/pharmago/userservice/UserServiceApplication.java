package com.pharmago.userservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.ComponentScan;

/**
 * Main application class for PharmaGo User Service
 */
@SpringBootApplication
@EnableDiscoveryClient
@ComponentScan(basePackages = {"com.pharmago.userservice", "com.pharmago.common"})
public class UserServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(UserServiceApplication.class, args);
    }
}