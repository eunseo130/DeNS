package com.ssafy.BackEnd.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/team")
public class TeamController {

    @PostMapping("/")
    public void createTeam(){

    }

    @GetMapping("/{team_id}")
    public void findTeam() {

    }


    @PutMapping("/{team_id}")
    public void modifyTeam() {

    }

    @DeleteMapping("/{team_id}")
    public void deleteTeam(){

    }

    // ------ team manage

    @PostMapping("/profile")
    public void createTeamProfile(){

    }

    @GetMapping("/profile/{team_id}")
    public void findTeamProfile() {

    }


    @PutMapping("/profile/{team_id}")
    public void modifyTeamProfile() {

    }

    @DeleteMapping("/profile/{team_id}")
    public void deleteTeamProfile(){

    }
}
