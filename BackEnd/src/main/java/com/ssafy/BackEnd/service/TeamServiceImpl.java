package com.ssafy.BackEnd.service;

import com.ssafy.BackEnd.entity.Team;
import com.ssafy.BackEnd.repository.TeamRespository;
import javassist.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TeamServiceImpl implements TeamService{

    private TeamRespository teamRespository;


    @Override
    public Team findByTeam(Long team_id) throws NotFoundException {
        Team findTeam = teamRespository.findByTeam(team_id);
        if(findTeam==null) throw new NotFoundException("팀을 찾을 수 없습니다");
        return findTeam;
    }

    @Override
    public void createTeam(Team team) {

    }

    @Override
    public Team modifyTeam(String name, Team team) throws NotFoundException {
        return null;
    }
}
