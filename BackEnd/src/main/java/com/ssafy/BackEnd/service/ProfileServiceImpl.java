package com.ssafy.BackEnd.service;

import com.ssafy.BackEnd.entity.Profile;
import com.ssafy.BackEnd.entity.User;
import com.ssafy.BackEnd.repository.ProfileRepository;
import com.ssafy.BackEnd.repository.UserRepository;
import javassist.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.aspectj.weaver.ast.Not;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
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

    @Override
    public Profile findProfile(User user) throws NotFoundException{
        User findUser = userRepository.findByName(user.getName());
        if(findUser==null) throw new NotFoundException("회원이 조회되지 않습니다.");
        Profile findProfile = findUser.getProfile();
        return findProfile;
    }

    @Override
    public void createProfile(Profile profile) {
        User findUser = userRepository.findByProfileId(profile.getId());
        profile.setName(findUser.getName());
        profileRepository.save(profile);
    }

    @Override
    public Profile modifyProfile(Profile findProfile, Profile profile) throws NotFoundException {

        User user = userRepository.findByName(findProfile.getName());
        findProfile.setName(profile.getName());
        user.setName(profile.getName());
        findProfile.setJob(profile.getJob());
        findProfile.setStack(profile.getStack());

        profileRepository.save(findProfile);

        return findProfile;
    }
}
