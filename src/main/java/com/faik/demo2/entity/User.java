package com.faik.demo2.entity;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name="users")
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable= false, unique=true)
    private String username;
    
    @Column(nullable= false, unique=true)
    private String email;


    @Column(nullable=false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable=false)
    private UserRole role;

    @Column(name="created_at", nullable=false,updatable=false)
    private LocalDateTime createdAt;

    @OneToMany(mappedBy="user", cascade=CascadeType.ALL)
    private Set<Post> posts = new HashSet<>();

    @OneToMany(mappedBy="user", cascade=CascadeType.ALL)
    private Set<Comment> comments = new HashSet<>();

    @PrePersist
    protected void onCreate(){
        createdAt = LocalDateTime.now();
    }

    public enum UserRole{
        ADMIN, USER, AUTHOR
    }
}
