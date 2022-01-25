package com.ssafy.BackEnd.controller;

import com.ssafy.BackEnd.entity.Response;
import com.ssafy.BackEnd.repository.TeamRespository;
import com.ssafy.BackEnd.service.TeamService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import com.ssafy.BackEnd.entity.Team;
import java.util.List;

@RestController
@Api(tags = "팀 컨트롤러 API")
@RequestMapping("/team")
public class TeamController {

    @Autowired
    TeamService teamService;

    @Autowired
    TeamRespository teamRespository;

    @GetMapping
    @ApiOperation(value = "팀 목록 가져오기")
    public ResponseEntity<List<Team>> getAllTeams() {
        List<Team> teams = teamService.showTeamList();
        return new ResponseEntity<List<Team>>(teams, HttpStatus.OK);
    }

    @PostMapping("/")
    @ApiOperation(value = "팀 만들기")
    public ResponseEntity<Team> createTeam(@RequestBody Team team) {
        return new ResponseEntity<Team>(teamService.createTeam(team), HttpStatus.OK);

    }

    @GetMapping("/{team_id}")
    @ApiOperation(value = "팀 조회")
    public ResponseEntity<Team> findTeam(@RequestParam long team_id) throws NotFoundException {
        return new ResponseEntity<Team>(teamService.findByTeam(team_id), HttpStatus.OK);
    }


    @PutMapping("/{team_id}")
    @ApiOperation(value = "팀 수정") //팀 수정이 무엇에 대한 수정인가(name과 content에 대한 수정??)
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
    public void findTeamProfile() { // 팀 컨텐츠 수정 (소개 같은거)

    }


    @PutMapping("/profile/{team_id}")
    @ApiOperation(value = "팀 프로필 수정")
    public void modifyTeamProfile() {
    }
}
