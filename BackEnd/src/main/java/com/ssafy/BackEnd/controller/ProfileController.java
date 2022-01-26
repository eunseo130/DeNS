package com.ssafy.BackEnd.controller;

import com.ssafy.BackEnd.dto.ImageDto;
import com.ssafy.BackEnd.entity.Image;
import com.ssafy.BackEnd.entity.Profile;
import com.ssafy.BackEnd.entity.Request.RequestModifyProfile1;
import com.ssafy.BackEnd.entity.Request.RequestModifyProfile2;
import com.ssafy.BackEnd.entity.Response;
import com.ssafy.BackEnd.entity.User;
import com.ssafy.BackEnd.repository.ProfileRepository;
import com.ssafy.BackEnd.repository.UserRepository;
import com.ssafy.BackEnd.service.ImageService;
import com.ssafy.BackEnd.service.ProfileService;
import com.ssafy.BackEnd.util.MD5Generator;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.models.Model;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;
import java.util.Optional;


@RestController
@Api(tags = "유저 프로필 컨트롤러 API")
@RequestMapping("/profile")
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ImageService imageService;

    @GetMapping("/{user_id}")
    @ApiOperation(value = "유저 프로필 조회")
    public Response findProfile(String email) {
        Response response = new Response();
        try {
            Optional<Profile> profile = profileService.findProfile(email);
            response.setResponse("success");
            response.setMessage("사용자의 프로필을 성공적으로 조회했습니다.");
            response.setData(null);
            return response;
        }
        catch (Exception e) {
            response.setResponse("error");
            response.setMessage("사용자의 프로필을 조회할 수 없습니다.");
            response.setData(null);
            return response;
        }
    }

    @PutMapping("/{user_id}")
    @ApiOperation(value = "유저 프로필 수정")
    public Response modifyProfile(RequestModifyProfile2 requestModifyProfile2) {
        Response response = new Response();
        try {
            List<User> findUsers = userRepository.findByEmail(requestModifyProfile2.getEmail());
            Profile findProfile = findUsers.get(0).getProfile();
            Profile newProfile = profileService.modifyProfile(findProfile, requestModifyProfile2);
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

    @PostMapping("/update/image")
    public String updateImage(String email, MultipartFile multipartFile) {
        imageService.update(email, multipartFile);
        return "redirect:/profile";
    }

    @DeleteMapping("/delete")
    public void deleteUser(String email) {
        profileService.deleteUser(email);
    }

}
