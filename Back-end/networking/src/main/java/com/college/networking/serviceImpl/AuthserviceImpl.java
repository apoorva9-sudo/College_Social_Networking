package com.college.networking.serviceImpl;

import com.college.networking.config.security.JwtUtil;
import com.college.networking.dto.request.LoginRequest;
import com.college.networking.dto.request.RegisterRequest;
import com.college.networking.entity.Role;
import com.college.networking.entity.User;
import com.college.networking.enums.RoleName;
import com.college.networking.exception.LoginException;
import com.college.networking.exception.UserAlreadyExists;
import com.college.networking.repository.RoleRepository;
import com.college.networking.repository.UserRepository;
import com.college.networking.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Set;

@Service
public class AuthserviceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    Environment envi;
    @Override
    public String register(RegisterRequest request) throws UserAlreadyExists,RuntimeException {

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new UserAlreadyExists(envi.getProperty("service.user.alreadyExists"));
        }

        User user = new User();
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setPhone(request.getPhone());
        user.setStatus("ACTIVE");
        user.setCreatedAt(LocalDateTime.now());

        Role role = roleRepository
                .findByRoleName(RoleName.valueOf(request.getRole()))
                .orElseThrow(() -> new RuntimeException("Role not found"));

        user.setRoles(Set.of(role));

        userRepository.save(user);

        return envi.getProperty("service.user.registered");
    }

    @Override
    public String login(LoginRequest request) throws LoginException {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new LoginException(envi.getProperty("service.user.notfound")));

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new LoginException(envi.getProperty("service.user.loginInvalidPassword"));
        }

        user.setLastLogin(LocalDateTime.now());
        userRepository.save(user);

        return jwtUtil.generateToken(user.getEmail());
    }
}