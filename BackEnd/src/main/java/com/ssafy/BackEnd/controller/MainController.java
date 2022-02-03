package com.ssafy.BackEnd.controller;

import com.ssafy.BackEnd.dto.UserDto;
import com.ssafy.BackEnd.entity.Request.RequestChangePassword1;
import com.ssafy.BackEnd.entity.Request.RequestChangePassword2;
import com.ssafy.BackEnd.entity.Request.RequestVerifyEmail;
import com.ssafy.BackEnd.entity.Profile;
import com.ssafy.BackEnd.entity.Response;
import com.ssafy.BackEnd.entity.Team;
import com.ssafy.BackEnd.entity.User;
import com.ssafy.BackEnd.entity.dummy;
import com.ssafy.BackEnd.service.AuthService;
import com.ssafy.BackEnd.service.JwtServiceImpl;
import com.ssafy.BackEnd.service.ProfileService;
import com.ssafy.BackEnd.service.TeamService;
import com.ssafy.BackEnd.service.dummyService;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/")
@RequiredArgsConstructor
public class MainController {

    private final JwtServiceImpl jwtService;
    
    private final AuthService authService;

    private final dummyService dummyService;
    private final TeamService teamService;
    private final ProfileService profileService;


    @GetMapping("/test22")
    @ApiOperation(value = "테스트페이지 ")
    public void test22() {
        System.out.println("###########################################테스트페이지 확인용");
    }

    @PostMapping("/signup")
    @ApiOperation(value = "회원가입", notes = "사용자의 정보를 입력 받고 'success'면 회원가입 or 'fail이면 에러메세지", response = String.class)
    public ResponseEntity<Map<String, Object>> signUp(@RequestBody UserDto userDto) {
        Response response = new Response();
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status;
        System.out.println("up : "+userDto.getEmail());
        try {
            User user = userDto.createUser();
            if (authService.validateDuplicateUser(user)==false) {
                status = HttpStatus.IM_USED;
                resultMap.put("message", "이미 존재하는 회원입니다.");
                return new ResponseEntity<Map<String, Object>>(resultMap, status);
            }
            authService.signUp(user);
            System.out.println(user.getPassword());
            response.setResponse("success");
            response.setMessage("회원가입을 성공적으로 완료했습니다.");
            response.setData(null);
            status = HttpStatus.ACCEPTED;
            resultMap.put("message", "success");
        }
        catch(Exception e) {
            response.setResponse("failed");
            response.setMessage("회원가입을 하는 도중 오류가 발생했습니다.");
            response.setData(e.toString());
            status = HttpStatus.ACCEPTED;
        }
        //return response;
        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }


    @GetMapping("/password/{key}")
    @ApiOperation(value = "비밀번호 변경 인증 절차", response = String.class)
    public ResponseEntity<Response> isPasswordUUIDValidate(@PathVariable String key) {
        Response response = new Response();
        try {
            if (authService.isPasswordUuidValidate(key)) {
                response.setResponse("success");
                response.setMessage("정상적인 접근입니다.");
                response.setData(null);
                return new ResponseEntity<Response>(response, HttpStatus.OK);
            } else {
                response.setResponse("error");
                response.setMessage("유효하지 않은 key값입니다.");
                response.setData(null);
                return new ResponseEntity<Response>(response, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            response.setResponse("error");
            response.setMessage("유효하지 않은 key값입니다.");
            response.setData(null);
            return new ResponseEntity<Response>(response, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("main/search/team")
    public ResponseEntity<List<Team>> findSearchedTeams(@RequestParam String keyword) {
        HttpStatus status;
        List<Team> teamList = teamService.showFindTeamList(keyword);
        //  System.out.println(keyword+"###############################################################");
        if(teamList.size()!= 0) {
            status = HttpStatus.OK;

        } else {
            status = HttpStatus.NO_CONTENT;
            // System.out.println("fail");
        }

        return new ResponseEntity<>(teamList, status);
    }
    @GetMapping("main/search/user")
    public ResponseEntity<List<Profile>> searchUser(@RequestParam String keyword) {
        HttpStatus status;
        List<Profile> teamList = profileService.showFindUserList(keyword);
        //  System.out.println(keyword+"###############################################################");
        if(teamList.size()!= 0) {
            // System.out.println(keyword+"###############################################################");
            status = HttpStatus.OK;
            // System.out.println("success\n"+teamList.get(0).getTeam_id());
            
        } else {
            // System.out.println(keyword+"@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@###############################################################");
            status = HttpStatus.NO_CONTENT;
            // System.out.println("fail");
        }

        return new ResponseEntity<>(teamList, status);
    }

    @GetMapping("/search/keyword/{param}")
    public ResponseEntity<List<dummy>> searchKeyword(@PathVariable String param) {

        System.out.println(param);

        if (param == null) {
            dummy temp = new dummy();
            temp.setId(45);
            temp.setName("name");
            List<dummy> senddata = new ArrayList<>();
            senddata.add(temp);
            return new ResponseEntity<List<dummy>>(senddata, HttpStatus.OK);
        } else {
            List<dummy> search_teams = dummyService.searchTestCheck(param);
            return new ResponseEntity<List<dummy>>(search_teams, HttpStatus.OK);
        }
    }




    @PostMapping("/password")
    @ApiOperation(value = "사용자 비밀번호 변경요청", response = String.class)
    public ResponseEntity<Response> requestChangePassword(@RequestParam String email) {
        Response response = new Response();
        try {
            User user = authService.findByEmail(email);
            if (!user.getEmail().equals(email)) throw new NoSuchFieldException("");
            authService.requestChangePassword(user);
            response.setResponse("success");
            response.setMessage("성공적으로 사용자의 비밀번호를 변경요청을 수행했습니다.");
            response.setData(null);
            return new ResponseEntity<Response>(response, HttpStatus.OK);
        } catch (NoSuchFieldException e) {
            response.setResponse("error");
            response.setMessage("사용자의 정보를 조회할 수 없습니다.");
            response.setData(null);
            return new ResponseEntity<Response>(response, HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            response.setResponse("error");
            response.setMessage("비밀번호 변경 요청을 할 수 없습니다.");
            response.setData(null);
            return new ResponseEntity<Response>(response, HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/password")
    @ApiOperation(value = "비밀번호 변경", response = String.class)
    public ResponseEntity<User> changePassword(@RequestBody RequestChangePassword2 requestChangePassword2) {
        Response response = new Response();
        try {
            User user = authService.findByEmail(requestChangePassword2.getEmail());
            User savedUser = authService.changePassword(user, requestChangePassword2.getPassword());
            response.setResponse("success");
            response.setMessage("사용자의 비밀번호를 성공적으로 변경했습니다.");
            response.setData(null);
            return new ResponseEntity<User>(savedUser, HttpStatus.OK);
        } catch (Exception e) {
            response.setResponse("error");
            response.setMessage("사용자의 비밀번호를 변경할 수 없습니다.");
            response.setData(null);
            return new ResponseEntity<User>((User) null, HttpStatus.NOT_MODIFIED);
        }
    }


    @GetMapping("/signin")
    @ApiOperation(value = "로그인 페이지")
    public void signinPage() {
        System.out.println("sign in hi");
    }

    @PostMapping("/signin") // 스켈레톤이랑 연결할땐 signin 지우고 '/' 상태에서
    @ApiOperation(value = "로그인 환경", response = Map.class)
    public ResponseEntity<Map<String, Object>> signin(@RequestBody User users,
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
    @ApiOperation(value = "회원가입 인증", response = String.class)
    public Response verify(@RequestBody RequestVerifyEmail requestVerifyEmail, HttpServletRequest req, HttpServletResponse res) {
        Response response = new Response();
        System.out.println("ve : "+requestVerifyEmail.getEmail());
        try {
            User user = authService.findByEmail(requestVerifyEmail.getEmail());
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
    @ApiOperation(value = "회원가입 인증 확인")
    public ResponseEntity<User> getVerify(@PathVariable String key) {
        Response response;
        try {
            ResponseEntity<User> userResponseEntity = authService.verifyEmail(key);
            User user = userResponseEntity.getBody();
            authService.createProfile(user);
            response = new Response("success", "성공적으로 인증메일을 확인했습니다.", null);
            return new ResponseEntity<User>(user, HttpStatus.OK);

        } catch (Exception e) {
            response = new Response("error", "인증메일을 확인하는데 실패했습니다.", null);
            return new ResponseEntity<User>((User) null, HttpStatus.UNAUTHORIZED);
        }
    }
}
