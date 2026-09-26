package com.college.networking.service;

import com.college.networking.dto.response.CourseResponse;
import com.college.networking.dto.response.StudentResponse;

import java.util.List;

public interface CourseService {

    CourseResponse getFacultyCourse(String facultyEmail);

    List<StudentResponse> getFacultyCourseStudents(String facultyEmail);
}
