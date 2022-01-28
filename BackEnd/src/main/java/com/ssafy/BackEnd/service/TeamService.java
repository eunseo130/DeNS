package com.ssafy.BackEnd.service;

import com.ssafy.BackEnd.entity.Team;
import javassist.NotFoundException;

import java.util.List;

public interface TeamService {

    Team findByTeam(Long team_id) throws NotFoundException;

    void createTeam(Team team);

    Team modifyTeam(String name, Team team) throws NotFoundException;

    List<Team> showTeamList();
    // List<Team> showFindTeamList(String keyword);
}
