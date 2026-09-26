package com.college.networking.controller;

import com.college.networking.dto.request.LoginRequest;
import com.college.networking.dto.request.RegisterRequest;
import com.college.networking.exception.GlobalExceptionHandler;
import com.college.networking.exception.LoginException;
import com.college.networking.exception.UserAlreadyExists;
import com.college.networking.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@Validated
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@Valid @RequestBody RegisterRequest request) throws UserAlreadyExists {
        String res=authService.register(request);
        return new ResponseEntity<>(res, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@Valid @RequestBody LoginRequest request) throws LoginException {
        String res=authService.login(request);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }
}