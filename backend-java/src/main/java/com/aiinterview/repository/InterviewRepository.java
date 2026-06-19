package com.aiinterview.repository;

import com.aiinterview.model.Interview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InterviewRepository extends JpaRepository<Interview, Long> {
    
    List<Interview> findByCandidateIdOrderByCreatedAtDesc(Long candidateId);
    
    List<Interview> findTop10ByCandidateIdOrderByCreatedAtDesc(Long candidateId);
    
    @Query("SELECT AVG(i.score) FROM Interview i WHERE i.candidate.id = :candidateId")
    Double findAverageScoreByCandidateId(Long candidateId);
    
    Long countByCandidateId(Long candidateId);
}
