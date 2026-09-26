package com.college.networking.controller;

import com.college.networking.dto.response.CourseResponse;
import com.college.networking.service.CourseService;
import com.college.networking.service.MaterialService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.college.networking.dto.response.MaterialResponse;

import java.util.List;

@RestController
@RequestMapping("/api/faculty/course")
@CrossOrigin
public class FacultyCourseController {

    private final CourseService courseService;
    private final MaterialService materialService;

    public FacultyCourseController(
            CourseService courseService,
            MaterialService materialService) {
        this.courseService = courseService;
        this.materialService = materialService;
    }

    @GetMapping
    public CourseResponse getFacultyCourse(
            @AuthenticationPrincipal String email) {
        return courseService.getFacultyCourse(email);
    }

    @GetMapping("/materials")
    public List<MaterialResponse> getCourseMaterials(
            @AuthenticationPrincipal String email) {
        return materialService.getCourseMaterials(email);
    }
}
