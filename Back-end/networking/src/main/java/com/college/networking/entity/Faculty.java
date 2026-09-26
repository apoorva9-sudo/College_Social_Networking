package com.college.networking.entity;


import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "faculty")
@Data
public class Faculty {

    @Id
    private Integer facultyId;

    @OneToOne
    @MapsId
    @JoinColumn(name = "faculty_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "department_id")
    private Department department;

    private String designation;
}
