package com.ssafy.BackEnd.controller;

////
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
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @GetMapping("/{profile_id}")
    @ApiOperation(value = "유저 프로필 조회")
    public ResponseEntity<Profile> findProfile(@PathVariable Long profile_id) {
        Response response = new Response();
        try {
            Optional<Profile> profile = profileService.findById(profile_id);
            if (profile != null) {
                return new ResponseEntity<Profile>(profile.get(),HttpStatus.OK);
            }
//            response.setResponse("success");
//            response.setMessage("사용자의 프로필을 성공적으로 조회했습니다.");
//            response.setData(null);
            else {
                return new ResponseEntity<Profile>((Profile) null, HttpStatus.NOT_FOUND);
            }

        }
        catch (Exception e) {
//            response.setResponse("error");
//            response.setMessage("사용자의 프로필을 조회할 수 없습니다.");
//            response.setData(null);
            return new ResponseEntity<Profile>((Profile) null, HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{profile_id}")
    @ApiOperation(value = "유저 프로필 수정")
    public ResponseEntity<Profile> modifyProfile(@PathVariable Long profile_id, @RequestBody RequestModifyProfile2 requestModifyProfile2) {
        Response response = new Response();
        try {

            Profile findProfile = profileService.findById(profile_id).get();
            Profile newProfile = profileService.modifyProfile(findProfile, requestModifyProfile2);
//            response.setResponse("success");
//            response.setMessage("사용자의 프로필을 성공적으로 수정했습니다.");
//            response.setData(null);
            return new ResponseEntity<Profile>(newProfile, HttpStatus.OK);
        }
        catch (Exception e) {
//            response.setResponse("error");
//            response.setMessage("사용자의 프로필을 조회할 수 없습니다.");
//            response.setData(null);
            return new ResponseEntity<Profile>((Profile) null, HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/update/image/{profile_id}")
    public ResponseEntity<String> updateImage(@PathVariable Long profile_id, MultipartFile multipartFile) throws NotFoundException {
        String imagePath = imageService.update(profile_id, multipartFile);
        return new ResponseEntity<String>(imagePath, HttpStatus.OK);
    }

    @DeleteMapping("/delete")
    public void deleteUser(String email) {

        profileService.deleteUser(email);
    }

}
