package com.ssafy.BackEnd.controller;

////
import com.ssafy.BackEnd.entity.Profile;
import com.ssafy.BackEnd.entity.ProfileKeyword;
import com.ssafy.BackEnd.entity.Request.RequestModifyProfile2;
import com.ssafy.BackEnd.entity.Response;
import com.ssafy.BackEnd.entity.TeamKeyword;
import com.ssafy.BackEnd.exception.CustomException;
import com.ssafy.BackEnd.exception.ErrorCode;
import com.ssafy.BackEnd.repository.ProfileKeywordRepository;
import com.ssafy.BackEnd.repository.UserRepository;
import com.ssafy.BackEnd.service.HashTagAlgorithm;
import com.ssafy.BackEnd.service.ImageService;
import com.ssafy.BackEnd.service.ProfileService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import javassist.NotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;


@RestController
@Api(tags = "유저 프로필 컨트롤러 API")
@RequestMapping("/profile")
@Slf4j
public class ProfileController {
    private static final Logger logger = LogManager.getLogger(ProfileController.class);

    @Autowired
    private ProfileService profileService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ImageService imageService;



    @Autowired
    private ProfileKeywordRepository profileKeywordRepository;

    private HashTagAlgorithm hashTagAlgorithm = new HashTagAlgorithm();


    @GetMapping("/{profile_id}")
    @ApiOperation(value = "유저 프로필 조회")
    public ResponseEntity<Profile> findProfile(@PathVariable Long profile_id) {
        Response response = new Response();
        try {
            Optional<Profile> profile = profileService.findById(profile_id);
            if (profile != null) {
                System.out.println("profile : "+profile.get().getEmail());
                logger.info("INFO SUCCESS");
                return new ResponseEntity<Profile>(profile.get(), HttpStatus.OK);
            }
            else {
                throw new CustomException(ErrorCode.NO_DATA_ERROR);
                //return new ResponseEntity<Profile>((Profile) null, HttpStatus.NOT_FOUND);
            }

        } catch (Exception e) {
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
            log.info("수정완료");
            logger.info("INFO SUCCESS");
            return new ResponseEntity<Profile>(newProfile, HttpStatus.OK);
        } catch (Exception e) {
            log.info(e.toString());
            throw new CustomException(ErrorCode.NO_DATA_ERROR);
            //return new ResponseEntity<Profile>((Profile) null, HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping(value = "/update/image/{profile_id}", consumes = { MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE } )
    public ResponseEntity<String> updateImage(@PathVariable Long profile_id, @RequestPart(value="file", required = true) MultipartFile file) throws NotFoundException {
        String imagePath = imageService.update(profile_id, file);
        if (imagePath == null) {
            logger.info("NO IMAGE PATH");
            //throw new CustomException(ErrorCode.NO_DATA_ERROR);
        }
        logger.info("INFO SUCCESS");

        return new ResponseEntity<String>(imagePath, HttpStatus.OK);
    }

    @DeleteMapping("/{profile_id}")
    public void deleteUser(@PathVariable Long profile_id) throws NotFoundException {
        Optional<Profile> findProfile = profileService.findById(profile_id);
        if (findProfile == null) {
            throw new CustomException(ErrorCode.NO_DATA_ERROR);
        }
        profileService.deleteUser(profile_id);
        logger.info("INFO SUCCESS");
    }

    @PostMapping("/keyword/{profile_id}")
    public ResponseEntity<List<ProfileKeyword>> addKeyword(@PathVariable Long profile_id, @RequestParam String content) throws NotFoundException {
        Profile profile = profileService.findById(profile_id).get();
        if (profile == null) {
            throw new CustomException("no profile", ErrorCode.NO_DATA_ERROR);
        }

        List<String> keywords = hashTagAlgorithm.strList(content);
        List<ProfileKeyword> profileKeywords = profile.getProfile_keyword();
        for (String keyword : keywords) {
            if (profileKeywordRepository.findProfileKeyword(keyword, profile_id) == null) {
                ProfileKeyword newProfileKeyword = new ProfileKeyword();
                newProfileKeyword.setName(keyword);
                newProfileKeyword.setCount(1);
                newProfileKeyword.setProfile(profile);
                profileKeywordRepository.save(newProfileKeyword);
                profileKeywords.add(newProfileKeyword);
            } else {
                ProfileKeyword profileKeyword = profileKeywordRepository.findProfileKeyword(keyword, profile_id);
                profileKeyword.setCount(profileKeyword.getCount()+1);
                profileKeywordRepository.save(profileKeyword);
            }
        }
        profile.setProfile_keyword(profileKeywords);
        logger.info("INFO SUCCESS");
        return new ResponseEntity<List<ProfileKeyword>>(profileKeywords, HttpStatus.OK);

    }

    @GetMapping("/keyword/{profile_id}")
    public List<ProfileKeyword> getKeywords(@PathVariable Long profile_id) throws NotFoundException {
        Profile profile = profileService.findById(profile_id).get();
        if (profile == null) {
            throw new CustomException("no profile", ErrorCode.NO_DATA_ERROR);
        }

        List<ProfileKeyword> profileKeywords = profileService.getProfileKeywords(profile_id);
        List<TeamKeyword> teamKeywords = profileService.getTeamKeywords(profile_id);
        List<ProfileKeyword> finalKeywords = new ArrayList<>();

        for (ProfileKeyword profileKeyword: profileKeywords) {
            finalKeywords.add(profileKeyword);
        }

        List<TeamKeyword> deleteKeywords = new ArrayList<>();

        for (TeamKeyword teamKeyword : teamKeywords) {
            for (ProfileKeyword profileKeyword : finalKeywords) {
                if (teamKeyword.getName().equals(profileKeyword.getName())){
                    profileKeyword.setCount(profileKeyword.getCount()+ teamKeyword.getCount());
                    deleteKeywords.add(teamKeyword);
                }
            }
        }

        for (TeamKeyword deleteKeyword : deleteKeywords) {
            teamKeywords.remove(deleteKeyword);
        }

        for (TeamKeyword keyword : teamKeywords) {
            ProfileKeyword newProfileKeyword = new ProfileKeyword();
            newProfileKeyword.setProfile(profile);
            newProfileKeyword.setCount(keyword.getCount());
            newProfileKeyword.setName(keyword.getName());
            finalKeywords.add(newProfileKeyword);
        }

        System.out.println("==============");
        for (ProfileKeyword profileKeyword : finalKeywords) {
            System.out.println(profileKeyword.getName());
            System.out.println(profileKeyword.getCount());
        }

        logger.info("INFO SUCCESS");
        return finalKeywords;
    }
}
