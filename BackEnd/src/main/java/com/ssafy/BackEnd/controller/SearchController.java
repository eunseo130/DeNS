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
    public ResponseEntity<List<Profile>> findSearchedUsers(String keyword) throws NotFoundException{
        HttpStatus status;
        List<Profile> userList = profileService.showFindUserList(keyword);
        System.out.println("전달 받은 값 : "+keyword);
        if(userList != null) {
            status = HttpStatus.OK;
            System.out.println("success\n"+userList.get(0).getName());

        } else {
            status = HttpStatus.NO_CONTENT;
            System.out.println("노데이터");
            throw new CustomException("Error", ErrorCode.INTERNER_SERVER_ERROR);
        }

        return new ResponseEntity<>(userList, status);
    }

    @GetMapping("/user/{profile_id}")
    public ResponseEntity<Profile> findSearchOneProfile(@PathVariable Long profile_id) throws NotFoundException {
        Profile profile = profileService.findById(profile_id).get();
        if(profile == null)
        {
            System.out.println("error");
            throw new CustomException("error", ErrorCode.INTERNER_SERVER_ERROR);

        }
        return new ResponseEntity<>(profile, HttpStatus.OK);
    }

    @GetMapping("/team/{team_id}")
    public ResponseEntity<Team> findSearchOneTeam(@PathVariable Long team_id) throws NotFoundException {
        Team team = teamService.findByTeam(team_id);
        if(team == null){
            System.out.println("team error");
            throw new CustomException("Error", ErrorCode.INTERNER_SERVER_ERROR);
        }

        return new ResponseEntity<>(team, HttpStatus.OK);
    }

    @GetMapping("/team")
    public ResponseEntity<List<Team>> findSearchedTeams(@RequestParam String keyword) throws NotFoundException{
        HttpStatus status;
        List<Team> teamList = teamService.showFindTeamList(keyword);
        System.out.println("keyword : "+keyword);
        if(teamList != null) {
            status = HttpStatus.OK;
            System.out.println("success\n"+teamList.get(0).getTeam_id());

        } else {
            status = HttpStatus.NO_CONTENT;
            System.out.println("fail");
            throw new CustomException("error", ErrorCode.INTERNER_SERVER_ERROR);
        }

        return new ResponseEntity<>(teamList, status);
    }

    @GetMapping("/keyword/user")
    public ResponseEntity<List<Profile>> findSearchedUserByKeyword(@RequestParam String keyword) {
        List<Profile> searchedUsers = profileService.findUserByKeyword(keyword);
        if (searchedUsers.isEmpty()) {
            System.out.println("유저없음");
            return new ResponseEntity<List<Profile>>((List<Profile>) null, HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<List<Profile>>(searchedUsers, HttpStatus.OK);
    }

    @GetMapping("/keyword/team")
    public ResponseEntity<List<Team>> findSearchedTeamByKeyword(@RequestParam String keyword) {
        List<Team> searchedTeams = teamService.findTeamByKeyword(keyword);
        if (searchedTeams == null) {
            return new ResponseEntity<List<Team>>((List<Team>) null, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<List<Team>>(searchedTeams, HttpStatus.OK);
    }
}
