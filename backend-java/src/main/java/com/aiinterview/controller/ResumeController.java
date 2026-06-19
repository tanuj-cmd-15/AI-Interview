package com.aiinterview.controller;

import com.aiinterview.dto.resume.ATSScoreDTO;
import com.aiinterview.dto.resume.ResumeAnalysisDTO;
import com.aiinterview.service.ResumeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/resume")
@RequiredArgsConstructor
public class ResumeController {
    
    private final ResumeService resumeService;
    
    @PostMapping("/analyze")
    public ResponseEntity<ResumeAnalysisDTO> analyzeResume(
            @RequestParam("file") MultipartFile file) {
        ResumeAnalysisDTO analysis = resumeService.analyzeResume(file);
        return ResponseEntity.ok(analysis);
    }
    
    @PostMapping("/analyze-ats")
    public ResponseEntity<ATSScoreDTO> analyzeATS(
            @RequestParam("file") MultipartFile file,
            @RequestParam(required = false) String jobDescription,
            Authentication authentication) {
        
        // If authenticated (student uploading), save the score
        if (authentication != null) {
            String userEmail = authentication.getName();
            ATSScoreDTO atsScore = resumeService.analyzeAndSaveATSScore(file, userEmail);
            return ResponseEntity.ok(atsScore);
        }
        
        // If not authenticated or HR checking, just analyze without saving
        ATSScoreDTO atsScore = resumeService.analyzeATSCompatibility(file);
        return ResponseEntity.ok(atsScore);
    }
}
