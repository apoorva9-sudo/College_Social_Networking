package com.college.networking.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterRequest {


    @NotBlank(message = "Name required")
    private String fullName;

    @NotBlank(message = "Email must not be empty")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Password must not be empty")
    @Size(min = 6, message = "Password must be at least 6 characters long")
    private String password;

    @NotBlank(message = "Phone number must not be empty")
    @Pattern(regexp = "^[789]\\d{9}$", message = "Phone number must start with 7, 8, or 9 and be 10 digits long")
    private String phone;


    @NotBlank(message = "Role must not be empty")
    private String role; // ADMIN / STUDENT / FACULTY

}