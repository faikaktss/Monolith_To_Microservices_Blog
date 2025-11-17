package com.faik.demo2.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.faik.demo2.dto.PostDto;
import com.faik.demo2.entity.Post;
import com.faik.demo2.entity.User;
import com.faik.demo2.service.PostService;
import com.faik.demo2.service.UserService;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "*")
public class PostController {
    
    @Autowired
    private PostService postService;

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<Post>> getAllPosts(){
        List<Post> posts = postService.getAllPosts();
        return ResponseEntity.ok(posts);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Post> getPostsId(@PathVariable Long id){
        Optional<Post> post = postService.getPostById(id);
        return post.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Post> createPost(@RequestBody PostDto postDto){
        User user = userService.getUserById(Long.parseLong(postDto.getUserId()));
        if(user == null)
            return ResponseEntity.badRequest().build();
        
        Post newPost = new Post();
        newPost.setTitle(postDto.getTitle());
        newPost.setContent(postDto.getContent());
        newPost.setUser(user);
        newPost.setStatus(Post.PostStatus.DRAFT);
        
        Post savedPost = postService.savePost(newPost);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedPost);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Post> updatePost(@PathVariable Long id, @RequestBody PostDto postDto){
        Optional<Post> existingPost = postService.getPostById(id);
        if(!existingPost.isPresent())   
            return ResponseEntity.notFound().build();

        Post post = existingPost.get();
        post.setTitle(postDto.getTitle());
        post.setContent(postDto.getContent());
        post.setStatus(Post.PostStatus.valueOf(postDto.getStatus()));
        Post updatedPost = postService.savePost(post);
        return ResponseEntity.ok(updatedPost);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id){
        postService.deletePost(id);
        return ResponseEntity.noContent().build();
    }
}



