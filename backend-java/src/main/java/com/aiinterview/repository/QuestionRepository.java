package com.aiinterview.repository;

import com.aiinterview.model.Question;
import com.aiinterview.model.Question.QuestionCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
    
    List<Question> findByCategoryAndIsActiveTrue(QuestionCategory category);
    
    List<Question> findByIsActiveTrueOrderByCreatedAtDesc();
    
    List<Question> findByCategory(QuestionCategory category);
}
