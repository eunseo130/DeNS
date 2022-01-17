package com.ssafy.TeamZOI.service;

import com.ssafy.TeamZOI.entity.User;
import com.ssafy.TeamZOI.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private UserRepository userRepository;

    public String SignUp(User user){

        userRepository.save(user);
        return user.getEmail();
    }


}
