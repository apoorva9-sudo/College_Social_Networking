package com.college.networking.controller;

import com.college.networking.dto.request.UpdateProfileRequest;
import com.college.networking.dto.request.UpdateUserRequest;
import com.college.networking.dto.response.UserProfileResponse;
import com.college.networking.dto.response.UserResponse;
import com.college.networking.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    // 🔹 GET profile
    @GetMapping("/{id}")
    public UserResponse getUser(@PathVariable Integer id,
                                Authentication auth) {

        String email = auth.getName();
        return userService.getUserById(id, email);
    }

    // 🔹 UPDATE profile
    @PutMapping("/{id}")
    public UserResponse updateUser(@PathVariable Integer id,
                                   @Valid @RequestBody UpdateUserRequest request,
                                   Authentication auth) {

        String email = auth.getName();
        return userService.updateUser(id, request, email);
    }
    //17-7-26 gpt
//    @GetMapping("/me")
//    public UserResponse getMyProfile(Authentication auth) {
//
//        String email = auth.getName();
//
//        return userService.getUserByEmail(email);
//    }
    @GetMapping("/me")
    public ResponseEntity<UserProfileResponse> getMyProfile(
            @AuthenticationPrincipal String email) {

        UserProfileResponse response =
                userService.getMyProfile(email);

        return ResponseEntity.ok(response);
    }

    @PutMapping("/me")
    public ResponseEntity<UserProfileResponse> updateMyProfile(
            @AuthenticationPrincipal String email,
            @Valid @RequestBody UpdateProfileRequest request) {

        UserProfileResponse response =
                userService.updateMyProfile(email, request);

        return ResponseEntity.ok(response);
    }
}