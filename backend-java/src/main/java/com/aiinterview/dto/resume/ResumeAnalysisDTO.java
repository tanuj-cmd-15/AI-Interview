package com.aiinterview.dto.resume;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResumeAnalysisDTO {
    private List<String> skills;
    private String email;
    private String phone;
    private Integer experienceYears;
    private Integer atsScore;
    private Integer matchedSkillsCount;
    private List<String> suggestions;
}
