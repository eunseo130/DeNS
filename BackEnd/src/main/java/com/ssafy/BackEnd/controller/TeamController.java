package com.ssafy.BackEnd.controller;

import com.ssafy.BackEnd.dto.TeamDto;
import com.ssafy.BackEnd.entity.*;
import com.ssafy.BackEnd.exception.CustomException;
import com.ssafy.BackEnd.exception.ErrorCode;
import com.ssafy.BackEnd.repository.TeamRespository;
import com.ssafy.BackEnd.repository.UserRepository;
import com.ssafy.BackEnd.service.ProfileService;
import com.ssafy.BackEnd.service.TeamMemberService;
import com.ssafy.BackEnd.service.TeamService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import com.ssafy.BackEnd.service.TeamService;
import com.ssafy.BackEnd.repository.TeamRespository;
import org.springframework.http.ResponseEntity;
import java.util.List;
import com.ssafy.BackEnd.entity.Team;
import org.springframework.http.HttpStatus;


@RestController
@Api(tags = "팀 컨트롤러 API")
@RequestMapping("/team")
public class TeamController {
    @Autowired
    TeamService teamService;

    @Autowired
    TeamRespository teamRespository;

    @Autowired
    ProfileService profileService;

    @Autowired
    TeamMemberService teamMemberService;

    //@ExceptionHandler({NotFoundException.class, NullPointerException.class})
    @GetMapping
    @ApiOperation(value = "팀 목록 가져오기")
    public ResponseEntity<List<Team>> getAllTeams() {
        List<Team> teams = teamService.showTeamList();

        return new ResponseEntity<List<Team>>(teams, HttpStatus.OK);
    }

    //@ExceptionHandler({NotFoundException.class, NullPointerException.class})
    @PostMapping(value="/create/{profileId}")
    @ApiOperation(value = "팀 만들기")
    public ResponseEntity<Team> createTeam(@RequestBody TeamDto teamDto, @PathVariable Long profileId) throws NotFoundException {
        Team team = teamDto.createTeam();
        if (team == null) {
            System.out.println("error");
            throw new CustomException("Error", ErrorCode.INTERNER_SERVER_ERROR);
        }
        Team newTeam = teamService.createTeam(team);
        Profile findProfile = profileService.findById(profileId).get();
        TeamMember teamMember = teamMemberService.addTeamLeader(findProfile.getEmail(), newTeam);
        return new ResponseEntity<Team>(newTeam, HttpStatus.OK);

    }

    //@ExceptionHandler({NotFoundException.class, NullPointerException.class})
    @GetMapping("/{team_id}")
    @ApiOperation(value = "팀 조회")
    public ResponseEntity<Team> findTeam(@RequestParam Long team_id) throws NotFoundException {
        //Team team = teamDto.createTeam();
        return new ResponseEntity<Team>(teamService.findByTeam(team_id), HttpStatus.OK);
    }

    //@ExceptionHandler({NotFoundException.class, NullPointerException.class})
    @PutMapping("/{team_id}")
    @ApiOperation(value = "팀 수정") //팀 수정이 무엇에 대한 수정인가(name과 content에 대한 수정??)
    public ResponseEntity<Team> modifyTeam(@RequestBody TeamDto teamDto) {
        Team team = teamDto.createTeam();
        teamService.modifyTeam(team.getTeam_id(), team);

        return new ResponseEntity<Team>(team, HttpStatus.OK);
    }

    //@ExceptionHandler({NotFoundException.class, NullPointerException.class})
    @DeleteMapping("/{team_id}")
    @ApiOperation(value = "팀 삭제")
    public ResponseEntity<Void> deleteTeam(@PathVariable Long team_id) {

        teamService.deleteTeam(team_id);
        return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
    }

    // ------ team manage

    //@ExceptionHandler({NotFoundException.class, NullPointerException.class})
    @PutMapping("/profile/{team_id}")
    @ApiOperation(value = "팀 프로필 수정")
    public ResponseEntity<Team> modifyTeamProfile(@RequestBody TeamDto teamDto) {
        Team team = teamDto.createTeam();
        teamService.modifyTeamProfile(team.getTeam_id(), team);

        return new ResponseEntity<Team>(team, HttpStatus.OK);
    }

    //@ExceptionHandler({NotFoundException.class, NullPointerException.class})
    @GetMapping("/search") //팀 키워드도 검색 가능하게 해야함 !!!
    public ResponseEntity<List<Team>> searchTeam(@RequestParam String keyword) {
        List<Team> search_teams = teamService.showFindTeamList(keyword);

        return new ResponseEntity<List<Team>>(search_teams, HttpStatus.OK);

    }
}