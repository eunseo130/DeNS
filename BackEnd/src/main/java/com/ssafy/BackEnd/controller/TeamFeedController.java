package com.ssafy.BackEnd.controller;

import com.ssafy.BackEnd.dto.UserFeedDto;
import com.ssafy.BackEnd.entity.Team;
import com.ssafy.BackEnd.entity.TeamFeed;
import com.ssafy.BackEnd.entity.UserFeed;
import com.ssafy.BackEnd.repository.TeamFeedRepository;
import com.ssafy.BackEnd.service.TeamFeedService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequiredArgsConstructor
@RequestMapping("/teamfeed")
@Slf4j
public class TeamFeedController {

    private final TeamFeedRepository teamFeedRepository;
    private final TeamFeedService teamFeedService;

    @PostMapping
    @ApiOperation(value = "팀 피드 생성")
    public ResponseEntity<String> createTeamFeed(@RequestBody TeamFeed teamFeed) {
        String message = "";
        HttpStatus status;

        try{
            TeamFeed feed = teamFeedService.createTeamFeed(teamFeed);
            if(feed != null){
                message = "success";
                status = HttpStatus.ACCEPTED;
            } else {
                message = "fail";
                status = HttpStatus.ACCEPTED;
            }
        } catch (Exception e) {
            message = e.getMessage();
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<String>(message, status);
    }

    @ApiOperation(value = "팀 피드 조회")
    @GetMapping
    public ResponseEntity<List<TeamFeed>> findAllTeamFeed() {
        List<TeamFeed> teamfeeds = teamFeedService.showFindTeamFeedList();

        return new ResponseEntity<List<TeamFeed>>(teamfeeds, HttpStatus.OK);
    }

    @PutMapping("/teamfeed_id")
    @ApiOperation(value = "팀 피드 수정")
    public ResponseEntity<TeamFeed> modifyUserFeed(@RequestBody TeamFeed teamFeed) {
        teamFeedService.modifyTeamFeed(teamFeed.getTeamfeed_id(), teamFeed);

        return new ResponseEntity<TeamFeed>(teamFeed, HttpStatus.OK);
    }

    @DeleteMapping("/teamfeed_id")
    @ApiOperation(value = "팀 피드 삭제")
    public ResponseEntity<Void>deleteUserFeed(@RequestBody TeamFeed teamFeed) {
        teamFeedService.deleteTeamFeed(teamFeed.getTeamfeed_id());

        return new ResponseEntity<Void>(HttpStatus.OK);
    }

}
