package com.faik.demo2.dto;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentDto {
    
    private Long id;
    private String content;
    private Long postId;
    private String username;
    private Boolean isApproved;
    private String createdAt;
}   
