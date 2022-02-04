package com.ssafy.BackEnd.service;

import com.ssafy.BackEnd.entity.TeamFeed;

import java.util.List;

public interface TeamFeedService {
    TeamFeed createTeamFeed(TeamFeed teamFeed);

    TeamFeed modifyTeamFeed(long teamfeed_id, TeamFeed teamFeed);

    void deleteTeamFeed(long teamfeed_id);

    List<TeamFeed> showFindTeamFeedList();



}
