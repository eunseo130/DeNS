package com.ssafy.BackEnd.controller;

import com.ssafy.BackEnd.entity.Profile;
import com.ssafy.BackEnd.entity.Response;
import com.ssafy.BackEnd.entity.User;
import com.ssafy.BackEnd.service.ProfileService;
import com.ssafy.BackEnd.service.ProfileServiceImpl;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@RestController
@Api(tags = "유저 프로필 컨트롤러 API")
@RequestMapping("/profile")
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    @PostMapping
    @ApiOperation(value = "유저 프로필 생성")
    public void createProfile(Profile profile) {
        profileService.createProfile(profile);
    }

    @GetMapping
    @ApiOperation(value = "유저 프로필 조회")
    public Response findProfile(User user) {
        Response response = new Response();
        try {
            Profile findProfile = profileService.findProfile(user);
            response.setResponse("success");
            response.setMessage("사용자의 프로필을 성공적으로 조회했습니다.");
            response.setData(null);
        }
        catch (Exception e) {
            response.setResponse("error");
            response.setMessage("사용자의 프로필을 조회할 수 없습니다.");
            response.setData(null);
        }
        return response;
    }

    @PutMapping
    @ApiOperation(value = "유저 프로필 수정")
    public Response modifyProfile(User user, Profile newProfile) {
        Response response = new Response();
        try {
            Profile findProfile = profileService.findProfile(user);
            profileService.modifyProfile(findProfile, newProfile);
            response.setResponse("success");
            response.setMessage("사용자의 프로필을 성공적으로 수정했습니다.");
            response.setData(null);
        }
        catch (Exception e) {
            response.setResponse("error");
            response.setMessage("사용자의 프로필을 조회할 수 없습니다.");
            response.setData(null);
        }
        return response;
    }

}
