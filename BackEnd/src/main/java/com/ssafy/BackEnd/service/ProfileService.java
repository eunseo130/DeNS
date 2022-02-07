package com.ssafy.BackEnd.service;


import com.ssafy.BackEnd.entity.Profile;
import com.ssafy.BackEnd.entity.Request.RequestModifyProfile1;
import com.ssafy.BackEnd.entity.Request.RequestModifyProfile2;
import com.ssafy.BackEnd.entity.User;
import javassist.NotFoundException;
import org.apache.coyote.Request;
import org.springframework.web.client.HttpClientErrorException;

import java.util.List;
import java.util.Optional;

public interface ProfileService {

    Optional<Profile> findProfile(Long user_id) throws NotFoundException;

    Profile modifyProfile(Profile findProfile, RequestModifyProfile2 requestModifyProfile2) throws NotFoundException;

    List<Profile> showFindUserList(String keyword);

    Optional<Profile> findById(Long profile_id) throws NotFoundException;

    void deleteUser(Long profile_id);

    List<Profile> showFindTeamList(String keyword);

    List<Profile> findUserByKeyword(String keyword);

    User findUserById(Long profile_id);

    List<String> addKeyword(Profile profile, String content);


}
