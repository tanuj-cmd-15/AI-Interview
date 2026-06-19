package com.aiinterview.dto.interview;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class SendInvitationRequest {
    
    @NotBlank(message = "Candidate name is required")
    private String candidateName;
    
    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;
    
    @NotBlank(message = "Interview type is required")
    private String interviewType; // HR, TECHNICAL, COMBINED
    
    private String assessmentTitle;
    private String deadline;
}
