package com.faik.demo2.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.faik.demo2.dto.CommentDto;
import com.faik.demo2.entity.Comment;
import com.faik.demo2.entity.Post;
import com.faik.demo2.service.CommentsService;
import com.faik.demo2.service.PostService;

@RestController
@RequestMapping("/api/comments")
@CrossOrigin(origins="*")
public class CommentController {

    @Autowired
    private CommentsService commentsService;

    @Autowired
    private PostService postService;
    
    @GetMapping
    public ResponseEntity<List<Comment>> getAllComments() {
        List<Comment> comments = commentsService.getAllComments();
        return ResponseEntity.ok(comments);
    }

    @GetMapping("/post/{postId}")
    public ResponseEntity<List<Comment>> getCommentsByPost(@PathVariable Long id){
        Post post = postService.getPostById(id).orElse(null);
        if(post==null)
            return ResponseEntity.notFound().build();

        List<Comment> comments = commentsService.getCommentsByPost(post);
        return ResponseEntity.ok(comments);

    }

    @PostMapping
    public ResponseEntity<Comment> createComment(@RequestBody CommentDto commentDto){
        Post post = postService.getPostById(commentDto.getPostId()).orElse(null);
        if(post==null)
            return ResponseEntity.badRequest().build();

        Comment newComment = new Comment();
        newComment.setContent(commentDto.getContent());
        newComment.setPost(post);
        newComment.setIsApproved(false);

        Comment savedComment = commentsService.saveComment(newComment);
        return ResponseEntity.ok(savedComment);
    }



    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long id){
        commentsService.deleteComment(id);
        return ResponseEntity.noContent().build();
    } 


}
