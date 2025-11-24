package com.faik.demo2.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.faik.demo2.entity.Comment;
import com.faik.demo2.entity.Post;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long>{
    
    List<Comment> findByPost(Post post);

    List<Comment> findByPostAndIsApproved(Post post, boolean isApproved);

    List<Comment> findByIsApprovedFalse();
}
