package com.ssafy.BackEnd.repository;


import com.ssafy.BackEnd.entity.ProfileKeyword;
import com.ssafy.BackEnd.entity.TeamFeedKeyword;
import com.ssafy.BackEnd.entity.TeamKeyword;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TeamKeywordRepository extends JpaRepository<TeamKeyword, Long> {

    @Query(value = "select k from TeamKeyword k where keyword_id = :keyword_id and team_id = :team_id")
    TeamKeyword findTeamKeyword(Long keyword_id, Long team_id);

    @Query(value = "select k from TeamKeyword k where name = :name")
    TeamKeyword findByName(String name);
}
