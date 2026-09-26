package com.college.networking.repository;

import com.college.networking.entity.Material;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MaterialRepository extends JpaRepository<Material, Integer> {

    List<Material> findByUploadedBy_Email(String email);

    List<Material> findByCourse_CourseId(Integer courseId);

    Optional<Material> findByMaterialIdAndUploadedBy_Email(
            Integer materialId,
            String email
    );
}
