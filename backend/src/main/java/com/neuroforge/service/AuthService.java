package com.neuroforge.service;
import com.neuroforge.dto.*;
import com.neuroforge.model.*;
import com.neuroforge.repo.UserRepository;
import com.neuroforge.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
@Service
public class AuthService {
 private final UserRepository users; private final PasswordEncoder encoder; private final JwtService jwt;
 public AuthService(UserRepository u,PasswordEncoder e,JwtService j){users=u;encoder=e;jwt=j;}
 public AuthResponse register(RegisterRequest r){
  if(users.existsByUsername(r.username())) throw new IllegalArgumentException("Username already exists");
  if(users.existsByEmail(r.email())) throw new IllegalArgumentException("Email already exists");
  AppUser u=new AppUser();u.setUsername(r.username());u.setEmail(r.email());
  u.setPassword(encoder.encode(r.password()));
  u.setRole(users.count()==0?Role.ADMIN:Role.DEVELOPER);
  users.save(u);return new AuthResponse(jwt.generate(u.getUsername()),u.getUsername(),u.getRole().name());
 }
 public AuthResponse login(LoginRequest r){
  AppUser u=users.findByUsername(r.username()).orElseThrow(()->new IllegalArgumentException("Invalid username or password"));
  if(!encoder.matches(r.password(),u.getPassword())) throw new IllegalArgumentException("Invalid username or password");
  return new AuthResponse(jwt.generate(u.getUsername()),u.getUsername(),u.getRole().name());
 }
}
