package com.college.networking.controller;

import com.college.networking.dto.request.MaterialUploadRequest;
import com.college.networking.dto.response.MaterialResponse;
import com.college.networking.service.MaterialService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/faculty/materials")
@CrossOrigin
public class FacultyMaterialController {

    @Autowired
    private MaterialService materialService;

    @PostMapping
    public MaterialResponse uploadMaterial(
            @Valid @ModelAttribute MaterialUploadRequest request,
            @AuthenticationPrincipal String email) {

        return materialService.uploadMaterial(
                request,
                email
        );

    }

    @GetMapping
    public List<MaterialResponse> getMyMaterials(
            @AuthenticationPrincipal String email) {
        return materialService.getMyMaterials(email);
    }

    @DeleteMapping("/{materialId}")
    public String deleteMaterial(
            @PathVariable Integer materialId,
            @AuthenticationPrincipal String email) {
        return materialService.deleteMaterial(materialId, email);
    }
}