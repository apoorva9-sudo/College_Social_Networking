package com.college.networking.dto.response;



import lombok.Data;

import java.time.LocalDateTime;
import java.util.Set;

@Data
public class UserProfileResponse {

    private Integer userId;

    private String fullName;

    private String email;

    private String phone;

    private String status;

    private Set<String> roles;

    private LocalDateTime lastLogin;

    private LocalDateTime createdAt;
}