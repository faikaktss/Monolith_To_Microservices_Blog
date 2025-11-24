package com.faik.demo2.dto;

import java.util.Set;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostDto {
    
    private Long id;
    private String title;
    private String content;
    private String userId;
    private String username;
    private String status;
    private String createdAt;
    private String updatedAt;
    private Set<String> tags;
}
