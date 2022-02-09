package com.ssafy.BackEnd.config;

import com.ssafy.BackEnd.filter.JwtRequestFilter;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.filter.CharacterEncodingFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http.csrf().disable().formLogin().loginPage("/aaaaa"); // 페이지를 못가게 하는

        http.httpBasic()
                .and()
                .authorizeRequests()
                .antMatchers("/signin").permitAll()
                .antMatchers("/signup").permitAll()
                .antMatchers("/admin/**").hasRole("ADMIN");
                //.antMatchers("/team/*").hasRole("USER")
                //.antMatchers("/*").permitAll();

//                .antMatchers("/profile/*").permitAll();

        //        CharacterEncodingFilter filter = new CharacterEncodingFilter();
//        filter.setEncoding("UTF-8");
//        filter.setForceEncoding(true);
//
//
//        http.csrf().disable().formLogin().loginPage("/aaaaa"); // 페이지를 못가게 하는
//
//        http.httpBasic().disable();
//        http.csrf()
//                .disable()
//                .headers()
//                .frameOptions()
//                .disable();
//
//        http.authorizeRequests()
//                .antMatchers("/signin").permitAll()
//                .antMatchers("/signup").permitAll()
//                .antMatchers("/team/*").hasRole("USER");
////                .and()
//                .addFilterBefore(new JwtAuthenticationFilter(jwtService), UsernamePasswordAuthenticationFilter.class);
    }
}
