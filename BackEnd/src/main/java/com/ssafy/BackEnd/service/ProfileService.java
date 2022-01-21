package com.ssafy.BackEnd.service;

import com.ssafy.BackEnd.entity.Profile;
import com.ssafy.BackEnd.entity.User;
import javassist.NotFoundException;
import org.springframework.web.client.HttpClientErrorException;

public interface ProfileService {

    Profile findProfile(User user) throws NotFoundException;

    void createProfile(Profile profile);

    Profile modifyProfile(Profile findProfile, Profile profile) throws NotFoundException;
}
