package com.ssafy.BackEnd.controller;

import com.ssafy.BackEnd.dto.TeamDto;
import com.ssafy.BackEnd.entity.Response;
import com.ssafy.BackEnd.entity.Team;
import com.ssafy.BackEnd.entity.TeamMember;
import com.ssafy.BackEnd.repository.TeamRespository;
import com.ssafy.BackEnd.service.TeamMemberService;
import com.ssafy.BackEnd.service.TeamService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/teammember")
@RequiredArgsConstructor
public class TeamMemberController {

    private final TeamMemberService teamMemberService;

    @PostMapping
    public ResponseEntity<TeamMember> createTeamMember(@RequestParam String email, @RequestParam String teamName) {
        System.out.println("cont "+email+" "+teamName);
        TeamMember teamMember = teamMemberService.addTeamMember(email, teamName);
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
//    @PutMapping
//    public ResponseEntity<Team> addTeamMember(@RequestParam String email, @RequestParam String teamName) {
//        Team team = teamMemberService.addTeamMember(email, teamName);
//
//        return new ResponseEntity<Team>(team, HttpStatus.OK);
//    }
}
