package com.ssafy.BackEnd.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@RequiredArgsConstructor
@Getter @Setter
public class Profile {

    @Id @GeneratedValue
    @Column(name = "profile_id")
    private Long id;
    private String name;
    private String job;
    private String stack;
}
