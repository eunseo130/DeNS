package com.ssafy.BackEnd.controller;

import com.ssafy.BackEnd.repository.UserFeedRepository;
import com.ssafy.BackEnd.repository.UserRepository;
import com.ssafy.BackEnd.service.UserFeedService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.ssafy.BackEnd.entity.UserFeed;

import java.util.List;

@RestController
@RequestMapping("/userfeed")
@RequiredArgsConstructor
public class UserFeedController {

    private final UserFeedRepository userFeedRepository;
    private final UserFeedService userFeedService;

    // Create
    @PostMapping
    @ApiOperation(value = "유저 피드 생성")
    public ResponseEntity<String> createUserFeed(@RequestBody UserFeed userFeed) {
        String message = "";
        HttpStatus status;

        try{
            UserFeed feed = userFeedService.createUserFeed(userFeed);
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

    // Read
    @ApiOperation(value = "유저 피드 조회")
    @GetMapping
    public ResponseEntity<List<UserFeed>> findAllUserFeed() {
        List<UserFeed> userfeeds = userFeedService.showFindUserFeedList();

        return new ResponseEntity<List<UserFeed>>(userfeeds, HttpStatus.OK);
    }

    // Update
    @PutMapping("/userfeed_id")
    @ApiOperation(value = "유저 피드 수정")
    public ResponseEntity<UserFeed> modifyUserFeed(@RequestBody UserFeed userFeed) {
        userFeedService.modifyUserFeed(userFeed.getUserfeed_id(), userFeed);

        return new ResponseEntity<UserFeed>(userFeed, HttpStatus.OK);
    }

    // Delete
    @DeleteMapping("/userfeed_id")
    @ApiOperation(value = "유저 피드 삭제")
    public ResponseEntity<Void>deleteUserFeed(@RequestBody UserFeed userFeed) {
        userFeedService.deleteUserFeed(userFeed.getUserfeed_id());

        return new ResponseEntity<Void>(HttpStatus.OK);
    }
}
