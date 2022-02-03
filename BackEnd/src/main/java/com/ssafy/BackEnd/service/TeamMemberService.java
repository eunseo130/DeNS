package com.ssafy.BackEnd.service;

import com.ssafy.BackEnd.entity.Team;
import com.ssafy.BackEnd.entity.TeamMember;

public interface TeamMemberService{

    TeamMember addTeamMember(String email, String teamName);

    TeamMember deleteTeamMember(String email, String teamName);

    Team mergeTeam(Long teamId1, Long teamId2);

    TeamMember addTeamLeader(String email, Team team);
}
