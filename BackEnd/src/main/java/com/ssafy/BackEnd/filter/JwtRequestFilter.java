package com.ssafy.BackEnd.filter;

import com.ssafy.BackEnd.entity.User;
import com.ssafy.BackEnd.entity.UserIdentity;
import com.ssafy.BackEnd.service.CookieService;
import com.ssafy.BackEnd.service.JwtServiceImpl;
import com.ssafy.BackEnd.service.RedisUtil;
import com.ssafy.BackEnd.service.UserService;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtRequestFilter extends OncePerRequestFilter {

    private final UserService userService;
    private final JwtServiceImpl jwtService;
    private final CookieService cookieService;
    private final RedisUtil redisUtil;


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        final Cookie jwtToken = cookieService.getCookie(request, JwtServiceImpl.ACCESS_TOKEN_NAME);

        //System.out.println("token"+jwtToken.getValue());

        String userEmail = null;
        String jwt = null;
        String refreshJwt = null;
        String refreshUserEmail = null;

        try {
            if(jwtToken != null){
                jwt = jwtToken.getValue();
                userEmail = jwtService.getUserEmail(jwt);
            }
            if(userEmail != null) {
                User user = userService.findByEmail(userEmail);
                UserIdentity userAuth = userService.findUserAuth(userEmail);
                List<GrantedAuthority> roles = new ArrayList<>();

                if(userAuth == UserIdentity.UNAUTH) roles.add(new SimpleGrantedAuthority("UNATH"));
                else roles.add(new SimpleGrantedAuthority("USER"));

                if(jwtService.validateToken(jwt, user)){
                    UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(user, null, roles);
                    usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
                }
            }
        } catch (ExpiredJwtException e){
            Cookie refreshToken = cookieService.getCookie(request, JwtServiceImpl.REFRESH_TOKEN_NAME);
            if(refreshToken != null){
                refreshJwt = refreshToken.getValue();
            }
        } catch (Exception e) {}

        try{
            if(refreshJwt != null) {
                refreshUserEmail = redisUtil.getData(refreshJwt);

                if(refreshUserEmail.equals(jwtService.getUserEmail(refreshJwt))){
                    User user = userService.findByEmail(refreshUserEmail);
                    UserIdentity userAuth = userService.findUserAuth(refreshUserEmail);
                    List<GrantedAuthority> roles = new ArrayList<>();

                    if(userAuth == UserIdentity.UNAUTH) roles.add(new SimpleGrantedAuthority("UNAUTH"));
                    else roles.add(new SimpleGrantedAuthority("USER"));

                    UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(user, null, roles);
                    usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);

                    User user1 = new User();
                    user1.setEmail(refreshUserEmail);
                    String newToken = jwtService.generateToken(user1);

                    Cookie newAccessToken = cookieService.createCookie(JwtServiceImpl.ACCESS_TOKEN_NAME, newToken);
                    response.addCookie(newAccessToken);
                }
            }
        } catch (ExpiredJwtException e) {}

        filterChain.doFilter(request, response);

    }
}
