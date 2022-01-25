package com.ssafy.BackEnd.controller;

import com.ssafy.BackEnd.entity.Response;
import com.ssafy.BackEnd.repository.TeamRespository;
import com.ssafy.BackEnd.service.TeamService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import com.ssafy.BackEnd.entity.Team;

@RestController
@Api(tags = "팀 컨트롤러 API")
@RequestMapping("/team")
public class TeamController {

    @Autowired
    TeamService teamService;

    @Autowired
    TeamRespository teamRespository;

    @PostMapping("/")
    @ApiOperation(value = "팀 만들기")
    public ResponseEntity<Team> createTeam(@RequestBody Team team) {
        return new ResponseEntity<Team>(teamService.createTeam(team), HttpStatus.OK);

    }

    @GetMapping("/{team_id}")
    @ApiOperation(value = "팀 조회")
    public void findTeam() {

    }


    @PutMapping("/{team_id}")
    @ApiOperation(value = "팀 수정")
    public ResponseEntity<Team> modifyTeam(@RequestBody long team_id, @RequestBody Team team) {
        teamService.modifyTeam(team_id, team);
        return new ResponseEntity<Team>(team, HttpStatus.OK);

    }

    @DeleteMapping("/{team_id}")
    @ApiOperation(value = "팀 삭제")
    public ResponseEntity<Void> deleteTeam(@RequestParam long team_id){
        teamService.deleteTeam(team_id);
        return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
    }

    // ------ team manage

    @PostMapping("/profile")
    @ApiOperation(value = "팀 프로필 만들기")
    public void createTeamProfile(){

    }

    @GetMapping("/profile/{team_id}")
    @ApiOperation(value = "팀 프로필 조회")
    public void findTeamProfile() {

    }


    @PutMapping("/profile/{team_id}")
    @ApiOperation(value = "팀 프로필 수정")
    public void modifyTeamProfile() {

    }

    @DeleteMapping("/profile/{team_id}")
    @ApiOperation(value = "팀 프로필 삭제")
    public void deleteTeamProfile(){

    }
}
