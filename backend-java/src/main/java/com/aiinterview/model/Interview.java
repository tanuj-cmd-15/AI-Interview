package com.aiinterview.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(name = "interviews")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Interview {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "candidate_id", nullable = false)
    private User candidate;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "interview_type", nullable = false)
    private InterviewType interviewType;
    
    @Column(nullable = false)
    private Integer score;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private InterviewStatus status;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "pipeline_stage")
    private PipelineStage stage;
    
    @Column(name = "feedback_summary", columnDefinition = "TEXT")
    private String feedbackSummary;
    
    @Column(name = "technical_score")
    private Integer technicalScore;
    
    @Column(name = "communication_score")
    private Integer communicationScore;
    
    @Column(name = "confidence_score")
    private Integer confidenceScore;
    
    @Column(name = "duration_minutes")
    private Integer durationMinutes;
    
    @Column(name = "questions_answered")
    private Integer questionsAnswered;
    
    @Column(name = "detailed_feedback", columnDefinition = "TEXT")
    private String detailedFeedback;  // JSON string
    
    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    public enum InterviewType {
        HR, TECHNICAL, COMBINED
    }
    
    public enum InterviewStatus {
        PENDING_REVIEW, REVIEWED, COMPLETED
    }
    
    public enum PipelineStage {
        APPLIED, SCREENING, ASSESSMENT, INTERVIEW, OFFER, HIRED
    }
}
