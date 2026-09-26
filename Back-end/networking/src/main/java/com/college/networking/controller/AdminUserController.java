package com.college.networking.controller;

import com.college.networking.dto.request.UpdateUserRequest;
import com.college.networking.dto.request.UpdateUserStatusRequest;
import com.college.networking.dto.response.UserResponse;
import com.college.networking.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/users")
@CrossOrigin
public class AdminUserController {
    @Autowired
    private UserService userService;

    @GetMapping
    public Page<UserResponse> getAllUsers(

            @RequestParam(defaultValue = "0")
            int page,

            @RequestParam(defaultValue = "10")
            int size,

            @RequestParam(defaultValue = "userId")
            String sortBy,

            @RequestParam(defaultValue = "asc")
            String direction,

            @RequestParam(required = false)
            String search) {

        return userService.getAllUsers(
                page,
                size,
                sortBy,
                direction,
                search
        );
    }
    @GetMapping("/{id}")
    public UserResponse getUserById(@PathVariable Integer id) {
        return userService.getUserByIdForAdmin(id);
    }

    @PutMapping("/{id}/status")
    public UserResponse updateUserStatus(
            @PathVariable Integer id,
            @Valid @RequestBody UpdateUserStatusRequest request) {

        return userService.updateUserStatus(id, request);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserResponse> updateUser(
            @PathVariable Integer id,
            @Valid @RequestBody UpdateUserRequest request,
            @AuthenticationPrincipal String email) {

        UserResponse response =
                userService.updateUser(id, request, email);

        return ResponseEntity.ok(response);
    }
}
