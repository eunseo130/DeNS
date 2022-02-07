package com.ssafy.BackEnd.service;

import com.ssafy.BackEnd.entity.Team;
import com.ssafy.BackEnd.entity.TeamMember;
import com.ssafy.BackEnd.entity.User;

import java.util.List;

public interface TeamMemberService{

    TeamMember addTeamMember(String email, Long teamId);

    TeamMember deleteTeamMember(String email, String teamName);

    Team mergeTeam(Long teamId1, Long teamId2);

    TeamMember addTeamLeader(String email, Team team);

    List<User> showTeamMemberList(Long team_id);

}
