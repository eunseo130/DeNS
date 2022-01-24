package com.ssafy.BackEnd.controller;

import com.ssafy.BackEnd.entity.Request.RequestChangePassword1;
import com.ssafy.BackEnd.entity.Request.RequestChangePassword2;
import com.ssafy.BackEnd.entity.Request.RequestVerifyEmail;
import com.ssafy.BackEnd.entity.Response;
import com.ssafy.BackEnd.entity.User;

import com.ssafy.BackEnd.service.AuthService;
//import com.ssafy.TeamZOI.service.UserService;
import com.ssafy.BackEnd.service.JwtServiceImpl;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/user")
@Api(tags = {"유저 컨트롤러 API"})
@RequiredArgsConstructor // final
public class UserController {

    private final JwtServiceImpl jwtService;
    private final AuthService authService;

    @GetMapping()
    @ApiOperation(value = "사용자 조회")
    public void findUser() {


    }

    @DeleteMapping()
    @ApiOperation(value = "사용자 삭제(회원 탈퇴)")
    public void deleteUser() {

    }

}
