package com.ssafy.TeamZOI.service;

import com.ssafy.TeamZOI.entity.User;
import com.ssafy.TeamZOI.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@Transactional
public class MemberServiceTest {

    @Autowired
    UserService userService;
    @Autowired
    UserRepository userRepository;

    @Test
    public void 회원가입() throws Exception {
        // given
        User user = new User();
        user.setEmail("ssafy@naver.com");

        // when
        String savedEmail = userService.signup(user);

        // then
        assertEquals(user, userRepository.findByEmail(savedEmail));

    }
}
