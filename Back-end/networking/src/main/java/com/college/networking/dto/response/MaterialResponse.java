package com.college.networking.dto.response;

import com.college.networking.entity.Material;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class MaterialResponse {
    private Integer materialId;
    private String title;
    private String description;
    private String fileUrl;
    private String fileType;
    private Material.Visibility visibility;
    private Integer uploadedById;
    private String uploadedByName;
    private LocalDateTime createdAt;
    private Integer courseId;
    private String courseCode;
    private String courseName;
}
