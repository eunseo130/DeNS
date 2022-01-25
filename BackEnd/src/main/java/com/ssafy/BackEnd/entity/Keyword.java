package com.ssafy.BackEnd.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Keyword {
    @Id
    long keyword_id;

    String name;

    @OneToMany
    List<TeamKeyword> team_keyword = new ArrayList<>();
}
