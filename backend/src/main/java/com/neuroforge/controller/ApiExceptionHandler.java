package com.neuroforge.controller;
import org.springframework.http.*;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
@RestControllerAdvice
public class ApiExceptionHandler {
 @ExceptionHandler(MethodArgumentNotValidException.class)
 ResponseEntity<?> validation(MethodArgumentNotValidException e){
  String msg=e.getBindingResult().getFieldErrors().stream().findFirst()
   .map(x->x.getField()+": "+x.getDefaultMessage()).orElse("Invalid request");
  return ResponseEntity.badRequest().body(Map.of("message",msg));
 }
}
