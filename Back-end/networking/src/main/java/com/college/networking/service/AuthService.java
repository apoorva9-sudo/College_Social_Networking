package com.college.networking.service;

import com.college.networking.dto.request.LoginRequest;
import com.college.networking.dto.request.RegisterRequest;

public interface AuthService {

    String register(RegisterRequest request);

    String login(LoginRequest request);
}