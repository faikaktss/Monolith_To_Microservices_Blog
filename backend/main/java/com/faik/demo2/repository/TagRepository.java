package com.faik.demo2.repository;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.faik.demo2.entity.Tag;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long>{
    
    Optional<Tag> findByName(String name);

    Optional<Tag> findBySlug(String slug);

    boolean existsByName(String name);
}
