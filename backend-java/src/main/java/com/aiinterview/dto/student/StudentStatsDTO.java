package com.aiinterview.dto.student;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudentStatsDTO {
    private Integer interviewsCompleted;
    private Integer averageScore;
    private String lastActivity;
}
