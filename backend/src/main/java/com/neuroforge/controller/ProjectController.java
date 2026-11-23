package com.neuroforge.controller;
import com.neuroforge.dto.ProjectRequest;
import com.neuroforge.model.Project;
import com.neuroforge.repo.*;
import jakarta.validation.Valid;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.*;
@RestController @RequestMapping("/api/projects")
public class ProjectController {
 private final ProjectRepository projects; private final UserRepository users;
 public ProjectController(ProjectRepository p,UserRepository u){projects=p;users=u;}
 @GetMapping public List<Project> all(){return projects.findAll();}
 @GetMapping("/{id}") public ResponseEntity<Project> get(@PathVariable Long id){
  return projects.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
 }
 @PostMapping public ResponseEntity<?> create(@Valid @RequestBody ProjectRequest r,Authentication a){
  Project p=new Project();p.setName(r.name());p.setDescription(r.description());
  if(r.status()!=null && !r.status().isBlank())p.setStatus(r.status());
  p.setCreatedBy(users.findByUsername(a.getName()).orElseThrow());
  return ResponseEntity.status(HttpStatus.CREATED).body(projects.save(p));
 }
 @PutMapping("/{id}") public ResponseEntity<?> update(@PathVariable Long id,@Valid @RequestBody ProjectRequest r){
  return projects.findById(id).map(p->{p.setName(r.name());p.setDescription(r.description());
   if(r.status()!=null && !r.status().isBlank())p.setStatus(r.status());
   return ResponseEntity.ok(projects.save(p));}).orElse(ResponseEntity.notFound().build());
 }
 @DeleteMapping("/{id}") public ResponseEntity<Void> delete(@PathVariable Long id){
  if(!projects.existsById(id))return ResponseEntity.notFound().build();
  projects.deleteById(id);return ResponseEntity.noContent().build();
 }
}
