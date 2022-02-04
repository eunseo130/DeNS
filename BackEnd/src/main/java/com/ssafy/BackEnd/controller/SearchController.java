package com.ssafy.BackEnd.controller;

import com.ssafy.BackEnd.entity.Profile;
import com.ssafy.BackEnd.entity.Team;
import com.ssafy.BackEnd.entity.User;
import com.ssafy.BackEnd.exception.CustomException;
import com.ssafy.BackEnd.exception.ErrorCode;
import com.ssafy.BackEnd.service.ProfileService;
import com.ssafy.BackEnd.service.TeamService;
import com.ssafy.BackEnd.service.UserService;
import javassist.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/search")
@RequiredArgsConstructor
public class SearchController {
    private final ProfileService profileService;
    private final TeamService teamService;

    @GetMapping("/user")
    public ResponseEntity<List<Profile>> findSearchedUsers(String keyword){
        HttpStatus status;
        List<Profile> userList = profileService.showFindTeamList(keyword);
        System.out.println("전달 받은 값 : "+keyword);
        if(userList != null) {
            status = HttpStatus.OK;
            System.out.println("success\n"+userList.get(0).getName());

        } else {
            status = HttpStatus.NO_CONTENT;
            System.out.println("노데이터");
        }

        return new ResponseEntity<>(userList, status);
    }

    @GetMapping("/user/{team_id}")
    public ResponseEntity<Team> findSearchOneTeam(@PathVariable Long team_id) throws NotFoundException {
        Team team = teamService.findByTeam(team_id);
        if(team == null){
            System.out.println("team error");
            throw new CustomException("Error", ErrorCode.INTERNER_SERVER_ERROR);
        }

        return new ResponseEntity<>(team, HttpStatus.OK);
    }

    @GetMapping("/team")
    public ResponseEntity<List<Team>> findSearchedTeams(String keyword){
        HttpStatus status;
        List<Team> teamList = teamService.showFindTeamList(keyword);
        System.out.println("keyword : "+keyword);
        if(teamList != null) {
            status = HttpStatus.OK;
            System.out.println("success\n"+teamList.get(0).getTeam_id());

        } else {
            status = HttpStatus.NO_CONTENT;
            System.out.println("fail");
        }

        return new ResponseEntity<>(teamList, status);
    }
}
