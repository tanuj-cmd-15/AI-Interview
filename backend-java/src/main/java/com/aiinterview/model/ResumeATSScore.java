package com.aiinterview.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(name = "resume_ats_scores")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class ResumeATSScore {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @Column(name = "overall_score")
    private Integer overallScore;
    
    @Column(name = "format_score")
    private Integer formatScore;
    
    @Column(name = "keyword_score")
    private Integer keywordScore;
    
    @Column(name = "content_score")
    private Integer contentScore;
    
    @Column(name = "suggestions", columnDefinition = "TEXT")
    private String suggestions; // JSON string
    
    @Column(name = "resume_file_name")
    private String resumeFileName;
    
    @Column(name = "resume_file_path")
    private String resumeFilePath;
    
    @CreatedDate
    @Column(name = "analyzed_at", nullable = false, updatable = false)
    private LocalDateTime analyzedAt;
}
