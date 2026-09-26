package com.college.networking.service;

import com.college.networking.dto.request.AdminUpdateUserRequest;
import com.college.networking.dto.request.UpdateProfileRequest;
import com.college.networking.dto.request.UpdateUserRequest;
import com.college.networking.dto.request.UpdateUserStatusRequest;
import com.college.networking.dto.response.AdminUserResponse;
import com.college.networking.dto.response.UserProfileResponse;
import com.college.networking.dto.response.UserResponse;
import org.springframework.data.domain.Page;

import java.util.List;

public interface UserService {

    // Admin, user
    UserResponse getUserById(Integer id, String loggedInEmail);

    UserResponse updateUser(Integer id, UpdateUserRequest request, String loggedInEmail);

    UserResponse getUserByEmail(String email);


    //Admin
    Page<UserResponse> getAllUsers(
            int page,
            int size,
            String sortBy,
            String direction,
            String search
    );

    UserResponse getUserByIdForAdmin(Integer id);

    UserResponse updateUserStatus(
            Integer id,
            UpdateUserStatusRequest request
    );

    void deleteUser(Integer id);



    // Logged-in user's own profile

    UserProfileResponse getMyProfile(String email);

    UserProfileResponse updateMyProfile(
            String email,
            UpdateProfileRequest request
    );



}