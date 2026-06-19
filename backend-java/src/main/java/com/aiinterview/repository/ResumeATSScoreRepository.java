package com.aiinterview.repository;

import com.aiinterview.model.ResumeATSScore;
import com.aiinterview.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ResumeATSScoreRepository extends JpaRepository<ResumeATSScore, Long> {
    
    Optional<ResumeATSScore> findTopByUserOrderByAnalyzedAtDesc(User user);
    
    Optional<ResumeATSScore> findByUserId(Long userId);
}
