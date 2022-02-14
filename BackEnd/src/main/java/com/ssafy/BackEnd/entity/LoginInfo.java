package com.ssafy.BackEnd.entity;

import lombok.Builder;
import lombok.Getter;

@Getter
public class LoginInfo {
    private String name;

    @Builder
    public LoginInfo(String name) {
        this.name = name;
    }
}
