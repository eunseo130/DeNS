package com.ssafy.BackEnd.entity;

import javax.persistence.*;

@Entity
public class TeamKeyword {
    @Id
    @GeneratedValue
    @Column(name="teamkeyword_id")
    long teamkeyword_id;

    @ManyToOne
    @JoinColumn(name = "team_id")
    Team team;

//    @ManyToOne
//    @JoinColumn(name = "keyword_id")
//    Keyword keyword;
}
