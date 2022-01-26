package com.ssafy.BackEnd.service;


import com.ssafy.BackEnd.entity.Profile;
import com.ssafy.BackEnd.entity.Request.RequestModifyProfile1;
import com.ssafy.BackEnd.entity.Request.RequestModifyProfile2;
import com.ssafy.BackEnd.entity.User;
import com.ssafy.BackEnd.repository.ProfileRepository;
import com.ssafy.BackEnd.repository.UserRepository;
import javassist.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProfileServiceImpl implements ProfileService{

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProfileRepository profileRepository;

    @Autowired
    private SaltUtil saltUtil;

    @Override
    public Optional<Profile> findProfile(RequestModifyProfile1 requestModifyProfile1) throws NotFoundException{
        List<User> findUsers = userRepository.findByEmail(requestModifyProfile1.getEmail());
        if (findUsers.isEmpty()) throw new NotFoundException("회원이 조회되지 않습니다.");
        User findUser = findUsers.get(0);
        String hashedPassword = findUser.getPassword();
        SaltUtil.checkPassword(hashedPassword, requestModifyProfile1.getPassword());
        Optional<Profile> findProfile = profileRepository.findByName(findUser.getName());
        return findProfile;
    }


    @Override
    public Profile modifyProfile(Profile findProfile, RequestModifyProfile2 requestModifyProfile2) throws NotFoundException {

        User user = userRepository.findByName(findProfile.getName());
        findProfile.setName(requestModifyProfile2.getName());
        user.setName(requestModifyProfile2.getName());
        user.setEmail(requestModifyProfile2.getEmail());
        findProfile.setJob(requestModifyProfile2.getJob());
        findProfile.setStack(requestModifyProfile2.getStack());

        profileRepository.save(findProfile);

        return findProfile;
    }

    @Override
    public List<Profile> showFindUserList(String keyword){
        List<Profile> profiles = profileRepository.findByNameContaining(keyword);
        if(profiles == null) System.out.println("에러염");
        return profiles;
    }

}
