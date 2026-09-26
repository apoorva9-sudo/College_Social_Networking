package com.college.networking.dto.response;

import lombok.Data;

@Data
public class CourseResponse {
    private Integer courseId;
    private String courseCode;
    private String courseName;
    private String description;
    private Integer facultyId;
    private String facultyName;
}
