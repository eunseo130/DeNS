package com.ssafy.BackEnd.config;

import com.ssafy.BackEnd.filter.JwtRequestFilter;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {


    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable().formLogin().loginPage("/aaaaa"); // 페이지를 못가게 하는

        http.httpBasic()
                .and()
                .authorizeRequests()
                .antMatchers("/signin", "/signup").permitAll()
                .antMatchers("/admin/**").hasRole("ADMIN")
                .antMatchers("/profile/*").permitAll()
                .anyRequest().permitAll();
    }
}
