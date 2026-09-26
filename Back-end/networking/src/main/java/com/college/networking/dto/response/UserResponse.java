package com.college.networking.dto.response;

import lombok.Data;

@Data
public class UserResponse {

    private Integer userId;
    private String fullName;
    private String email;
    private String phone;
    private String status;
}