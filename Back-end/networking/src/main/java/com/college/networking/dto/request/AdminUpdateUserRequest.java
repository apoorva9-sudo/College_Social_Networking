package com.college.networking.dto.request;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.Set;

@Data
public class AdminUpdateUserRequest {

    @NotBlank(message = "Full name is required")
    @Size(
            min = 3,
            max = 100,
            message = "Full name must be between 3 and 100 characters"
    )
    private String fullName;

    @Pattern(
            regexp = "^[0-9]{10}$",
            message = "Phone number must contain exactly 10 digits"
    )
    private String phone;

    @NotBlank(message = "Status is required")
    private String status;

    @NotEmpty(message = "At least one role is required")
    private Set<String> roles;
}