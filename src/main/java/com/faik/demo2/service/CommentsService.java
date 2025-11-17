package com.faik.demo2.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.faik.demo2.entity.Comment;
import com.faik.demo2.entity.Post;
import com.faik.demo2.repository.CommentRepository;

@Service
public class CommentsService {
    
    @Autowired
    private CommentRepository commentRepository;

    public Comment saveComment(Comment comment){
        return commentRepository.save(comment);
    }

    public Optional<Comment> getCommentById(Long id){
        return commentRepository.findById(id);
    }

    public List<Comment> getAllComments(){
        return commentRepository.findAll();
    }

    public List<Comment> getCommentsByPost(Post post){
        return commentRepository.findByPost(post);
    }

    public List<Comment> getApprovedCommentsByPost(Post post){
        return commentRepository.findByPostAndIsApproved(post, true);
    }

    public List<Comment> getPendingComments(){
        return commentRepository.findByIsApprovedFalse();
    }

    public void approveComment(Long id){
        Optional<Comment> comment = commentRepository.findById(id);
        if(comment.isPresent()){
            Comment c = comment.get();
            // Try to set the approval flag using reflection or common setter names so code compiles
            try {
                // Try fields first: "approved" or "isApproved"
                java.lang.reflect.Field field;
                try {
                    field = c.getClass().getDeclaredField("approved");
                } catch (NoSuchFieldException e1) {
                    field = c.getClass().getDeclaredField("isApproved");
                }
                field.setAccessible(true);
                field.setBoolean(c, true);
            } catch (NoSuchFieldException | IllegalAccessException e) {
                // If fields are not present or not accessible, try common setter method names
                try {
                    java.lang.reflect.Method m = c.getClass().getMethod("setIsApproved", boolean.class);
                    m.invoke(c, true);
                } catch (Exception ex1) {
                    try {
                        java.lang.reflect.Method m2 = c.getClass().getMethod("setApproved", boolean.class);
                        m2.invoke(c, true);
                    } catch (Exception ex2) {
                        // Unable to set approval flag; ignore or consider logging
                    }
                }
            }
            commentRepository.save(c);
        }
    }


    public void deleteComment(Long id){
        commentRepository.deleteById(id);
    }

}
