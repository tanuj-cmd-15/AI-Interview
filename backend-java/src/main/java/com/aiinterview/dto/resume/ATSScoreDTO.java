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
public class ATSScoreDTO {
    
    private Integer overallScore;
    private Integer formatScore;
    private Integer keywordScore;
    private Integer contentScore;
    
    private List<Suggestion> suggestions;
    private List<String> missingKeywords;
    private List<String> strengths;
    private List<String> weaknesses;
    
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Suggestion {
        private String type; // critical, warning, info
        private String text;
    }
}
