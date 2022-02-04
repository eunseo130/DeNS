package com.ssafy.BackEnd.controller;

import com.ssafy.BackEnd.dto.TeamDto;
import com.ssafy.BackEnd.entity.Response;
import com.ssafy.BackEnd.entity.Team;
import com.ssafy.BackEnd.entity.TeamMember;
import com.ssafy.BackEnd.entity.User;
import com.ssafy.BackEnd.repository.TeamRespository;
import com.ssafy.BackEnd.service.TeamMemberService;
import com.ssafy.BackEnd.service.TeamService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/teammember")
@RequiredArgsConstructor
public class TeamMemberController {

    private final TeamMemberService teamMemberService;

    @PostMapping
    public ResponseEntity<TeamMember> createTeamMember(@RequestParam String email, @RequestParam Long teamId) {
        System.out.println("cont "+email+" "+teamId);
        TeamMember teamMember = teamMemberService.addTeamMember(email, teamId);
        if (teamMember == null) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<TeamMember>(teamMember, HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<TeamMember> deleteTeamMember(@RequestParam String email, @RequestParam String teamName) {
        TeamMember teammember = teamMemberService.deleteTeamMember(email, teamName);
        if (teammember != null) return new ResponseEntity<TeamMember>(teammember, HttpStatus.OK);
        return new ResponseEntity<TeamMember>((TeamMember) null, HttpStatus.NOT_FOUND);
    }

    @PutMapping
    public ResponseEntity<Team> mergeTeam(@RequestParam Long teamId1, @RequestParam Long teamId2) {
        Team newTeam = teamMemberService.mergeTeam(teamId1, teamId2);
        return new ResponseEntity<Team>(newTeam, HttpStatus.OK);
    }

    @GetMapping //팀 아이디로 팀별 멤버 목록 반환
    public ResponseEntity<List<User>> showTeamMemberList(@RequestParam Long team_id) {
        List<User> teammembers = teamMemberService.showTeamMemberList(team_id);

        for (User u : teammembers){
            System.out.println("여기야 "+u.getName());
        }

        return new ResponseEntity<List<User>>(teammembers, HttpStatus.OK);
    }

//    @PutMapping
//    public ResponseEntity<Team> addTeamMember(@RequestParam String email, @RequestParam String teamName) {
//        Team team = teamMemberService.addTeamMember(email, teamName);
//
//        return new ResponseEntity<Team>(team, HttpStatus.OK);
//    }
}
