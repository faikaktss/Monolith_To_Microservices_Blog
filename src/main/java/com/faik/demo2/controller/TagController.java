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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.faik.demo2.dto.TagDto;
import com.faik.demo2.entity.Tag;
import com.faik.demo2.service.TagService;

@RestController
@RequestMapping("/api/tags")
@CrossOrigin(origins="*")
public class TagController {

    @Autowired
    private TagService tagService;

    @GetMapping
    public ResponseEntity<List<Tag>> getAllTags(){
        List<Tag> tags = tagService.getAllTags();
        return ResponseEntity.ok(tags);

    }
    

    @GetMapping("/{id}")
    public ResponseEntity<Tag> getTagById(@PathVariable Long id){
        Optional<Tag> tag = tagService.getTagById(id);
        return tag.map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Tag> createTag(@RequestBody TagDto tagRequest){
        if(tagService.tagExists(tagRequest.getName()))
            return ResponseEntity.badRequest().build();

        Tag newTag = new Tag();
        newTag.setName(tagRequest.getName());
        newTag.setSlug(tagRequest.getSlug());

        Tag savedTag = tagService.saveTag(newTag);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedTag);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTag(@PathVariable long id){
        tagService.deleteTag(id);
        return ResponseEntity.noContent().build();
    }
}
