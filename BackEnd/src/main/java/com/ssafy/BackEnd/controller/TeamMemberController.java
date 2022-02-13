package com.ssafy.BackEnd.controller;

import com.ssafy.BackEnd.dto.TeamMemberDto;
import com.ssafy.BackEnd.entity.Team;
import com.ssafy.BackEnd.entity.TeamMember;
import com.ssafy.BackEnd.entity.TeamMemberIdentity;
import com.ssafy.BackEnd.entity.User;
import com.ssafy.BackEnd.exception.CustomException;
import com.ssafy.BackEnd.exception.ErrorCode;
import com.ssafy.BackEnd.service.TeamMemberService;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/teammember")
@RequiredArgsConstructor
public class TeamMemberController {
    private static final Logger logger = LogManager.getLogger(TeamMemberController.class);

    private final TeamMemberService teamMemberService;

    @PostMapping
    public ResponseEntity<TeamMember> createTeamMember(@RequestParam String email, @RequestParam Long teamId) {
        System.out.println("cont "+email+" "+teamId);
        TeamMember teamMember = teamMemberService.addTeamMember(email, teamId);
        if (teamMember == null) {
            throw new CustomException(ErrorCode.NOT_ADD_TEAMMEMBER);
            //return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

        logger.info("INFO SUCCESS");
        return new ResponseEntity<TeamMember>(teamMember, HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<TeamMember> deleteTeamMember(@RequestBody TeamMemberDto teamMemberDto) {
        TeamMemberDto teamMember = new TeamMemberDto(teamMemberDto.getEmail(), teamMemberDto.getTeamName());
        System.out.println(teamMember.getEmail() + "DFSF" + teamMember.getTeamName());
        TeamMember teammember = teamMemberService.deleteTeamMember(teamMember.getEmail(), teamMember.getTeamName());

        if (teammember == null) {
            logger.error("NO DELETE TEAMMEMBER");
            throw new CustomException(ErrorCode.NO_DATA_ERROR);
            //return new ResponseEntity<TeamMember>((TeamMember) null, HttpStatus.NOT_FOUND);
        }
        logger.info("INFO SUCCESS");

        return new ResponseEntity<TeamMember>(teammember, HttpStatus.OK);

    }

    @PutMapping
    public ResponseEntity<Team> mergeTeam(@RequestParam Long teamId1, @RequestParam Long teamId2) {
        Team newTeam = teamMemberService.mergeTeam(teamId1, teamId2);
        if (newTeam == null) {
            logger.error("NO MERGE TEAM");
            throw new CustomException(ErrorCode.NO_DATA_ERROR);
        }

        logger.info("INFO SUCCESS");
        return new ResponseEntity<Team>(newTeam, HttpStatus.OK);
    }

    @GetMapping("/{team_id}") //팀 아이디로 팀별 멤버 목록 반환
    public ResponseEntity<List<User>> showTeamMemberList(@PathVariable Long team_id) {
        //Map<String, TeamMemberIdentity> stringTeamMemberIdentityMap = teamMemberService.showTeamMemberList(team_id);
        List<User> teammemberlist = new ArrayList<>();
        teammemberlist = teamMemberService.showTeamMemberList(team_id);

        if (teammemberlist.isEmpty()) {
            logger.error("NO TEAMMEMBER");
            throw new CustomException(ErrorCode.NO_DATA_ERROR);
        }

        //System.out.println(stringTeamMemberIdentityMap);
        logger.info("INFO SUCCESS");
        return new ResponseEntity<List<User>>(teammemberlist, HttpStatus.OK);
    }
    @GetMapping("/getidentity/{team_id}") //이메일과 팀아이디로 자신의 팀아이덴티티 확인하기
    public ResponseEntity<TeamMember> getMyTeamIndentity(@PathVariable long team_id, @RequestParam String email) {

        TeamMember teamMember = teamMemberService.getMyTeamIndentity(team_id, email);

        return new ResponseEntity<TeamMember>(teamMember, HttpStatus.OK);

    }

}
