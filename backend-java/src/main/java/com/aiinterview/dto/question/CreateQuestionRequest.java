package com.aiinterview.dto.question;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateQuestionRequest {
    
    @NotBlank(message = "Question text is required")
    private String text;
    
    @NotBlank(message = "Category is required")
    @Pattern(regexp = "HR|TECHNICAL|hr|technical", message = "Category must be HR or TECHNICAL")
    private String category;
    
    @NotBlank(message = "Difficulty is required")
    @Pattern(regexp = "EASY|MEDIUM|HARD|easy|medium|hard", message = "Difficulty must be EASY, MEDIUM, or HARD")
    private String difficulty;
}
