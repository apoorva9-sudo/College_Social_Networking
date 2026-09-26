package com.college.networking.serviceImpl;

import com.college.networking.dto.response.CourseResponse;
import com.college.networking.dto.response.StudentResponse;
import com.college.networking.entity.Course;
import com.college.networking.entity.Enrollment;
import com.college.networking.exception.CourseNotFoundException;
import com.college.networking.repository.CourseRepository;
import com.college.networking.repository.EnrollmentRepository;
import com.college.networking.service.CourseService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CourseServiceImpl implements CourseService {

    private final CourseRepository courseRepository;
    private final EnrollmentRepository enrollmentRepository;

    public CourseServiceImpl(
            CourseRepository courseRepository,
            EnrollmentRepository enrollmentRepository) {
        this.courseRepository = courseRepository;
        this.enrollmentRepository = enrollmentRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public CourseResponse getFacultyCourse(String facultyEmail) {
        Course course = courseRepository.findByFaculty_Email(facultyEmail)
                .orElseThrow(() -> new CourseNotFoundException(
                        "No course is assigned to this faculty member"
                ));

        CourseResponse response = new CourseResponse();
        response.setCourseId(course.getCourseId());
        response.setCourseCode(course.getCourseCode());
        response.setCourseName(course.getCourseName());
        response.setDescription(course.getDescription());

        if (course.getFaculty() != null) {
            response.setFacultyId(course.getFaculty().getUserId());
            response.setFacultyName(course.getFaculty().getFullName());
        }

        return response;
    }

    @Override
    @Transactional(readOnly = true)
    public List<StudentResponse> getFacultyCourseStudents(String facultyEmail) {
        Course course = courseRepository.findByFaculty_Email(facultyEmail)
                .orElseThrow(() -> new CourseNotFoundException(
                        "No course is assigned to this faculty member"
                ));

        return enrollmentRepository.findByCourse_CourseId(course.getCourseId())
                .stream()
                .map(Enrollment::getStudent)
                .map(student -> {
                    StudentResponse response = new StudentResponse();
                    response.setStudentId(student.getUserId());
                    response.setStudentName(student.getFullName());
                    response.setEmail(student.getEmail());
                    return response;
                })
                .toList();
    }
}
