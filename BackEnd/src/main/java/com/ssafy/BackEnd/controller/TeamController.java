package com.ssafy.BackEnd.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

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
    @GetMapping
    public ResponseEntity<List<Team>> getAllTeams() {
        List<Team> teams = teamService.showTeamList();
        System.out.print("hello");
        return new ResponseEntity<List<Team>>(teams, HttpStatus.OK);
    }
}
