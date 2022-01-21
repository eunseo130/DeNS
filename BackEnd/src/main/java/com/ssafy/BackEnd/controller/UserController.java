package com.ssafy.BackEnd.controller;

import com.ssafy.BackEnd.entity.Request.RequestChangePassword1;
import com.ssafy.BackEnd.entity.Request.RequestChangePassword2;
import com.ssafy.BackEnd.entity.Request.RequestVerifyEmail;
import com.ssafy.BackEnd.entity.Response;
import com.ssafy.BackEnd.entity.User;

import com.ssafy.BackEnd.service.AuthService;
//import com.ssafy.TeamZOI.service.UserService;
import com.ssafy.BackEnd.service.JwtServiceImpl;
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
@RequiredArgsConstructor // final
public class UserController {

//    private final UserService userService;
    private final JwtServiceImpl jwtService;
    private final AuthService authService;

    /*
    *
    *
    *
    * */


//    @GetMapping("/#")
//    public void Home() {
//
//    }
//
//    @GetMapping("/join")
//    public void join(){
//
//    }




    @PostMapping("/signup")
    public Response signUp(User user) {
        Response response = new Response();
        System.out.println("up : "+user.getEmail());
        try {
            authService.signUp(user);
            response.setResponse("success");
            response.setMessage("회원가입을 성공적으로 완료했습니다.");
            response.setData(null);
        }
        catch(Exception e) {
            response.setResponse("failed");
            response.setMessage("회원가입을 하는 도중 오류가 발생했습니다.");
            response.setData(e.toString());
        }
        return response;
    }

    @GetMapping()
    public void findUser() {


    }

    @DeleteMapping()
    public void deleteUser() {

    }



    @GetMapping("/password/{key}")
    public Response isPasswordUUIDValidate(@PathVariable String key) {
        Response response = new Response();
        try {
            if (authService.isPasswordUuidValidate(key)) {
                response.setResponse("success");
                response.setMessage("정상적인 접근입니다.");
                response.setData(null);
            }
            else {
                response.setResponse("error");
                response.setMessage("유효하지 않은 key값입니다.");
                response.setData(null);
            }
        } catch (Exception e) {
            response.setResponse("error");
            response.setMessage("유효하지 않은 key값입니다.");
            response.setData(null);
        }
        return response;
    }

    @PostMapping("/password")
    public Response requestChangePassword(RequestChangePassword1 requestChangePassword1) {
        Response response = new Response();
        try {
            User user = authService.findByEmail(requestChangePassword1.getEmail());
            if (!user.getEmail().equals(requestChangePassword1.getEmail())) throw new NoSuchFieldException("");
            authService.requestChangePassword(user);
            response.setResponse("success");
            response.setMessage("성공적으로 사용자의 비밀번호를 변경요청을 수행했습니다.");
            response.setData(null);
        } catch (NoSuchFieldException e) {
            response.setResponse("error");
            response.setMessage("사용자의 정보를 조회할 수 없습니다.");
            response.setData(null);
        } catch (Exception e) {
            response.setResponse("error");
            response.setMessage("비밀번호 변경 요청을 할 수 없습니다.");
            response.setData(null);
        }
        return response;
    }

    @PutMapping("/password")
    public Response changePassword(RequestChangePassword2 requestChangePassword2) {
        Response response = new Response();
        System.out.println("hi");
        System.out.println("hello");
        System.out.println("hihi");
        System.out.println("junu");

        HttpStatus status;
        try {
            User user = authService.findByEmail(requestChangePassword2.getEmail());
            authService.changePassword(user, requestChangePassword2.getPassword());
            response.setResponse("success");
            response.setMessage("사용자의 비밀번호를 성공적으로 변경했습니다.");
            response.setData(null);
        } catch (Exception e) {
            response.setResponse("error");
            response.setMessage("사용자의 비밀번호를 변경할 수 없습니다.");
            response.setData(null);
        }
        return response;
    }


    @GetMapping("/signin")
    public void signinPage() {
        System.out.println("sign in hi");
    }

    @PostMapping("/signin") // 스켈레톤이랑 연결할땐 signin 지우고 '/' 상태에서
    public ResponseEntity<Map<String, Object>> signin(User users,
                                                      HttpServletRequest request, HttpServletResponse response) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status;
        System.out.println(users.getEmail()+" "+users.getPassword());
        try {
            final User user = authService.signIn(users.getEmail(), users.getPassword());
            //System.out.println(user.getEmail()+" "+user.getPassword());
            //System.out.println("user null ? "+user);
            if(user != null) {
                //System.out.println("1pass");
                String token = jwtService.create("email", user.getEmail(), "access-token");
                System.out.println("tk : "+token);
                resultMap.put("access-token", token);
                resultMap.put("message", "success");
                status = HttpStatus.ACCEPTED;
            } else {
                //System.out.println("error");
                resultMap.put("message", "fail");
                status = HttpStatus.ACCEPTED;
            }
        } catch (Exception e) {
            resultMap.put("message", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }

    @PostMapping("/verify")
    public Response verify(RequestVerifyEmail requestVerifyEmail, HttpServletRequest req, HttpServletResponse res) {
        Response response = new Response();
        System.out.println("ve : "+requestVerifyEmail.getName());
        try {
            User user = authService.findByName(requestVerifyEmail.getName());
            System.out.println("u : "+user.getName());
            authService.sendVerificationMail(user);

            response.setResponse("success");
            response.setMessage("성공적으로 인증메일을 보냈습니다");
            response.setData(null);
        } catch (Exception exception) {
            //response = new Response("error", "인증메일을 보내는데 문제가 발생했습니다.", exception);
            response.setResponse("error");
            response.setMessage("인증메일을 보내는데 문제가 발생했습니다");
            response.setData(exception);
        }
        return response;
    }

    @GetMapping("/verify/{key}")
    public Response getVerify(@PathVariable String key) {
        Response response;
        try {
            authService.verifyEmail(key);
            response = new Response("success", "성공적으로 인증메일을 확인했습니다.", null);

        } catch (Exception e) {
            response = new Response("error", "인증메일을 확인하는데 실패했습니다.", null);
        }
        return response;
    }
}
