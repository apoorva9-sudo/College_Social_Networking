package com.college.networking.mapper;

import com.college.networking.dto.response.AdminUserResponse;
import com.college.networking.dto.response.MaterialResponse;
import com.college.networking.dto.response.UserProfileResponse;
import com.college.networking.dto.response.UserProfileResponse;
import com.college.networking.entity.Material;
import com.college.networking.entity.Role;
import com.college.networking.entity.User;

import java.util.stream.Collectors;

public class UserMapper {

    public static UserProfileResponse toProfileResponse(User user) {

        UserProfileResponse response = new UserProfileResponse();

        response.setUserId(user.getUserId());
        response.setFullName(user.getFullName());
        response.setEmail(user.getEmail());
        response.setPhone(user.getPhone());
        response.setStatus(user.getStatus());
        response.setLastLogin(user.getLastLogin());
        response.setCreatedAt(user.getCreatedAt());

        if (user.getRoles() != null) {
            response.setRoles(
                    user.getRoles()
                            .stream()
                            .map(Role::getRoleName)
                            .map(Enum::name)
                            .collect(Collectors.toSet())
            );
        }

        return response;
    }
    public static AdminUserResponse toAdminUserResponse(User user) {

        AdminUserResponse response = new AdminUserResponse();

        response.setUserId(user.getUserId());
        response.setFullName(user.getFullName());
        response.setEmail(user.getEmail());
        response.setPhone(user.getPhone());
        response.setStatus(user.getStatus());
        response.setLastLogin(user.getLastLogin());
        response.setLastLogout(user.getLastLogout());
        response.setCreatedAt(user.getCreatedAt());
        response.setUpdatedAt(user.getUpdatedAt());

        if (user.getRoles() != null) {
            response.setRoles(
                    user.getRoles()
                            .stream()
                            .map(Role::getRoleName)
                            .map(Enum::name)
                            .collect(Collectors.toSet())
            );
        }

        return response;
    }

}