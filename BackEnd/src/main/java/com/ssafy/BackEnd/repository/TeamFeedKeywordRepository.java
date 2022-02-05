package com.ssafy.BackEnd.repository;

import com.ssafy.BackEnd.entity.ProfileKeyword;
import com.ssafy.BackEnd.entity.TeamFeedKeyword;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TeamFeedKeywordRepository extends JpaRepository<TeamFeedKeyword, Long> {

    @Query(value = "select k from TeamFeedKeyword k where keyword_id = :keyword_id")
    TeamFeedKeyword findByKeywordId(Long keyword_id);
}
