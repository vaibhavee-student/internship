package com.neuroforge.controller;
import com.neuroforge.dto.*;
import com.neuroforge.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
@RestController @RequestMapping("/api/auth")
public class AuthController {
 private final AuthService auth;
 public AuthController(AuthService a){auth=a;}
 @PostMapping("/register") public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest r){
  try{return ResponseEntity.status(HttpStatus.CREATED).body(auth.register(r));}
  catch(IllegalArgumentException e){return ResponseEntity.badRequest().body(java.util.Map.of("message",e.getMessage()));}
 }
 @PostMapping("/login") public ResponseEntity<?> login(@Valid @RequestBody LoginRequest r){
  try{return ResponseEntity.ok(auth.login(r));}
  catch(IllegalArgumentException e){return ResponseEntity.status(401).body(java.util.Map.of("message",e.getMessage()));}
 }
}
