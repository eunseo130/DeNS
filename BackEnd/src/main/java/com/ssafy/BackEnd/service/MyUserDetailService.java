//package com.ssafy.BackEnd.service;
//
//import lombok.RequiredArgsConstructor;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//
//@Service
//@RequiredArgsConstructor
//public class MyUserDetailsService implements UserDetailsService {
//
//    private final ProfileService profileService;
//
//    //
//    @Override
//    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
//        return profileService.findUserByEmail(email);
//    }
//}