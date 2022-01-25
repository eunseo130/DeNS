package com.ssafy.BackEnd.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "userfeed")
@RequiredArgsConstructor
@Getter @Setter
public class UserFeed extends BaseTimeEntity {

    @Id
    @GeneratedValue
    long userfeed_id;

    String content;

//    @CreatedDate
//    LocalDateTime create_time;
//
//    @LastModifiedDate
//    LocalDateTime modify_time;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "profile_id")
    Profile profile;

    @OneToMany(mappedBy = "user_feed", cascade = CascadeType.ALL)
    List<UserFeedFile> userfeed_file = new ArrayList<>();

    @OneToMany(mappedBy = "user_feed", cascade = CascadeType.ALL)
    List<UserFeedKeyword>  userfeed_keyword = new ArrayList<>();
}
