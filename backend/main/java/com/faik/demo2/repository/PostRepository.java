
package com.faik.demo2.repository;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.faik.demo2.entity.Post;
import com.faik.demo2.entity.Post.PostStatus;
import com.faik.demo2.entity.User;



@Repository
public interface PostRepository extends JpaRepository<Post, Long>{
    
    List<Post> findByUser(User user);
    
    Page<Post> findByStatus(PostStatus status, Pageable pageable);

    List<Post> findByTitleContainingIgnoreCase(String title);

    List<Post> findByUserAndStatus(User user, PostStatus status);
}