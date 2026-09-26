package com.college.networking.serviceImpl;

import com.college.networking.dto.request.MaterialUploadRequest;
import com.college.networking.dto.response.MaterialResponse;
import com.college.networking.entity.Course;
import com.college.networking.entity.Material;
import com.college.networking.entity.User;
import com.college.networking.exception.CourseNotFoundException;
import com.college.networking.exception.MaterialNotFoundException;
import com.college.networking.repository.CourseRepository;
import com.college.networking.exception.UserNotFoundException;
import com.college.networking.repository.MaterialRepository;
import com.college.networking.repository.UserRepository;
import com.college.networking.service.MaterialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class MaterialServiceImpl implements MaterialService {
    @Autowired
    private MaterialRepository materialRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CourseRepository courseRepository;

    private final Path uploadDirectory =
            Paths.get("uploads");

    @Override
    @Transactional
    public MaterialResponse uploadMaterial(
            MaterialUploadRequest request,
            String email) {

        User faculty = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UserNotFoundException("User not found"));

        Course course = courseRepository.findByFaculty_Email(email)
                .orElseThrow(() -> new CourseNotFoundException(
                        "No course is assigned to this faculty member"
                ));

        MultipartFile file = request.getFile();

        if (file.isEmpty()) {
            throw new RuntimeException("File cannot be empty");
        }

        try {

            Files.createDirectories(uploadDirectory);

            String originalFileName =
                    file.getOriginalFilename();

            String fileExtension = "";

            if (originalFileName != null &&
                    originalFileName.contains(".")) {

                fileExtension =
                        originalFileName.substring(
                                originalFileName.lastIndexOf(".")
                        );
            }

            String uniqueFileName =
                    UUID.randomUUID() + fileExtension;

            Path filePath =
                    uploadDirectory.resolve(uniqueFileName);

            Files.copy(
                    file.getInputStream(),
                    filePath
            );

            Material material = new Material();

            material.setTitle(request.getTitle());
            material.setDescription(request.getDescription());
            material.setVisibility(request.getVisibility());

            material.setFileUrl(
                    "/uploads/" + uniqueFileName
            );

            material.setFileType(
                    file.getContentType()
            );

            material.setUploadedBy(faculty);
            material.setCourse(course);

            material.setCreatedAt(
                    LocalDateTime.now()
            );

            Material savedMaterial = materialRepository.save(material);

            return mapToResponse(savedMaterial);

        } catch (IOException e) {

            throw new RuntimeException(
                    "Failed to upload file",
                    e
            );
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<MaterialResponse> getMyMaterials(String email) {
        return materialRepository.findByUploadedBy_Email(email)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<MaterialResponse> getCourseMaterials(String facultyEmail) {
        Course course = courseRepository.findByFaculty_Email(facultyEmail)
                .orElseThrow(() -> new CourseNotFoundException(
                        "No course is assigned to this faculty member"
                ));

        return materialRepository.findByCourse_CourseId(course.getCourseId())
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public String deleteMaterial(Integer materialId, String email) {
        Material material = materialRepository
                .findByMaterialIdAndUploadedBy_Email(materialId, email)
                .orElseThrow(() -> new MaterialNotFoundException(
                        "Material not found"
                ));

        String fileUrl = material.getFileUrl();
        if (fileUrl != null && fileUrl.startsWith("/uploads/")) {
            Path storedFileName = Paths.get(fileUrl).getFileName();
            if (storedFileName != null) {
                Path filePath = uploadDirectory.resolve(storedFileName).normalize();
                try {
                    Files.deleteIfExists(filePath);
                } catch (IOException e) {
                    throw new RuntimeException("Failed to delete material file", e);
                }
            }
        }

        materialRepository.delete(material);
        return "Material deleted successfully";
    }

    // mapper  of response to uploaded file by faculty.
    private MaterialResponse mapToResponse(Material material) {

        MaterialResponse response = new MaterialResponse();

        response.setMaterialId(material.getMaterialId());
        response.setTitle(material.getTitle());
        response.setDescription(material.getDescription());
        response.setFileUrl(material.getFileUrl());
        response.setFileType(material.getFileType());
        response.setVisibility(material.getVisibility());
        response.setCreatedAt(material.getCreatedAt());

        if (material.getUploadedBy() != null) {
            response.setUploadedById(
                    material.getUploadedBy().getUserId()
            );

            response.setUploadedByName(
                    material.getUploadedBy().getFullName()
            );
        }

        if (material.getCourse() != null) {
            response.setCourseId(material.getCourse().getCourseId());
            response.setCourseCode(material.getCourse().getCourseCode());
            response.setCourseName(material.getCourse().getCourseName());
        }

        return response;
    }
}
