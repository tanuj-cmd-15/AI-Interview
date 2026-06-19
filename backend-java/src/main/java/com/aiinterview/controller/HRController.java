package com.aiinterview.controller;

import com.aiinterview.dto.interview.InterviewDTO;
import com.aiinterview.dto.interview.SendInvitationRequest;
import com.aiinterview.dto.question.CreateQuestionRequest;
import com.aiinterview.dto.question.QuestionDTO;
import com.aiinterview.model.User;
import com.aiinterview.service.HRService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/hr")
@RequiredArgsConstructor
public class HRController {
    
    private final HRService hrService;
    
    @GetMapping("/candidates")
    public ResponseEntity<List<InterviewDTO>> getAllCandidates() {
        List<InterviewDTO> candidates = hrService.getAllCandidates();
        return ResponseEntity.ok(candidates);
    }
    
    @PutMapping("/candidates/{id}/status")
    public ResponseEntity<Map<String, Object>> updateCandidateStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> request) {
        
        String status = request.get("status");
        InterviewDTO updated = hrService.updateCandidateStatus(id, status);
        
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Status updated to " + status);
        response.put("interview", updated);
        
        return ResponseEntity.ok(response);
    }
    
    @PutMapping("/candidates/{id}/stage")
    public ResponseEntity<Map<String, Object>> updateCandidateStage(
            @PathVariable Long id,
            @RequestBody Map<String, String> request) {
        
        String stage = request.get("stage");
        InterviewDTO updated = hrService.updateCandidateStage(id, stage);
        
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Stage updated to " + stage);
        response.put("interview", updated);
        
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/questions")
    public ResponseEntity<List<QuestionDTO>> getQuestions(
            @RequestParam(required = false) String category) {
        List<QuestionDTO> questions = hrService.getQuestions(category);
        return ResponseEntity.ok(questions);
    }
    
    @PostMapping("/questions")
    public ResponseEntity<Map<String, Object>> createQuestion(
            @Valid @RequestBody CreateQuestionRequest request,
            Authentication authentication) {
        
        String email = authentication.getName();
        QuestionDTO question = hrService.createQuestion(request, email);
        
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Question created successfully");
        response.put("question", question);
        
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    
    @PutMapping("/questions/{id}")
    public ResponseEntity<Map<String, Object>> updateQuestion(
            @PathVariable Long id,
            @Valid @RequestBody CreateQuestionRequest request) {
        
        QuestionDTO question = hrService.updateQuestion(id, request);
        
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Question updated successfully");
        response.put("question", question);
        
        return ResponseEntity.ok(response);
    }
    
    @DeleteMapping("/questions/{id}")
    public ResponseEntity<Map<String, String>> deleteQuestion(@PathVariable Long id) {
        hrService.deleteQuestion(id);
        
        Map<String, String> response = new HashMap<>();
        response.put("message", "Question deleted successfully");
        
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/send-invitation")
    public ResponseEntity<Map<String, Object>> sendInterviewInvitation(
            @Valid @RequestBody SendInvitationRequest request) {
        
        User candidate = hrService.sendInterviewInvitation(request);
        
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Interview invitation sent successfully");
        response.put("candidateEmail", candidate.getEmail());
        response.put("candidateName", candidate.getName());
        
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
