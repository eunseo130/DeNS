package com.ssafy.BackEnd.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Entity
@RequiredArgsConstructor
@Table(name = "user")
@Getter @Setter
public class User{

    @Id @Column(name = "email")
    @NotBlank
    private String email;

//    @GeneratedValue
//    private Long user_id;

    @NotBlank
    private String name;

    @NotBlank
    private String password;

    @Column(name = "identity")
    @Enumerated(EnumType.STRING)
    private UserIdentity identity = UserIdentity.UNAUTH;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "salt_id")
    private Salt salt;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "profile_id")
    private Profile profile;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<TeamMember> team_member = new ArrayList<>( );

    @CreatedDate
    private LocalDateTime create_time;
}
