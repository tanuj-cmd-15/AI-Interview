package com.aiinterview.controller;

import com.aiinterview.dto.interview.InterviewDTO;
import com.aiinterview.dto.student.StudentStatsDTO;
import com.aiinterview.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/student")
@RequiredArgsConstructor
public class StudentController {
    
    private final StudentService studentService;
    
    @GetMapping("/stats")
    public ResponseEntity<StudentStatsDTO> getStats(Authentication authentication) {
        String email = authentication.getName();
        StudentStatsDTO stats = studentService.getStudentStats(email);
        return ResponseEntity.ok(stats);
    }
    
    @GetMapping("/recent-activity")
    public ResponseEntity<List<InterviewDTO>> getRecentActivity(Authentication authentication) {
        String email = authentication.getName();
        List<InterviewDTO> activities = studentService.getRecentActivity(email);
        return ResponseEntity.ok(activities);
    }
}
