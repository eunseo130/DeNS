package com.ssafy.BackEnd.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "userfeedfile")
@RequiredArgsConstructor
@Getter @Setter
public class UserFeedFile {

    @Id
    @GeneratedValue
    long userfeedfile_id;

    String file_name;

    String savefolder;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "userfeed_id")
    UserFeed user_feed;
}
