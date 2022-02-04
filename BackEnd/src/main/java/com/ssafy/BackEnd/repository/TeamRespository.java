package com.ssafy.BackEnd.repository;

import java.util.List;

import com.ssafy.BackEnd.entity.Team;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TeamRespository extends JpaRepository<Team, Long> {
    //Optional<Team> findByTeam(Long team_id);

    @Query("select t from Team t where team_id = :team_id")
    Team findByTeam(Long team_id);

    List<Team> findByTitleContaining(String keyword);

    Team findByTitle(String title);

    @Override
    void deleteById(Long aLong);
}
