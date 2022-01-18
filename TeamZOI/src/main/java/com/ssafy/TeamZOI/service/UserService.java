package com.ssafy.TeamZOI.service;

import com.ssafy.TeamZOI.entity.User;
import com.ssafy.TeamZOI.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private UserRepository userRepository;

    public String signup(User user){
        validateDuplicationUser(user);
        userRepository.save(user);
        return user.getEmail();
    }

    private void validateDuplicationUser(User user) {
        List<User> findUsers = userRepository.findByEmail(user.getEmail());
        if (!findUsers.isEmpty()) {
            throw new IllegalStateException("이미 존재하는 회원입니다.");
        }
    }
}
