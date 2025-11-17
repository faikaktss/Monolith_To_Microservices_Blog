package com.faik.demo2.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.faik.demo2.entity.Post;
import com.faik.demo2.entity.Post.PostStatus;
import com.faik.demo2.entity.User;
import com.faik.demo2.repository.PostRepository;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    public Post savePost(Post post){
        return postRepository.save(post);
    }

    public Optional<Post> getPostById(Long id){
        return postRepository.findById(id);
    }

    public List<Post> getAllPosts(){
        return postRepository.findAll();
    }

    public List<Post> getPostsByUser(User user){
        return postRepository.findByUser(user);
    }

    public Page<Post> getPublishedPosts(Pageable pageable){
        return postRepository.findByStatus(PostStatus.PUBLISHED, pageable);
    }

    public List<Post> searchPostsByTitle(String title){
        return postRepository.findByTitleContainingIgnoreCase(title);
    }

    public List<Post> getPostsByUserAndStatus(User user, PostStatus status){
        return postRepository.findByUserAndStatus(user, PostStatus.PUBLISHED);
    }

    public void deletePost(Long id){
        postRepository.deleteById(id);
    }

}
