package com.ssafy.BackEnd.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@RequiredArgsConstructor
@Table(name = "teamfeed")
@Getter @Setter
public class TeamFeed {
    @Id
    long teamfeed_id;

    String content;



}
