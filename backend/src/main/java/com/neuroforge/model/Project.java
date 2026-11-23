package com.neuroforge.model;
import jakarta.persistence.*;
import java.time.LocalDateTime;
@Entity
public class Project {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 @Column(nullable=false) private String name;
 @Column(length=2000) private String description;
 @Column(nullable=false) private String status="PLANNING";
 private LocalDateTime createdAt=LocalDateTime.now();
 @ManyToOne(fetch=FetchType.EAGER) @JoinColumn(name="created_by_id") private AppUser createdBy;
 public Long getId(){return id;} public String getName(){return name;} public void setName(String v){name=v;}
 public String getDescription(){return description;} public void setDescription(String v){description=v;}
 public String getStatus(){return status;} public void setStatus(String v){status=v;}
 public LocalDateTime getCreatedAt(){return createdAt;} public AppUser getCreatedBy(){return createdBy;}
 public void setCreatedBy(AppUser v){createdBy=v;}
}
