package com.aiinterview.service;

import com.aiinterview.dto.interview.InterviewDTO;
import com.aiinterview.dto.student.StudentStatsDTO;
import com.aiinterview.exception.BusinessException;
import com.aiinterview.model.Interview;
import com.aiinterview.model.User;
import com.aiinterview.repository.InterviewRepository;
import com.aiinterview.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StudentService {
    
    private final UserRepository userRepository;
    private final InterviewRepository interviewRepository;
    
    @Transactional(readOnly = true)
    public StudentStatsDTO getStudentStats(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessException("User not found"));
        
        Long interviewsCompleted = interviewRepository.countByCandidateId(user.getId());
        Double avgScore = interviewRepository.findAverageScoreByCandidateId(user.getId());
        
        List<Interview> interviews = interviewRepository.findByCandidateIdOrderByCreatedAtDesc(user.getId());
        String lastActivity = interviews.isEmpty() ? null : 
                             interviews.get(0).getCreatedAt().toString();
        
        return StudentStatsDTO.builder()
                .interviewsCompleted(interviewsCompleted.intValue())
                .averageScore(avgScore != null ? avgScore.intValue() : 0)
                .lastActivity(lastActivity)
                .build();
    }
    
    @Transactional(readOnly = true)
    public List<InterviewDTO> getRecentActivity(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessException("User not found"));
        
        List<Interview> interviews = interviewRepository
                .findTop10ByCandidateIdOrderByCreatedAtDesc(user.getId());
        
        return interviews.stream()
                .map(InterviewDTO::fromEntity)
                .collect(Collectors.toList());
    }
}
