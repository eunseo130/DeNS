package com.ssafy.BackEnd.service;

import com.ssafy.BackEnd.entity.*;
import com.ssafy.BackEnd.repository.TeamMemberRepository;
import com.ssafy.BackEnd.repository.TeamRespository;
import com.ssafy.BackEnd.repository.UserRepository;
import javassist.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.ArrayList;

import com.ssafy.BackEnd.entity.Team;

@Service
@RequiredArgsConstructor
public class TeamServiceImpl implements TeamService{

    private final TeamRespository teamRespository;

    private final TeamMemberRepository teamMemberRepository;

    private final UserRepository userRepository;

    @Override
    public Team findByTeam(Long team_id) throws NotFoundException {
        Team findTeam = teamRespository.findByTeam(team_id);
        if(findTeam == null) throw new NotFoundException("팀을 찾을 수 없습니다");

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
        old_team.setTitle(team.getTitle()); //팀 이름만 수정

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

<<<<<<< HEAD
    @Override
    public List<Team> showTeamList() {
        List<Team> teams = new ArrayList<>();
        teamRespository.findAll().forEach(team -> teams.add(team));

        return teams;
    }

    @Override
    public void modifyTeamProfile(long team_id, Team team) {
        Team old_team = teamRespository.findByTeam(team_id);
        old_team.setContent(team.getContent()); //content(팀 프로필)만 수정

        teamRespository.save(team);
    }

    @Override
    public TeamMember setTeamLeader(Team team, String email) {
        TeamMember teamMember = new TeamMember();
        teamMember.setTeam(team);
        teamMember.setUser(userRepository.findByEmail(email));
        teamMember.setTeam_identity(TeamMemberIdentity.LEADER);

        teamMemberRepository.save(teamMember);

        return teamMember;
    }

=======
 
>>>>>>> 81c03c13c7088d0b9919f0354c5bff75eca153a7

}
