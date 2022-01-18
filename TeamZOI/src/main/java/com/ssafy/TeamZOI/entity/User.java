package com.ssafy.TeamZOI.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@RequiredArgsConstructor
@Getter @Setter
public class User {

    @Id @Column(name = "email")
    private String email;

    private String username;
    private String password;
    private int identity;

}
