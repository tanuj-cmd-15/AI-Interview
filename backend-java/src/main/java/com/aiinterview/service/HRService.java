package com.aiinterview.service;

import com.aiinterview.dto.interview.InterviewDTO;
import com.aiinterview.dto.interview.SendInvitationRequest;
import com.aiinterview.dto.question.QuestionDTO;
import com.aiinterview.dto.question.CreateQuestionRequest;
import com.aiinterview.exception.BusinessException;
import com.aiinterview.model.Interview;
import com.aiinterview.model.Question;
import com.aiinterview.model.ResumeATSScore;
import com.aiinterview.model.User;
import com.aiinterview.repository.InterviewRepository;
import com.aiinterview.repository.QuestionRepository;
import com.aiinterview.repository.ResumeATSScoreRepository;
import com.aiinterview.repository.UserRepository;
import com.aiinterview.util.PasswordGenerator;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HRService {
    
    private final InterviewRepository interviewRepository;
    private final QuestionRepository questionRepository;
    private final UserRepository userRepository;
    private final ResumeATSScoreRepository atsScoreRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;
    
    @Transactional(readOnly = true)
    public List<InterviewDTO> getAllCandidates() {
        List<Interview> interviews = interviewRepository.findAll();
        return interviews.stream()
                .map(interview -> {
                    InterviewDTO dto = InterviewDTO.fromEntity(interview);
                    // Populate ATS score if available
                    Optional<ResumeATSScore> atsScore = atsScoreRepository.findTopByUserOrderByAnalyzedAtDesc(interview.getCandidate());
                    if (atsScore.isPresent()) {
                        dto.setAtsScore(atsScore.get().getOverallScore());
                        dto.setHasAtsScore(true);
                    }
                    return dto;
                })
                .collect(Collectors.toList());
    }
    
    @Transactional
    public InterviewDTO updateCandidateStatus(Long interviewId, String status) {
        Interview interview = interviewRepository.findById(interviewId)
                .orElseThrow(() -> new BusinessException("Interview not found"));
        
        try {
            interview.setStatus(Interview.InterviewStatus.valueOf(status.toUpperCase()));
            interview = interviewRepository.save(interview);
            return InterviewDTO.fromEntity(interview);
        } catch (IllegalArgumentException e) {
            throw new BusinessException("Invalid status value");
        }
    }
    
    @Transactional
    public InterviewDTO updateCandidateStage(Long interviewId, String stage) {
        Interview interview = interviewRepository.findById(interviewId)
                .orElseThrow(() -> new BusinessException("Interview not found"));
        
        try {
            interview.setStage(Interview.PipelineStage.valueOf(stage.toUpperCase()));
            interview = interviewRepository.save(interview);
            return InterviewDTO.fromEntity(interview);
        } catch (IllegalArgumentException e) {
            throw new BusinessException("Invalid stage value");
        }
    }
    
    @Transactional(readOnly = true)
    public List<QuestionDTO> getQuestions(String category) {
        List<Question> questions;
        
        if (category != null && !category.isEmpty()) {
            try {
                Question.QuestionCategory cat = Question.QuestionCategory.valueOf(category.toUpperCase());
                questions = questionRepository.findByCategory(cat);
            } catch (IllegalArgumentException e) {
                questions = questionRepository.findByIsActiveTrueOrderByCreatedAtDesc();
            }
        } else {
            questions = questionRepository.findByIsActiveTrueOrderByCreatedAtDesc();
        }
        
        return questions.stream()
                .map(QuestionDTO::fromEntity)
                .collect(Collectors.toList());
    }
    
    @Transactional
    public QuestionDTO createQuestion(CreateQuestionRequest request, String email) {
        User creator = userRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessException("User not found"));
        
        Question question = Question.builder()
                .text(request.getText())
                .category(Question.QuestionCategory.valueOf(request.getCategory().toUpperCase()))
                .difficulty(Question.QuestionDifficulty.valueOf(request.getDifficulty().toUpperCase()))
                .createdBy(creator)
                .isActive(true)
                .build();
        
        question = questionRepository.save(question);
        return QuestionDTO.fromEntity(question);
    }
    
    @Transactional
    public QuestionDTO updateQuestion(Long questionId, CreateQuestionRequest request) {
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new BusinessException("Question not found"));
        
        question.setText(request.getText());
        question.setCategory(Question.QuestionCategory.valueOf(request.getCategory().toUpperCase()));
        question.setDifficulty(Question.QuestionDifficulty.valueOf(request.getDifficulty().toUpperCase()));
        
        question = questionRepository.save(question);
        return QuestionDTO.fromEntity(question);
    }
    
    @Transactional
    public void deleteQuestion(Long questionId) {
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new BusinessException("Question not found"));
        
        questionRepository.delete(question);
    }
    
    @Transactional
    public User sendInterviewInvitation(SendInvitationRequest request) {
        // Check if user already exists
        Optional<User> existingUser = userRepository.findByEmail(request.getEmail());
        
        User candidate;
        String temporaryPassword;
        boolean isNewUser = false;
        
        if (existingUser.isPresent()) {
            candidate = existingUser.get();
            // For existing users, we don't change password, just send notification
            temporaryPassword = null;
        } else {
            // Create new user with temporary password
            temporaryPassword = PasswordGenerator.generateTemporaryPassword();
            
            candidate = User.builder()
                    .name(request.getCandidateName())
                    .email(request.getEmail())
                    .passwordHash(passwordEncoder.encode(temporaryPassword))
                    .role(User.UserRole.STUDENT)
                    .authProvider(User.AuthProvider.LOCAL)
                    .isActive(true)
                    .build();
            
            candidate = userRepository.save(candidate);
            isNewUser = true;
        }
        
        // Create interview entry
        Interview interview = Interview.builder()
                .candidate(candidate)
                .interviewType(Interview.InterviewType.valueOf(request.getInterviewType().toUpperCase()))
                .status(Interview.InterviewStatus.PENDING_REVIEW)
                .stage(Interview.PipelineStage.APPLIED)
                .score(0)
                .build();
        
        interviewRepository.save(interview);
        
        // Send appropriate email
        if (isNewUser && temporaryPassword != null) {
            emailService.sendInterviewInvitation(
                request.getEmail(),
                request.getCandidateName(),
                temporaryPassword,
                request.getInterviewType()
            );
        } else {
            // Send assessment notification for existing user
            emailService.sendAssessmentNotification(
                request.getEmail(),
                candidate.getName(),
                request.getAssessmentTitle() != null ? request.getAssessmentTitle() : "Interview Assessment",
                request.getDeadline() != null ? request.getDeadline() : "Not specified"
            );
        }
        
        return candidate;
    }
}
