package com.ssafy.BackEnd.service;

import com.ssafy.BackEnd.dto.TeamFeedDto;
import com.ssafy.BackEnd.entity.*;
import com.ssafy.BackEnd.exception.CustomException;
import com.ssafy.BackEnd.exception.ErrorCode;
import com.ssafy.BackEnd.repository.ProfileRepository;
import com.ssafy.BackEnd.repository.TeamMemberRepository;
import com.ssafy.BackEnd.repository.TeamRespository;
import com.ssafy.BackEnd.repository.UserRepository;
import javassist.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.ArrayList;

import com.ssafy.BackEnd.entity.Team;

@Service
@RequiredArgsConstructor
public class TeamServiceImpl implements TeamService{

    private final TeamRespository teamRespository;

    private final TeamMemberRepository teamMemberRepository;

    private final UserRepository userRepository;

    private final ProfileRepository profileRepository;

    @Override
    public Team findByTeam(Long team_id) throws NotFoundException {
        Team findTeam = teamRespository.findByTeam(team_id);
        if(findTeam == null) {
            throw new CustomException("찾는 팀 없음", ErrorCode.NO_VALUE_ERROR);
        }

        return findTeam;
    }

    @Override
    public Team createTeam(Team team) {
        if (team.getTitle() == null) {
            throw new CustomException("팀 제목이 없습니다", ErrorCode.NO_VALUE_ERROR);
        }
        else {
            teamRespository.save(team);
            return team;
        }
    }

    @Override
    public void modifyTeam(long team_id, Team team){
        Team old_team = teamRespository.findByTeam(team_id);

        if (old_team == null) {
            throw new CustomException("수정할 팀 정보 없음", ErrorCode.NO_VALUE_ERROR);
        }
        else if (team.getTitle() == null) {
            throw new CustomException("팀 제목 없음", ErrorCode.NO_VALUE_ERROR);
        }
        else {
            old_team.setTitle(team.getTitle()); //팀 이름만 수정
            teamRespository.save(old_team);
        }

    }

    @Override
    public void deleteTeam(long team_id) {
        if (team_id == 0) {
            throw new CustomException("팀 아이디가 없음", ErrorCode.NO_VALUE_ERROR);
        }
        teamRespository.deleteById(team_id);
    }

    @Override
    public List<Team> showFindTeamList(String keyword) {
        if (keyword == null) {
            throw new CustomException("검색어가 없음", ErrorCode.NO_VALUE_ERROR);
        }

        List<Team> teams = teamRespository.findByTitleContaining(keyword);

        if (teams.isEmpty()) {
            throw new CustomException("팀 리스트 없음", ErrorCode.NO_VALUE_ERROR);
        }

        System.out.println(teams.toString());
        return teams;
    }

    @Override
    public List<Team> showTeamList() {
        List<Team> teams = new ArrayList<>();
        teamRespository.findAll().forEach(team -> teams.add(team));

        if (teams.isEmpty()) {
            throw new CustomException("팀 리스트 없음", ErrorCode.NO_VALUE_ERROR);
        }

        return teams;
    }

    @Override
    public List<Team> showMyTeamList(Long profile_id) {
        List<Team> my_teams = new ArrayList<>();
        teamRespository.showMyTeamList(profile_id).forEach(myteam -> my_teams.add(myteam));

        if (my_teams.isEmpty()) {
            throw new CustomException("내 팀 리스트 없음", ErrorCode.NO_VALUE_ERROR);
        }

        return my_teams;

    }

    @Override
    public void modifyTeamProfile(long team_id, Team team) {
        Team old_team = teamRespository.findByTeam(team_id);

        if (old_team == null) {
            throw new CustomException("수정할 팀 정보 없음", ErrorCode.NO_VALUE_ERROR);
        }
        else if (team.getContent() == null) {
            throw new CustomException("팀 프로필 내용 없음", ErrorCode.NO_VALUE_ERROR);
        }

        old_team.setContent(team.getContent()); //content(팀 프로필)만 수정
        teamRespository.save(old_team);
    }

    @Override
    public TeamMember setTeamLeader(Team team, String email) {
        if (email == null) {
            throw new CustomException("유저 이메일 없음", ErrorCode.NO_VALUE_ERROR);
        }
        else if (team == null) {
            throw new CustomException("팀 정보 없음", ErrorCode.NO_VALUE_ERROR);
        }

        TeamMember teamMember = new TeamMember();
        teamMember.setTeam(team);
        teamMember.setUser(userRepository.findByEmail(email));
        teamMember.setTeam_identity(TeamMemberIdentity.LEADER);

        teamMemberRepository.save(teamMember);

        return teamMember;
    }

}

