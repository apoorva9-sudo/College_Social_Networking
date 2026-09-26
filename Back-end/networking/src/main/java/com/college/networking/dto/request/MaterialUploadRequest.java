package com.college.networking.dto.request;

import com.college.networking.entity.Material;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;


    @Data
    public class MaterialUploadRequest {

        @NotBlank(message = "Title is required")
        private String title;

        private String description;

        @NotNull(message = "Visibility is required")
        private Material.Visibility visibility;

        @NotNull(message = "File is required")
        private MultipartFile file;
    }

