package com.college.networking.controller;

import com.college.networking.dto.response.StudentResponse;
import com.college.networking.service.CourseService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/faculty/students")
@CrossOrigin
public class FacultyStudentController {

    private final CourseService courseService;

    public FacultyStudentController(CourseService courseService) {
        this.courseService = courseService;
    }

    @GetMapping
    public List<StudentResponse> getStudents(
            @AuthenticationPrincipal String email) {
        return courseService.getFacultyCourseStudents(email);
    }
}
