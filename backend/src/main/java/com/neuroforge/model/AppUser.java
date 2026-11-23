package com.neuroforge.model;
import jakarta.persistence.*;
@Entity @Table(name="app_users")
public class AppUser {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 @Column(nullable=false, unique=true) private String username;
 @Column(nullable=false, unique=true) private String email;
 @Column(nullable=false) private String password;
 @Enumerated(EnumType.STRING) @Column(nullable=false) private Role role;
 public Long getId(){return id;} public String getUsername(){return username;}
 public void setUsername(String v){username=v;} public String getEmail(){return email;}
 public void setEmail(String v){email=v;} public String getPassword(){return password;}
 public void setPassword(String v){password=v;} public Role getRole(){return role;}
 public void setRole(Role v){role=v;}
}
