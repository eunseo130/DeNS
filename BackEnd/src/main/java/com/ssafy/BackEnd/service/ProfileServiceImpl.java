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
import org.springframework.web.bind.annotation.DeleteMapping;

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
    public Optional<Profile> findProfile(String email) throws NotFoundException{
        User findUser = userRepository.findByEmail(email).get(0);
        if (findUser == null) throw new NotFoundException("회원이 조회되지 않습니다.");
        Optional<Profile> findProfile = profileRepository.findByName(findUser.getName());
        return findProfile;
    }


    @Override
    public Profile modifyProfile(Profile findProfile, RequestModifyProfile2 requestModifyProfile2) throws NotFoundException {

        User user = userRepository.findByName(findProfile.getName());
        findProfile.setName(requestModifyProfile2.getName());
        user.setName(requestModifyProfile2.getName());
        user.setEmail(requestModifyProfile2.getEmail());
        findProfile.setEmail(requestModifyProfile2.getEmail());
        findProfile.setJob(requestModifyProfile2.getJob());
        findProfile.setStack(requestModifyProfile2.getStack());

        profileRepository.save(findProfile);
        userRepository.save(user);

        return findProfile;
    }

    @Override
    public void deleteUser(String email) {
        User user = userRepository.findByEmail(email).get(0);
        userRepository.delete(user);
    }
}
