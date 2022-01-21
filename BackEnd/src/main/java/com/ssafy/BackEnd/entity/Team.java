package com.ssafy.BackEnd.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;

@Entity
@RequiredArgsConstructor
@Table(name = "team")
@Getter @Setter
public class Team {

    @Id
    @GeneratedValue
    @NotBlank
    long team_id;

    @NotBlank
    String title;

    @NotBlank
    String content;

    @OneToMany
    List<TeamKeyword> team_keyword = new ArrayList<>(); //이거 왜 안돼ㅐㅐㅐㅐㅐㅐ?

    @OneToMany
    List<TeamMember> team_member = new ArrayList<>(); //list 왜 import 안돼ㅐㅐㅐㅐㅐㅐ?

    @OneToMany
    List<TeamFeed> team_feed = new ArrayList<>();

}
