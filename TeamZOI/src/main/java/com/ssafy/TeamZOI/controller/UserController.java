package com.ssafy.TeamZOI.controller;

import com.ssafy.TeamZOI.entity.User;
import com.ssafy.TeamZOI.repository.UserRepository;
import com.ssafy.TeamZOI.service.UserService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
@RequiredArgsConstructor
public class UserController {

    private UserRepository userRepository;
    private UserService userService;

    @PostMapping("/signup")
    public CreateMemberResponse SignUp(@RequestBody User user) {
        String email = userService.signup(user);
        return new CreateMemberResponse(email);
    }

    @Data
    static class CreateMemberResponse {
        private String email;

        public CreateMemberResponse(String email) {
            this.email = email;
        }
    }
}
