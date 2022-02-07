package com.ssafy.BackEnd.controller;

////
import com.ssafy.BackEnd.entity.Keyword;
import com.ssafy.BackEnd.entity.Profile;
import com.ssafy.BackEnd.entity.ProfileKeyword;
import com.ssafy.BackEnd.entity.Request.RequestModifyProfile2;
import com.ssafy.BackEnd.entity.Response;
import com.ssafy.BackEnd.repository.KeywordRepository;
import com.ssafy.BackEnd.repository.ProfileKeywordRepository;
import com.ssafy.BackEnd.repository.UserRepository;
import com.ssafy.BackEnd.service.HashTagAlgorithm;
import com.ssafy.BackEnd.service.ImageService;
import com.ssafy.BackEnd.service.ProfileService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import javassist.NotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;


@RestController
@Api(tags = "유저 프로필 컨트롤러 API")
@RequestMapping("/profile")
@Slf4j
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ImageService imageService;

    @Autowired
    private KeywordRepository keywordRepository;

    @Autowired
    private ProfileKeywordRepository profileKeywordRepository;


    @GetMapping("/{profile_id}")
    @ApiOperation(value = "유저 프로필 조회")
    public ResponseEntity<Profile> findProfile(@PathVariable Long profile_id) {
        Response response = new Response();
        try {
            Optional<Profile> profile = profileService.findById(profile_id);
            if (profile != null) {
                System.out.println(profile.get().getEmail());
                return new ResponseEntity<Profile>(profile.get(), HttpStatus.OK);
            }
//            response.setResponse("success");
//            response.setMessage("사용자의 프로필을 성공적으로 조회했습니다.");
//            response.setData(null);
            else {
                return new ResponseEntity<Profile>((Profile) null, HttpStatus.NOT_FOUND);
            }

        } catch (Exception e) {
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
            log.info("수정완료");
            return new ResponseEntity<Profile>(newProfile, HttpStatus.OK);
        } catch (Exception e) {
//            response.setResponse("error");
//            response.setMessage("사용자의 프로필을 조회할 수 없습니다.");
//            response.setData(null);
            log.info(e.toString());
            return new ResponseEntity<Profile>((Profile) null, HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/update/image/{profile_id}")
    public ResponseEntity<String> updateImage(@PathVariable Long profile_id, MultipartFile multipartFile) throws NotFoundException {
        String imagePath = imageService.update(profile_id, multipartFile);
        return new ResponseEntity<String>(imagePath, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{profile_id}")
    public void deleteUser(@PathVariable Long profile_id) throws NotFoundException {

        Optional<Profile> findProfile = profileService.findById(profile_id);
        profileService.deleteUser(profile_id);
    }

    @PostMapping("/keyword/{profile_id}")
    public ResponseEntity<List<Keyword>> addKeyword(@PathVariable Long profile_id, @RequestParam String content) throws NotFoundException {
        Profile profile = profileService.findById(profile_id).get();
        List<String> keywords = profileService.addKeyword(profile, content);
        List<Keyword> keywordList = new ArrayList<>();
        for (String keyword : keywords) {
            if (keywordRepository.findByName(keyword) == null) {
                Keyword newKeyword = new Keyword();
                newKeyword.setName(keyword);
                newKeyword.setCount(1);
                keywordList.add(newKeyword);
                ProfileKeyword newProfileKeyword = new ProfileKeyword();
                newProfileKeyword.setKeyword(newKeyword);
                newProfileKeyword.setProfile(profile);
                profileKeywordRepository.save(newProfileKeyword);
            } else {
                Keyword findKeyword = keywordRepository.findByName(keyword);
                findKeyword.setCount(findKeyword.getCount() + 1);
                keywordRepository.save(findKeyword);
                keywordList.add(findKeyword);
                if (profileKeywordRepository.findByKeywordId(findKeyword.getKeyword_id()) == null) {
                    ProfileKeyword newProfileKeyword = new ProfileKeyword();
                    newProfileKeyword.setKeyword(findKeyword);
                    newProfileKeyword.setProfile(profile);
                    profileKeywordRepository.save(newProfileKeyword);
                }
            }
        }
        return new ResponseEntity<List<Keyword>>(keywordList, HttpStatus.OK);

    }
}
