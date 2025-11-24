package com.faik.demo2.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.faik.demo2.entity.Tag;
import com.faik.demo2.repository.TagRepository;

@Service
public class TagService {
    
    @Autowired
    private TagRepository tagRepository;
    
    public Tag saveTag(Tag tag) {
        return tagRepository.save(tag);
    }
    
    public Optional<Tag> getTagById(Long id) {
        return tagRepository.findById(id);
    }
    
    public Optional<Tag> getTagByName(String name) {
        return tagRepository.findByName(name);
    }
    
    public Optional<Tag> getTagBySlug(String slug) {
        return tagRepository.findBySlug(slug);
    }
    
    public List<Tag> getAllTags() {
        return tagRepository.findAll();
    }
    
    public boolean tagExists(String name) {
        return tagRepository.existsByName(name);
    }
    
    public void deleteTag(Long id) {
        tagRepository.deleteById(id);
    }
}