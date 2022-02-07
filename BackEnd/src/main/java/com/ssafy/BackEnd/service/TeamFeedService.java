package com.ssafy.BackEnd.service;

import com.ssafy.BackEnd.dto.TeamFeedDto;
import com.ssafy.BackEnd.entity.Team;
import com.ssafy.BackEnd.entity.TeamFeed;

import java.io.IOException;
import java.util.List;

public interface TeamFeedService {
    TeamFeed createTeamFeed(TeamFeedDto teamFeeddto) throws IOException;

    TeamFeed modifyTeamFeed(TeamFeed teamFeed, TeamFeedDto teamFeedDto);

    void deleteTeamFeed(long teamfeed_id);

    List<TeamFeed> showFindTeamFeedList();

}
