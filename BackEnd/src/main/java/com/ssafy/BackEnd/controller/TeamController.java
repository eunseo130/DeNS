package com.ssafy.BackEnd.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@Api(tags = "팀 컨트롤러 API")
@RequestMapping("/team")
public class TeamController {

    @PostMapping("/")
    @ApiOperation(value = "팀 만들기")
    public void createTeam(){

    }

    @GetMapping("/{team_id}")
    @ApiOperation(value = "팀 조회")
    public void findTeam() {

    }


    @PutMapping("/{team_id}")
    @ApiOperation(value = "팀 수정")
    public void modifyTeam() {

    }

    @DeleteMapping("/{team_id}")
    @ApiOperation(value = "팀 삭제")
    public void deleteTeam(){

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
