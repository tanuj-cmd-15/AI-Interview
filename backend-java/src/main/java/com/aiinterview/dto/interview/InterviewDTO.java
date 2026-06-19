package com.aiinterview.dto.interview;

import com.aiinterview.model.Interview;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InterviewDTO {
    private Long id;
    private Long candidateId;
    private String candidateName;
    private String candidateEmail;
    private String interviewType;
    private Integer score;
    private String status;
    private String stage;
    private String feedbackSummary;
    private Integer technicalScore;
    private Integer communicationScore;
    private Integer confidenceScore;
    private Integer durationMinutes;
    private LocalDateTime createdAt;
    
    // ATS Score fields
    private Integer atsScore;
    private Boolean hasAtsScore;
    
    public static InterviewDTO fromEntity(Interview interview) {
        return InterviewDTO.builder()
                .id(interview.getId())
                .candidateId(interview.getCandidate().getId())
                .candidateName(interview.getCandidate().getName())
                .candidateEmail(interview.getCandidate().getEmail())
                .interviewType(interview.getInterviewType().name())
                .score(interview.getScore())
                .status(interview.getStatus().name())
                .stage(interview.getStage() != null ? interview.getStage().name() : "APPLIED")
                .feedbackSummary(interview.getFeedbackSummary())
                .technicalScore(interview.getTechnicalScore())
                .communicationScore(interview.getCommunicationScore())
                .confidenceScore(interview.getConfidenceScore())
                .durationMinutes(interview.getDurationMinutes())
                .createdAt(interview.getCreatedAt())
                .atsScore(null) // Will be populated by service
                .hasAtsScore(false) // Will be populated by service
                .build();
    }
}
