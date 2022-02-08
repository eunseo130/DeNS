package com.ssafy.BackEnd.service;


import com.ssafy.BackEnd.entity.Profile;
import com.ssafy.BackEnd.entity.Request.RequestModifyProfile1;
import com.ssafy.BackEnd.entity.Request.RequestModifyProfile2;
import com.ssafy.BackEnd.entity.User;
import com.ssafy.BackEnd.repository.ProfileRepository;
import com.ssafy.BackEnd.repository.UserRepository;
import javassist.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.aspectj.weaver.ast.Not;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;

import javax.swing.text.html.Option;
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
    public Optional<Profile> findProfile(Long user_id) throws NotFoundException{
        User findUser = userRepository.findById(user_id).get();
        if (findUser == null) throw new NotFoundException("회원이 조회되지 않습니다.");
        Optional<Profile> findProfile = profileRepository.findByName(findUser.getName());
        return findProfile;
    }

    @Override
    public Optional<Profile> findById(Long profile_id) throws NotFoundException {
        Optional<Profile> findProfile = profileRepository.findById(profile_id);
        if (findProfile == null) throw new NotFoundException("회원이 조회되지 않습니다.");
        return findProfile;
    }

<<<<<<< HEAD
    @Override
    public User findUserById(Long profile_id) {
        Profile profile = profileRepository.findById(profile_id).get();
        User user = userRepository.findByEmail(profile.getEmail());
        return user;
    }

    @Override
=======
>>>>>>> 81c03c13c7088d0b9919f0354c5bff75eca153a7
    public List<Profile> showFindTeamList(String keyword){
        List<Profile> profiles = profileRepository.findByNameContaining(keyword);
        if(profiles == null) System.out.println("에러염");
        return profiles;
    }

    // 이름, 이메일 수정 x, user 번호로 조회하기
    @Override
    public Profile modifyProfile(Profile findProfile, RequestModifyProfile2 requestModifyProfile2) throws NotFoundException {

        User user = userRepository.findByName(findProfile.getName());
        findProfile.setPosition(requestModifyProfile2.getPosition());
        findProfile.setStack(requestModifyProfile2.getStack());

        profileRepository.save(findProfile);
        userRepository.save(user);

        return findProfile;
    }

    @Override
    public List<Profile> showFindUserList(String keyword){
        List<Profile> profiles = profileRepository.findByNameContaining(keyword);
        if(profiles == null) System.out.println("에러염");
        return profiles;
    }

<<<<<<< HEAD
    @Override
    public void deleteUser(Long profile_id) {
        Profile findProfile = profileRepository.findById(profile_id).get();
        User user = userRepository.findByEmail(findProfile.getEmail());
        userRepository.delete(user);
        profileRepository.delete(findProfile);
    }

=======
>>>>>>> 81c03c13c7088d0b9919f0354c5bff75eca153a7
}
