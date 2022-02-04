package com.ssafy.BackEnd.service;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Base64;
import java.util.Date;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.ssafy.BackEnd.entity.User;
import com.ssafy.BackEnd.exception.UnAuthorizedException;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Service
public class JwtServiceImpl { //implements JwtService {

    public static final Logger logger = LoggerFactory.getLogger(JwtServiceImpl.class);

    public final static long TOKEN_VALIDATION_SECOND = 1000L * 10;
    public final static long REFRESH_TOKEN_VALIDATION_SECOND = 1000L * 60 * 24 * 2;

    final static public String ACCESS_TOKEN_NAME = "accessToken";
    final static public String REFRESH_TOKEN_NAME = "refreshToken";

    @Value("${JWT.SECRET}")
    private String SALT;
    private static final long EXPIRE_MINUTES = 30 * 60 *1000L;
    //private final ProfileService profileService;

    protected void init() {
        SALT = Base64.getEncoder().encodeToString(SALT.getBytes(StandardCharsets.UTF_8));
    }

    private Key getSigningKey(String secretKey){
        byte[] keyBytes = secretKey.getBytes(StandardCharsets.UTF_8);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String doGenerateToken(String email, long expireTime){
        Claims claims = Jwts.claims();
        claims.put("email", email);
        System.out.println("make token");

        String jwt = Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expireTime))
                .signWith(getSigningKey(SALT), SignatureAlgorithm.HS256)
                .compact();

        return jwt;
    }

    public Claims extractAllClaims(String token) throws ExpiredJwtException {
        Claims jwt = Jwts.parserBuilder()
                .setSigningKey(getSigningKey(SALT))
                .build()
                .parseClaimsJws(token)
                .getBody();

        return jwt;
    }

    public String getUserEmail(String token){
        return extractAllClaims(token).get("email", String.class);
    }

    public Boolean isTokenExpired(String token){
        final Date expiraton = extractAllClaims(token).getExpiration();
        return expiraton.before(new Date());
    }

    public String generateToken(User user) {
        return doGenerateToken(user.getEmail(), TOKEN_VALIDATION_SECOND);
    }

    public String generateRefershToken(User user) {
        return doGenerateToken(user.getEmail(), REFRESH_TOKEN_VALIDATION_SECOND);
    }

    public Boolean validateToken(String token, User user){
        final String userEmail = getUserEmail(token);

        return (userEmail.equals(user.getEmail()) && !isTokenExpired(token));
    }

    //    @Override
//    public <T> String create(String key, T data, String subject) {
//        //System.out.println("-------- hi create token-----------");
//        String jwt = Jwts.builder()
//                .setHeaderParam("typ", "JWT")
//                .setHeaderParam("regDate", System.currentTimeMillis())
//                .setExpiration(new Date(System.currentTimeMillis() + EXPIRE_MINUTES))
//                .setSubject(subject).claim(key, data)
//                .signWith(SignatureAlgorithm.HS256, this.generateKey()).compact();
//        //System.out.println("jwt : "+jwt);
//        return jwt;
//    }

//    private byte[] generateKey() {
//        byte[] key = null;
//        try {
//            key = SALT.getBytes("UTF-8");
//        } catch (UnsupportedEncodingException e) {
//            if (logger.isInfoEnabled()) {
//                e.printStackTrace();
//            } else {
//                logger.error("Making JWT Key Error ::: {}", e.getMessage());
//            }
//        }
//        return key;
//    }

//    public Authentication getAuthentication(String token){
//
//    }
    //    전달 받은 토큰이 제대로 생성된것인지 확인 하고 문제가 있다면 UnauthorizedException을 발생.
//    @Override
//    public boolean isUsable(String jwt) {
//        try {
//            Jws<Claims> claims = Jwts.parser().setSigningKey(this.generateKey()).parseClaimsJws(jwt);
//            return true;
//        } catch (Exception e) {
////            if (logger.isInfoEnabled()) {
////                e.printStackTrace();
////            } else {
//            logger.error(e.getMessage());
////            }
////            throw new UnauthorizedException();
////            개발환경
//            return false;
//        }
//    }

//
//
//    @Override
//    public Map<String, Object> get(String key) {
//        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes())
//                .getRequest();
//        String jwt = request.getHeader("access-token");
//        Jws<Claims> claims = null;
//        try {
//            claims = Jwts.parser().setSigningKey(SALT.getBytes("UTF-8")).parseClaimsJws(jwt);
//        } catch (Exception e) {
////            if (logger.isInfoEnabled()) {
////                e.printStackTrace();
////            } else {
//            logger.error(e.getMessage());
////            }
//            throw new UnAuthorizedException();
////            개발환경
////            Map<String,Object> testMap = new HashMap<>();
////            testMap.put("userid", userid);
////            return testMap;
//        }
//        Map<String, Object> value = claims.getBody();
//        logger.info("value : {}", value);
//        return value;
//    }
//
//    @Override
//    public String getUserId() {
//        return (String) this.get("user").get("userid");
//    }
}