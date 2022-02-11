package com.ssafy.BackEnd.config;

import com.ssafy.BackEnd.filter.JwtRequestFilter;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
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
        CharacterEncodingFilter filter = new CharacterEncodingFilter();
        filter.setEncoding("UTF-8");
        filter.setForceEncoding(true);


        http.csrf().disable(); // 페이지를 못가게 하는

        http.httpBasic()
                .and()
                .authorizeRequests()
                .antMatchers("/signin").permitAll()
                .antMatchers("/signup").permitAll()
                .antMatchers("/admin/**").hasRole("ADMIN")
                .antMatchers("/chat/**").hasRole("USER");



//        http.authorizeRequests()
//                .antMatchers("/signin").permitAll()
//                .antMatchers("/signup").permitAll()
//                .antMatchers("/team/*").hasRole("USER");
//
        http.headers().frameOptions().sameOrigin();
//                .and()
//                .addFilterBefore(new JwtAuthenticationFilter(jwtService), UsernamePasswordAuthenticationFilter.class);
//        http.csrf().disable().formLogin().loginPage("/aaaaa"); // 페이지를 못가게 하는
//
//        http.httpBasic()
//                .and()
//                .authorizeRequests()
//                .antMatchers("/*").permitAll();
////                .antMatchers("/signin", "/signup").permitAll()
////                .antMatchers("/admin/**").hasRole("ADMIN")
////                .antMatchers("/team/*").hasRole("USER")
////                .antMatchers("/profile/*").permitAll();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.inMemoryAuthentication()
                .withUser("eunseo@naver.com")
                .password("{noop}1234")
                .roles("USER")
            .and()
                .withUser("eunseo1")
                .password("{noop}1234")
                .roles("USER")
            .and()
                .withUser("guest")
                .password("{noop}1234")
                .roles("GUEST");
    }
}
