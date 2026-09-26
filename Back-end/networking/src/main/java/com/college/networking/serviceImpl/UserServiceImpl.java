package com.college.networking.serviceImpl;

import com.college.networking.dto.request.UpdateProfileRequest;
import com.college.networking.dto.request.UpdateUserRequest;
import com.college.networking.dto.request.UpdateUserStatusRequest;
import com.college.networking.dto.response.UserProfileResponse;
import com.college.networking.dto.response.UserResponse;
import com.college.networking.entity.User;
import com.college.networking.exception.UserNotFoundException;
import com.college.networking.mapper.UserMapper;
import com.college.networking.repository.UserRepository;
import com.college.networking.service.UserService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    // 🔹 Get user
    @Override
    public UserResponse getUserById(Integer id, String email)  {

        User loggedInUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("service.user.notfound"));

        User targetUser = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("service.user.notfound"));

        // 🔐 Allow only self OR admin
        boolean isAdmin = loggedInUser.getRoles().stream()
                .anyMatch(r -> r.getRoleName().name().equals("ADMIN"));

        if (!loggedInUser.getUserId().equals(id) && !isAdmin) {
            throw new RuntimeException("Access denied");
        }

        return mapToResponse(targetUser);
    }

    // 🔹 Update user
    @Override
    @Transactional
    public UserResponse updateUser(
            Integer id,
            UpdateUserRequest request,
            String email) {

        User loggedInUser = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UserNotFoundException("Logged-in user not found")
                );

        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new UserNotFoundException("Target user not found")
                );

        boolean isAdmin = loggedInUser.getRoles()
                .stream()
                .anyMatch(role ->
                        role.getRoleName().name().equals("ADMIN")
                );

        // Only the user themselves or an ADMIN can update
        if (!loggedInUser.getUserId().equals(id) && !isAdmin) {
            throw new RuntimeException("Access denied");
        }

        user.setFullName(request.getFullName());
        user.setPhone(request.getPhone());

        User updatedUser = userRepository.save(user);

        return mapToResponse(updatedUser);
    }

    // 🔹 Mapper
    private UserResponse mapToResponse(User user) {
        UserResponse res = new UserResponse();
        res.setUserId(user.getUserId());
        res.setFullName(user.getFullName());
        res.setEmail(user.getEmail());
        res.setPhone(user.getPhone());
        res.setStatus(user.getStatus());
        return res;
    }
    public UserResponse getUserByEmail(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("service.user.notfound"));

        return mapToResponse(user);
    }

    @Override
    public Page<UserResponse> getAllUsers(
            int page,
            int size,
            String sortBy,
            String direction,
            String search) {

        List<String> allowedFields = List.of(
                "userId",
                "fullName",
                "email",
                "status",
                "createdAt"
        );

        if (!allowedFields.contains(sortBy)) {
            sortBy = "userId";
        }

        Sort sort;

        if (direction.equalsIgnoreCase("desc")) {
            sort = Sort.by(sortBy).descending();
        } else {
            sort = Sort.by(sortBy).ascending();
        }

        Pageable pageable =
                PageRequest.of(page, size, sort);

        Page<User> users;

        if (search == null || search.trim().isEmpty()) {

            users = userRepository.findAll(pageable);

        } else {

            String keyword = search.trim();

            users =
                    userRepository
                            .findByFullNameContainingIgnoreCaseOrEmailContainingIgnoreCase(
                                    keyword,
                                    keyword,
                                    pageable
                            );
        }

        return users.map(this::mapToResponse);
    }

    @Override
    public UserResponse getUserByIdForAdmin(Integer id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("service.user.notfound"));

        return mapToResponse(user);
    }

    @Override
    public UserResponse updateUserStatus(Integer id, UpdateUserStatusRequest request) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("service.user.notfound"));

        String status = request.getStatus().toUpperCase();

        if (!status.equals("ACTIVE") && !status.equals("INACTIVE")) {
            throw new RuntimeException("Invalid status");
        }

        user.setStatus(status);

        userRepository.save(user);

        return mapToResponse(user);
    }

    @Override
    public void deleteUser(Integer id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("service.user.notfound"));

        userRepository.delete(user);
    }
    @Override
    public UserProfileResponse getMyProfile(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UserNotFoundException("User not found")
                );

        return UserMapper.toProfileResponse(user);
    }

    @Override
    @Transactional
    public UserProfileResponse updateMyProfile(
            String email,
            UpdateProfileRequest request) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UserNotFoundException("User not found")
                );

        user.setFullName(request.getFullName());
        user.setPhone(request.getPhone());

        return UserMapper.toProfileResponse(userRepository.save(user));
    }
}