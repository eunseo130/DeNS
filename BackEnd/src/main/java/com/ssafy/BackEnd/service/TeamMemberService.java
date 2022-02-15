package com.ssafy.BackEnd.service;

import com.ssafy.BackEnd.dto.TeamMemberDto;
import com.ssafy.BackEnd.dto.UserDto;
import com.ssafy.BackEnd.entity.Team;
import com.ssafy.BackEnd.entity.TeamMember;
import com.ssafy.BackEnd.entity.TeamMemberIdentity;
import com.ssafy.BackEnd.entity.User;

import java.util.List;
import java.util.Map;

public interface TeamMemberService{

    TeamMember addTeamMember(String email, Long teamId);

    TeamMember deleteTeamMember(TeamMemberDto teamMemberDto, long team_id);

    Team mergeTeam(Long teamId1, Long teamId2);

    TeamMember addTeamLeader(String email, Team team);

    List<User> showTeamMemberList(Long team_id);

    TeamMember getMyTeamIndentity(long team_id, UserDto userDto);

}
