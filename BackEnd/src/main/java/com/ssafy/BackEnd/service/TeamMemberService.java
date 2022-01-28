package com.ssafy.BackEnd.service;

import com.ssafy.BackEnd.entity.Team;
import com.ssafy.BackEnd.entity.TeamMember;

public interface TeamMemberService{

    TeamMember addTeamMember(String email, String teamName);
}
