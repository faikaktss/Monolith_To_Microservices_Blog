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
            comment.get().setIsApproved(true);
            commentRepository.save(comment.get());
        }
    }


    public void deleteComment(Long id){
        commentRepository.deleteById(id);
    }

}
