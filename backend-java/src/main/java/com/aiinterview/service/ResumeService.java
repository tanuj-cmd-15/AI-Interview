package com.aiinterview.service;

import com.aiinterview.dto.resume.ATSScoreDTO;
import com.aiinterview.dto.resume.ResumeAnalysisDTO;
import com.aiinterview.exception.BusinessException;
import com.aiinterview.model.ResumeATSScore;
import com.aiinterview.model.User;
import com.aiinterview.repository.ResumeATSScoreRepository;
import com.aiinterview.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.apache.poi.xwpf.extractor.XWPFWordExtractor;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ResumeService {
    
    private final ResumeATSScoreRepository atsScoreRepository;
    private final UserRepository userRepository;
    private final ObjectMapper objectMapper;
    
    private static final List<String> TECH_SKILLS = Arrays.asList(
            "Java", "Python", "JavaScript", "TypeScript", "React", "Angular", "Vue",
            "Spring Boot", "Node.js", "Express", "Django", "Flask",
            "MySQL", "PostgreSQL", "MongoDB", "Redis",
            "AWS", "Azure", "GCP", "Docker", "Kubernetes",
            "Git", "CI/CD", "REST API", "GraphQL", "Microservices"
    );
    
    private static final List<String> STANDARD_SECTIONS = Arrays.asList(
            "experience", "education", "skills", "projects", 
            "work experience", "professional experience", "summary"
    );
    
    private static final List<String> ACTION_VERBS = Arrays.asList(
            "developed", "created", "implemented", "designed", "managed",
            "led", "improved", "increased", "reduced", "achieved"
    );
    
    public ATSScoreDTO analyzeATSCompatibility(MultipartFile file) {
        if (file.isEmpty()) {
            throw new BusinessException("File is empty");
        }
        
        String filename = file.getOriginalFilename();
        if (filename == null) {
            throw new BusinessException("Invalid filename");
        }
        
        String text;
        try {
            if (filename.endsWith(".pdf")) {
                text = extractTextFromPDF(file);
            } else if (filename.endsWith(".docx")) {
                text = extractTextFromDOCX(file);
            } else {
                throw new BusinessException("Unsupported file format. Please upload PDF or DOCX");
            }
        } catch (IOException e) {
            throw new BusinessException("Failed to parse resume: " + e.getMessage());
        }
        
        return performComprehensiveATSAnalysis(text);
    }
    
    public ATSScoreDTO analyzeAndSaveATSScore(MultipartFile file, String userEmail) {
        // Analyze the resume
        ATSScoreDTO atsScore = analyzeATSCompatibility(file);
        
        // Find the user
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new BusinessException("User not found"));
        
        // Save ATS score to database
        try {
            String suggestionsJson = objectMapper.writeValueAsString(atsScore.getSuggestions());
            
            ResumeATSScore scoreEntity = ResumeATSScore.builder()
                    .user(user)
                    .overallScore(atsScore.getOverallScore())
                    .formatScore(atsScore.getFormatScore())
                    .keywordScore(atsScore.getKeywordScore())
                    .contentScore(atsScore.getContentScore())
                    .suggestions(suggestionsJson)
                    .resumeFileName(file.getOriginalFilename())
                    .build();
            
            atsScoreRepository.save(scoreEntity);
            log.info("ATS score saved for user: {}", userEmail);
        } catch (Exception e) {
            log.error("Failed to save ATS score: {}", e.getMessage());
            // Don't throw exception, just log it - we still want to return the score
        }
        
        return atsScore;
    }
    
    public ResumeAnalysisDTO analyzeResume(MultipartFile file) {
        if (file.isEmpty()) {
            throw new BusinessException("File is empty");
        }
        
        String filename = file.getOriginalFilename();
        if (filename == null) {
            throw new BusinessException("Invalid filename");
        }
        
        String text;
        try {
            if (filename.endsWith(".pdf")) {
                text = extractTextFromPDF(file);
            } else if (filename.endsWith(".docx")) {
                text = extractTextFromDOCX(file);
            } else {
                throw new BusinessException("Unsupported file format. Please upload PDF or DOCX");
            }
        } catch (IOException e) {
            throw new BusinessException("Failed to parse resume: " + e.getMessage());
        }
        
        return analyzeText(text);
    }
    
    private String extractTextFromPDF(MultipartFile file) throws IOException {
        try (PDDocument document = PDDocument.load(file.getInputStream())) {
            PDFTextStripper stripper = new PDFTextStripper();
            return stripper.getText(document);
        }
    }
    
    private String extractTextFromDOCX(MultipartFile file) throws IOException {
        try (XWPFDocument document = new XWPFDocument(file.getInputStream());
             XWPFWordExtractor extractor = new XWPFWordExtractor(document)) {
            return extractor.getText();
        }
    }
    
    private ResumeAnalysisDTO analyzeText(String text) {
        List<String> skills = extractSkills(text);
        String email = extractEmail(text);
        String phone = extractPhone(text);
        int experienceYears = extractExperience(text);
        int atsScore = calculateATSScore(text, skills);
        List<String> suggestions = generateSuggestions(skills, text);
        
        return ResumeAnalysisDTO.builder()
                .skills(skills)
                .email(email)
                .phone(phone)
                .experienceYears(experienceYears)
                .atsScore(atsScore)
                .suggestions(suggestions)
                .matchedSkillsCount(skills.size())
                .build();
    }
    
    private List<String> extractSkills(String text) {
        List<String> foundSkills = new ArrayList<>();
        String lowerText = text.toLowerCase();
        
        for (String skill : TECH_SKILLS) {
            if (lowerText.contains(skill.toLowerCase())) {
                foundSkills.add(skill);
            }
        }
        
        return foundSkills;
    }
    
    private String extractEmail(String text) {
        Pattern pattern = Pattern.compile("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}");
        Matcher matcher = pattern.matcher(text);
        return matcher.find() ? matcher.group() : null;
    }
    
    private String extractPhone(String text) {
        Pattern pattern = Pattern.compile("\\+?\\d[\\d\\s\\-()]{8,}\\d");
        Matcher matcher = pattern.matcher(text);
        return matcher.find() ? matcher.group() : null;
    }
    
    private int extractExperience(String text) {
        Pattern pattern = Pattern.compile("(\\d+)\\s*(?:years?|yrs?)\\s*(?:of)?\\s*experience", Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern.matcher(text);
        return matcher.find() ? Integer.parseInt(matcher.group(1)) : 0;
    }
    
    private int calculateATSScore(String text, List<String> skills) {
        int score = 0;
        
        // Skills matching (40 points)
        score += Math.min(skills.size() * 4, 40);
        
        // Contact information (20 points)
        if (extractEmail(text) != null) score += 10;
        if (extractPhone(text) != null) score += 10;
        
        // Experience (20 points)
        int exp = extractExperience(text);
        score += Math.min(exp * 5, 20);
        
        // Keywords presence (20 points)
        String lowerText = text.toLowerCase();
        if (lowerText.contains("education")) score += 5;
        if (lowerText.contains("project")) score += 5;
        if (lowerText.contains("certification")) score += 5;
        if (lowerText.contains("achievement")) score += 5;
        
        return Math.min(score, 100);
    }
    
    private List<String> generateSuggestions(List<String> skills, String text) {
        List<String> suggestions = new ArrayList<>();
        
        if (skills.size() < 5) {
            suggestions.add("Add more technical skills to increase your profile strength");
        }
        
        if (extractEmail(text) == null) {
            suggestions.add("Include your email address for better contact visibility");
        }
        
        if (extractPhone(text) == null) {
            suggestions.add("Add your phone number to improve accessibility");
        }
        
        if (!text.toLowerCase().contains("project")) {
            suggestions.add("Include project details to showcase practical experience");
        }
        
        if (!text.toLowerCase().contains("certification")) {
            suggestions.add("Add relevant certifications to strengthen your profile");
        }
        
        if (suggestions.isEmpty()) {
            suggestions.add("Great resume! Keep it updated with latest skills and projects");
        }
        
        return suggestions;
    }
    
    private ATSScoreDTO performComprehensiveATSAnalysis(String text) {
        String lowerText = text.toLowerCase();
        
        // Calculate individual scores
        int formatScore = calculateFormatScore(text, lowerText);
        int keywordScore = calculateKeywordScore(text, lowerText);
        int contentScore = calculateContentScore(text, lowerText);
        
        // Calculate overall score (weighted average)
        int overallScore = (formatScore * 30 + keywordScore * 40 + contentScore * 30) / 100;
        
        // Generate suggestions
        List<ATSScoreDTO.Suggestion> suggestions = generateDetailedSuggestions(
            formatScore, keywordScore, contentScore, text, lowerText
        );
        
        // Find missing keywords
        List<String> missingKeywords = findMissingKeywords(text);
        
        // Identify strengths and weaknesses
        List<String> strengths = identifyStrengths(text, lowerText, formatScore, keywordScore, contentScore);
        List<String> weaknesses = identifyWeaknesses(text, lowerText, formatScore, keywordScore, contentScore);
        
        return ATSScoreDTO.builder()
                .overallScore(overallScore)
                .formatScore(formatScore)
                .keywordScore(keywordScore)
                .contentScore(contentScore)
                .suggestions(suggestions)
                .missingKeywords(missingKeywords)
                .strengths(strengths)
                .weaknesses(weaknesses)
                .build();
    }
    
    private int calculateFormatScore(String text, String lowerText) {
        int score = 0;
        
        // Check for standard sections (40 points)
        int sectionsFound = 0;
        for (String section : STANDARD_SECTIONS) {
            if (lowerText.contains(section)) {
                sectionsFound++;
            }
        }
        score += Math.min(sectionsFound * 8, 40);
        
        // Check for contact info (20 points)
        if (extractEmail(text) != null) score += 10;
        if (extractPhone(text) != null) score += 10;
        
        // Check structure (20 points)
        if (hasProperStructure(text)) score += 20;
        
        // Check length (20 points)
        int wordCount = text.split("\\s+").length;
        if (wordCount >= 300 && wordCount <= 1000) {
            score += 20;
        } else if (wordCount > 200 && wordCount < 1500) {
            score += 10;
        }
        
        return Math.min(score, 100);
    }
    
    private int calculateKeywordScore(String text, String lowerText) {
        int score = 0;
        List<String> foundSkills = extractSkills(text);
        
        // Technical skills (50 points)
        score += Math.min(foundSkills.size() * 5, 50);
        
        // Action verbs (30 points)
        int verbCount = 0;
        for (String verb : ACTION_VERBS) {
            if (lowerText.contains(verb)) {
                verbCount++;
            }
        }
        score += Math.min(verbCount * 3, 30);
        
        // Industry keywords (20 points)
        if (lowerText.contains("agile") || lowerText.contains("scrum")) score += 5;
        if (lowerText.contains("team") || lowerText.contains("collaboration")) score += 5;
        if (lowerText.contains("leadership") || lowerText.contains("management")) score += 5;
        if (lowerText.contains("problem solving") || lowerText.contains("analytical")) score += 5;
        
        return Math.min(score, 100);
    }
    
    private int calculateContentScore(String text, String lowerText) {
        int score = 0;
        
        // Quantifiable achievements (40 points)
        int numberCount = countNumbers(text);
        score += Math.min(numberCount * 8, 40);
        
        // Project descriptions (30 points)
        if (lowerText.contains("project")) {
            int projectMentions = countOccurrences(lowerText, "project");
            score += Math.min(projectMentions * 10, 30);
        }
        
        // Education (15 points)
        if (lowerText.contains("bachelor") || lowerText.contains("master") || 
            lowerText.contains("degree") || lowerText.contains("university")) {
            score += 15;
        }
        
        // Certifications (15 points)
        if (lowerText.contains("certification") || lowerText.contains("certified")) {
            score += 15;
        }
        
        return Math.min(score, 100);
    }
    
    private List<ATSScoreDTO.Suggestion> generateDetailedSuggestions(
            int formatScore, int keywordScore, int contentScore, String text, String lowerText) {
        
        List<ATSScoreDTO.Suggestion> suggestions = new ArrayList<>();
        
        // Format suggestions
        if (formatScore < 70) {
            if (extractEmail(text) == null) {
                suggestions.add(ATSScoreDTO.Suggestion.builder()
                    .type("critical")
                    .text("Add your email address at the top of your resume")
                    .build());
            }
            if (extractPhone(text) == null) {
                suggestions.add(ATSScoreDTO.Suggestion.builder()
                    .type("warning")
                    .text("Include your phone number for better contact visibility")
                    .build());
            }
            if (!hasStandardSections(lowerText)) {
                suggestions.add(ATSScoreDTO.Suggestion.builder()
                    .type("critical")
                    .text("Use standard section headings like 'Work Experience', 'Education', and 'Skills'")
                    .build());
            }
        }
        
        // Keyword suggestions
        if (keywordScore < 70) {
            if (extractSkills(text).size() < 8) {
                suggestions.add(ATSScoreDTO.Suggestion.builder()
                    .type("critical")
                    .text("Add more technical skills relevant to your target job (aim for 8-12 skills)")
                    .build());
            }
            if (!hasActionVerbs(lowerText)) {
                suggestions.add(ATSScoreDTO.Suggestion.builder()
                    .type("warning")
                    .text("Start bullet points with strong action verbs (Developed, Implemented, Led, etc.)")
                    .build());
            }
        }
        
        // Content suggestions
        if (contentScore < 70) {
            if (countNumbers(text) < 3) {
                suggestions.add(ATSScoreDTO.Suggestion.builder()
                    .type("critical")
                    .text("Include quantifiable achievements with numbers and metrics (e.g., 'Increased efficiency by 30%')")
                    .build());
            }
            if (!lowerText.contains("project")) {
                suggestions.add(ATSScoreDTO.Suggestion.builder()
                    .type("warning")
                    .text("Add project descriptions to showcase practical experience")
                    .build());
            }
        }
        
        // General suggestions
        if (text.split("\\s+").length > 1500) {
            suggestions.add(ATSScoreDTO.Suggestion.builder()
                .type("info")
                .text("Consider reducing resume length - aim for 1-2 pages (300-1000 words)")
                .build());
        }
        
        suggestions.add(ATSScoreDTO.Suggestion.builder()
            .type("info")
            .text("Remove graphics, tables, and complex formatting - ATS systems prefer simple text")
            .build());
        
        suggestions.add(ATSScoreDTO.Suggestion.builder()
            .type("info")
            .text("Save your resume as PDF with embedded text (not images)")
            .build());
        
        return suggestions;
    }
    
    private List<String> findMissingKeywords(String text) {
        List<String> missing = new ArrayList<>();
        List<String> found = extractSkills(text);
        
        for (String skill : TECH_SKILLS) {
            if (!found.contains(skill)) {
                missing.add(skill);
                if (missing.size() >= 10) break; // Limit to 10 suggestions
            }
        }
        
        return missing;
    }
    
    private List<String> identifyStrengths(String text, String lowerText, 
                                          int formatScore, int keywordScore, int contentScore) {
        List<String> strengths = new ArrayList<>();
        
        if (formatScore >= 80) strengths.add("Well-structured format with clear sections");
        if (keywordScore >= 80) strengths.add("Rich keyword density with relevant skills");
        if (contentScore >= 80) strengths.add("Strong content with quantifiable achievements");
        if (extractEmail(text) != null && extractPhone(text) != null) {
            strengths.add("Complete contact information");
        }
        if (countNumbers(text) >= 5) {
            strengths.add("Good use of metrics and numbers");
        }
        if (extractSkills(text).size() >= 10) {
            strengths.add("Comprehensive skills section");
        }
        
        return strengths;
    }
    
    private List<String> identifyWeaknesses(String text, String lowerText,
                                           int formatScore, int keywordScore, int contentScore) {
        List<String> weaknesses = new ArrayList<>();
        
        if (formatScore < 60) weaknesses.add("Resume structure needs improvement");
        if (keywordScore < 60) weaknesses.add("Insufficient relevant keywords");
        if (contentScore < 60) weaknesses.add("Lacks quantifiable achievements");
        if (extractSkills(text).size() < 5) weaknesses.add("Limited skills listed");
        if (countNumbers(text) < 2) weaknesses.add("Few measurable results shown");
        if (!hasActionVerbs(lowerText)) weaknesses.add("Weak action verbs in descriptions");
        
        return weaknesses;
    }
    
    private boolean hasProperStructure(String text) {
        return text.length() > 200 && text.contains("\n");
    }
    
    private boolean hasStandardSections(String lowerText) {
        int count = 0;
        for (String section : STANDARD_SECTIONS) {
            if (lowerText.contains(section)) count++;
        }
        return count >= 3;
    }
    
    private boolean hasActionVerbs(String lowerText) {
        for (String verb : ACTION_VERBS) {
            if (lowerText.contains(verb)) return true;
        }
        return false;
    }
    
    private int countNumbers(String text) {
        Pattern pattern = Pattern.compile("\\d+");
        Matcher matcher = pattern.matcher(text);
        int count = 0;
        while (matcher.find()) {
            count++;
        }
        return count;
    }
    
    private int countOccurrences(String text, String word) {
        int count = 0;
        int index = 0;
        while ((index = text.indexOf(word, index)) != -1) {
            count++;
            index += word.length();
        }
        return count;
    }
}
