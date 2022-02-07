package com.ssafy.BackEnd.service;

import com.ssafy.BackEnd.dto.TeamFeedDto;
import com.ssafy.BackEnd.entity.TeamFeed;
import com.ssafy.BackEnd.entity.TeamFeedFile;
import com.ssafy.BackEnd.entity.UserFeed;
import com.ssafy.BackEnd.entity.UserFeedFile;
import com.ssafy.BackEnd.repository.TeamFeedRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class TeamFeedServiceImpl implements TeamFeedService{

    private final TeamFeedRepository teamFeedRepository;
    private final TeamFeedFileService teamFeedFileService;



    @Override
    public TeamFeed createTeamFeed(TeamFeed teamFeed) {
        teamFeedRepository.save(teamFeed);

        return teamFeed;
    }

    @Override
    public TeamFeed modifyTeamFeed(long teamfeed_id, TeamFeed teamFeed) {
        TeamFeed old_teamfeed = teamFeedRepository.findByFeedId(teamfeed_id);
        old_teamfeed.setContent(teamFeed.getContent());

        teamFeedRepository.save(old_teamfeed);

        return teamFeed;
    }

    @Override
    public void deleteTeamFeed(long teamfeed_id) {
        teamFeedRepository.deleteById(teamfeed_id);
    }

    @Override
    public List<TeamFeed> showFindTeamFeedList() {
        List<TeamFeed> teamFeeds = new ArrayList<>();
        teamFeedRepository.findAll().forEach(teamFeed -> teamFeeds.add(teamFeed));

        return teamFeeds;
    }

    @Override
    public TeamFeed post(TeamFeedDto teamFeedDto) throws IOException {
        List<TeamFeedFile> teamFeedFiles = teamFeedFileService.saveTeamFeedFiles(teamFeedDto.getTeamfeed_file());
        for(TeamFeedFile teamFeedFile : teamFeedFiles) {
            log.info(teamFeedFile.getOriginalFileName());
        }
        TeamFeed teamFeed = teamFeedDto.createTeamFeed();
        teamFeed.setTeamfeed_file(teamFeedFiles);

        return teamFeedRepository.save(teamFeed);
    }

}
