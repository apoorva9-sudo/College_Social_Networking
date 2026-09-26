package com.college.networking.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Table(name = "users")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userId;

    private String fullName;

    @Column(unique = true)
    private String email;

    private String passwordHash;

    private String phone;

    private String status;

    private LocalDateTime lastLogin;
    private LocalDateTime lastLogout;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;


    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles;
    public Set<Role> getRoles() { return roles; }
}