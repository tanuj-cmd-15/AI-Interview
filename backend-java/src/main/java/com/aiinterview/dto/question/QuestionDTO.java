package com.aiinterview.dto.question;

import com.aiinterview.model.Question;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuestionDTO {
    private Long id;
    private String text;
    private String category;
    private String difficulty;
    private Long createdById;
    private String createdByName;
    private Boolean isActive;
    private LocalDateTime createdAt;
    
    public static QuestionDTO fromEntity(Question question) {
        return QuestionDTO.builder()
                .id(question.getId())
                .text(question.getText())
                .category(question.getCategory().name())
                .difficulty(question.getDifficulty().name())
                .createdById(question.getCreatedBy() != null ? question.getCreatedBy().getId() : null)
                .createdByName(question.getCreatedBy() != null ? question.getCreatedBy().getName() : null)
                .isActive(question.getIsActive())
                .createdAt(question.getCreatedAt())
                .build();
    }
}
