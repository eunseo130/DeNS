package com.ssafy.BackEnd.service;

import com.ssafy.BackEnd.entity.Team;
import com.ssafy.BackEnd.repository.TeamRespository;
import javassist.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import com.ssafy.BackEnd.entity.Team;

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
    public Team createTeam(Team team) {
        teamRespository.save(team);
        return team;
    }

    @Override
    public void modifyTeam(long team_id, Team team){
        Team old_team = teamRespository.findByTeam(team_id);
        old_team.setTitle(team.getTitle());
        old_team.setContent(team.getContent());

        teamRespository.save(team);
    }

    @Override
    public void deleteTeam(long team_id) {
        teamRespository.deleteById(team_id);
    }

    @Override
    public List<Team> showFindTeamList(String keyword) {
            List<Team> teams = teamRespository.findAll();
            System.out.println(teams.toString());
            return teams;
    }

 

}
