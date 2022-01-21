package com.ssafy.BackEnd.entity;

import javax.persistence.*;

@Entity
public class TeamMember {
    @Id
    @GeneratedValue
    long teammember_id;

    @ManyToOne
    @JoinColumn(name = "team_id")
    Team team;

    @ManyToOne
    @JoinColumn(name = "email")
    User user;

}
