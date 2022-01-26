package com.ssafy.BackEnd.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="team")
@RequiredArgsConstructor
@Getter @Setter
public class Team {

    @Id
    @GeneratedValue
    @NotBlank
    long team_id;

    @NotBlank
    String title;

    String content;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "team")
    List<TeamKeyword> team_keyword = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "team")
    List<TeamMember> team_member = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "team")
    List<TeamFeed> team_feed = new ArrayList<>();

    @CreatedDate
    LocalDateTime create_time;

}
