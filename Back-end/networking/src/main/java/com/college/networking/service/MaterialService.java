package com.college.networking.service;

import com.college.networking.dto.request.MaterialUploadRequest;
import com.college.networking.dto.response.MaterialResponse;

import java.util.List;


public interface MaterialService {
    String deleteMaterial(Integer id, String email);

    MaterialResponse uploadMaterial(
            MaterialUploadRequest request,
            String email
    );

    List<MaterialResponse> getMyMaterials(String email);

    List<MaterialResponse> getCourseMaterials(String facultyEmail);
}
