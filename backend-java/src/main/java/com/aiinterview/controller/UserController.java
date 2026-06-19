package com.aiinterview.controller;

import com.aiinterview.dto.user.ChangePasswordRequest;
import com.aiinterview.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {
    
    private final UserService userService;
    
    @PutMapping("/change-password")
    public ResponseEntity<Map<String, String>> changePassword(
            @Valid @RequestBody ChangePasswordRequest request,
            Authentication authentication) {
        
        String email = authentication.getName();
        userService.changePassword(email, request);
        
        Map<String, String> response = new HashMap<>();
        response.put("message", "Password changed successfully");
        
        return ResponseEntity.ok(response);
    }
    
    @PutMapping("/update-role")
    public ResponseEntity<Map<String, String>> updateRole(
            @RequestBody Map<String, String> request,
            Authentication authentication) {
        
        String email = authentication.getName();
        String role = request.get("role");
        
        userService.updateUserRole(email, role);
        
        Map<String, String> response = new HashMap<>();
        response.put("message", "Role updated successfully");
        response.put("role", role);
        
        return ResponseEntity.ok(response);
    }
}

