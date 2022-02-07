package com.ssafy.BackEnd.controller;

import com.ssafy.BackEnd.dto.TeamFeedDto;
import com.ssafy.BackEnd.dto.UserFeedDto;
import com.ssafy.BackEnd.entity.*;
import com.ssafy.BackEnd.repository.TeamFeedRepository;
import com.ssafy.BackEnd.service.FileStore;
import com.ssafy.BackEnd.service.TeamFeedService;
import com.ssafy.BackEnd.service.TeamService;
import io.swagger.annotations.ApiOperation;
import javassist.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.charset.StandardCharsets;
import java.util.List;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriUtils;


@RestController
@RequiredArgsConstructor
@RequestMapping("/teamfeed")
@Slf4j
public class TeamFeedController {

    private final TeamFeedRepository teamFeedRepository;
    private final TeamFeedService teamFeedService;
    private final TeamService teamService;
    private final FileStore fileStore;

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

    @PutMapping("/{teamfeed_id}")
    @ApiOperation(value = "팀 피드 수정")
    public ResponseEntity<TeamFeed> modifyUserFeed(@RequestBody TeamFeedDto teamFeedDto, @PathVariable Long teamfeed_id) {
        TeamFeed teamFeed = teamFeedDto.createTeamFeed();

        teamFeedService.modifyTeamFeed(teamfeed_id, teamFeed);

        return new ResponseEntity<TeamFeed>(teamFeed, HttpStatus.OK);
    }

    @DeleteMapping("/{teamfeed_id}")
    @ApiOperation(value = "팀 피드 삭제")
    public ResponseEntity<Void>deleteUserFeed(@PathVariable Long teamfeed_id) {
        teamFeedService.deleteTeamFeed(teamfeed_id);

        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @PostMapping("/post/{team_id}")
    public String post(@PathVariable Long team_id, @Validated @ModelAttribute TeamFeedAddForm teamFeedAddForm, BindingResult bindingResult) throws NotFoundException, IOException {
        if (bindingResult.hasErrors()) {
            log.info("bindingResult : {}", bindingResult.getFieldError());
            return "post";
        }
        Team team = teamService.findByTeam(team_id);
        System.out.println("팀제목" + team.getTitle());
        TeamFeedDto teamFeedDto = teamFeedAddForm.createTeamFeedDto(team);
        System.out.println("팀피드 내용" + teamFeedDto.getContent());
        TeamFeed post = teamFeedService.post(teamFeedDto);
        System.out.println("포스트내용" + post.getContent());

        return "redirect:/main/board" + post.getTeam();
    }

    @ResponseBody
    @GetMapping("/images/{filename}")
    public UrlResource processImg(@PathVariable String filename) throws MalformedURLException {
        return new UrlResource("file:" + fileStore.createPath(filename, FileType.IMAGE));
    }

    @GetMapping("/files/{filename}")
    public ResponseEntity<UrlResource> processFiles(@PathVariable String filename, @RequestParam String originName) throws MalformedURLException {
        UrlResource urlResource = new UrlResource("file:" + fileStore.createPath(filename, FileType.GENERAL));
        String encodedUploadFileName = UriUtils.encode(originName, StandardCharsets.UTF_8);
        String contentDisposition = "files; filename=\"" + encodedUploadFileName + "\"";

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, contentDisposition)
                .body(urlResource);
    }

}
