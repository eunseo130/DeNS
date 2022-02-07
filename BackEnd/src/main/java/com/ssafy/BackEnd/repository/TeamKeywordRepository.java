package com.ssafy.BackEnd.repository;

import com.ssafy.BackEnd.entity.TeamKeyword;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TeamKeywordRepository extends JpaRepository<TeamKeyword, Long> {
    @Query(value = "select k from TeamKeyword k where keyword_id = :keyword_id")
    TeamKeyword findByKeywordId(Long keyword_id);
}
