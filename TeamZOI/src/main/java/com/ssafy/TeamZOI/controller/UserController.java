package com.ssafy.TeamZOI.controller;

<<<<<<< HEAD
import com.ssafy.TeamZOI.entity.User;
import com.ssafy.TeamZOI.repository.UserRepository;
import com.ssafy.TeamZOI.service.UserService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
=======
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
>>>>>>> 0e2024f4069e4502fe1c749e42ede855c418576a

@Controller
@RequiredArgsConstructor
public class UserController {

<<<<<<< HEAD
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
=======
    @GetMapping("/")
    public void Home() {

>>>>>>> 0e2024f4069e4502fe1c749e42ede855c418576a
    }
}
