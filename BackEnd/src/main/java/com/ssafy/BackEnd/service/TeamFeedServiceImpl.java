package com.ssafy.BackEnd.service;

import com.ssafy.BackEnd.dto.TeamFeedDto;
import com.ssafy.BackEnd.entity.*;
import com.ssafy.BackEnd.repository.KeywordRepository;
import com.ssafy.BackEnd.repository.TeamFeedKeywordRepository;
import com.ssafy.BackEnd.repository.TeamFeedRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class TeamFeedServiceImpl implements TeamFeedService{

    private final TeamFeedRepository teamFeedRepository;

    private final TeamFeedFileService teamFeedFileService;

    private final KeywordRepository keywordRepository;

    private final TeamFeedKeywordRepository teamFeedKeywordRepository;

    private HashTagAlgorithm hashTagAlgorithm = new HashTagAlgorithm();

    @Override
    public TeamFeed createTeamFeed(TeamFeedDto teamFeedDto) throws IOException {
        List<TeamFeedFile> teamFeedFiles = teamFeedFileService.saveTeamFeedFiles(teamFeedDto.getTeamFeedFiles());
        for(TeamFeedFile teamFeedFile : teamFeedFiles) {
            log.info(teamFeedFile.getOriginalFileName());
        }
        TeamFeed teamFeed = teamFeedDto.createTeamFeed(teamFeedDto);
        List<String> keywords = hashTagAlgorithm.strList(teamFeed.getContent());
        List<Keyword> keywordList = new ArrayList<>();
        List<TeamFeedKeyword> teamFeedKeywordList = new ArrayList<>();
        for (String keyword : keywords) {
            if (keywordRepository.findByName(keyword) == null) {
                Keyword newKeyword = new Keyword();
                newKeyword.setName(keyword);
                newKeyword.setCount(1);
                keywordList.add(newKeyword);
                TeamFeedKeyword newTeamFeedKeyword = new TeamFeedKeyword();
                newTeamFeedKeyword.setKeyword(newKeyword);
                newTeamFeedKeyword.setTeam_feed(teamFeed);
                teamFeedKeywordRepository.save(newTeamFeedKeyword);
                teamFeedKeywordList.add(newTeamFeedKeyword);
            } else {
                Keyword findKeyword = keywordRepository.findByName(keyword);
                findKeyword.setCount(findKeyword.getCount() + 1);
                keywordRepository.save(findKeyword);
                keywordList.add(findKeyword);
                if (teamFeedKeywordRepository.findByKeywordId(findKeyword.getKeyword_id()) == null) {
                    TeamFeedKeyword newTeamFeedKeyword = new TeamFeedKeyword();
                    newTeamFeedKeyword.setKeyword(findKeyword);
                    newTeamFeedKeyword.setTeam_feed(teamFeed);
                    teamFeedKeywordRepository.save(newTeamFeedKeyword);
                    teamFeedKeywordList.add(newTeamFeedKeyword);
                }
            }
        }
        teamFeed.setTeamFeedKeywords(teamFeedKeywordList);
        teamFeed.setTeamFeedFiles(teamFeedFiles);
        return teamFeedRepository.save(teamFeed);
    }



    @Override
    public TeamFeed modifyTeamFeed(long teamfeed_id, String content) {
        TeamFeed old_teamfeed = teamFeedRepository.findByFeedId(teamfeed_id);
        old_teamfeed.setContent(content);

        List<TeamFeedKeyword> teamFeedKeywords = old_teamfeed.getTeamFeedKeywords();
        List<String> keywords = hashTagAlgorithm.strList(old_teamfeed.getContent());
        List<TeamFeedKeyword> deleteKeywords = new ArrayList<>();
        for (TeamFeedKeyword teamFeedKeyword : teamFeedKeywords) {
            if (keywords.contains(teamFeedKeyword.getKeyword().getName()) == false) {
                System.out.println(teamFeedKeyword.getKeyword().getName());
                System.out.println("==============if");
                teamFeedKeyword.getKeyword().setCount(teamFeedKeyword.getKeyword().getCount()-1);
                deleteKeywords.add(teamFeedKeyword);
//                keywords.remove(teamFeedKeyword.getKeyword().getName());
//                teamFeedKeywords.remove(teamFeedKeyword);
            } else if (keywords.contains(teamFeedKeyword.getKeyword().getName())){
                System.out.println(teamFeedKeyword.getKeyword().getName());
                System.out.println("=============else");
                keywords.remove(teamFeedKeyword.getKeyword().getName());
            }
        }
        for (TeamFeedKeyword deleteKeyword : deleteKeywords) {
//            teamFeedKeywords.remove(deleteKeyword);
            if (deleteKeyword.getKeyword().getCount() <= 0) {

//                deleteKeyword.setTeam_feed(null);
//                deleteKeyword.setKeyword(null);
//                teamFeedKeywordRepository.deleteById(deleteKeyword.getTeamfeedkeyword_id());
//                System.out.println(deleteKeyword.getKeyword().getKeyword_id());
                System.out.println("========delete");
                teamFeedKeywords.remove(deleteKeyword);
                teamFeedKeywordRepository.delete(deleteKeyword);
//                teamFeedKeywordRepository.deleteById(deleteKeyword.getTeamfeedkeyword_id());
//                keywordRepository.deleteById(deleteKeyword.getKeyword().getKeyword_id());

                teamFeedKeywords.remove(deleteKeyword);
            }
        }
        for (String key : keywords) System.out.println(key.getBytes(StandardCharsets.UTF_8));
        List<Keyword> keywordList = new ArrayList<>();
        for (String keyword : keywords) {
            if (keywordRepository.findByName(keyword) == null) {
                Keyword newKeyword = new Keyword();
                newKeyword.setName(keyword);
                newKeyword.setCount(1);
                keywordList.add(newKeyword);
                TeamFeedKeyword newTeamFeedKeyword = new TeamFeedKeyword();
                newTeamFeedKeyword.setKeyword(newKeyword);
                newTeamFeedKeyword.setTeam_feed(old_teamfeed);
                teamFeedKeywordRepository.save(newTeamFeedKeyword);
                teamFeedKeywords.add(newTeamFeedKeyword);
            } else {
                Keyword findKeyword = keywordRepository.findByName(keyword);
                findKeyword.setCount(findKeyword.getCount() + 1);
                keywordRepository.save(findKeyword);
                keywordList.add(findKeyword);
                if (teamFeedKeywordRepository.findByKeywordId(findKeyword.getKeyword_id()) == null) {
                    TeamFeedKeyword newTeamFeedKeyword = new TeamFeedKeyword();
                    newTeamFeedKeyword.setKeyword(findKeyword);
                    newTeamFeedKeyword.setTeam_feed(old_teamfeed);
//                    teamFeedKeywordRepository.save(newTeamFeedKeyword);
                    teamFeedKeywords.add(newTeamFeedKeyword);
                }
            }
        }
        for (TeamFeedKeyword keyword : teamFeedKeywords) System.out.println(keyword.getKeyword().getName());
        old_teamfeed.setTeamFeedKeywords(teamFeedKeywords);
        teamFeedRepository.save(old_teamfeed);

        return old_teamfeed;
    }

    // 수정 teamFeed만 삭제되도록
    @Override
    public void deleteTeamFeed(long teamfeed_id) {
        TeamFeed teamFeed = teamFeedRepository.findByFeedId(teamfeed_id);
//        Team team = teamFeed.getTeam();
        List<TeamFeedKeyword> teamFeedKeywords = teamFeed.getTeamFeedKeywords();
        for (TeamFeedKeyword teamFeedKeyword : teamFeedKeywords) {
            teamFeedKeyword.getKeyword().setCount(teamFeedKeyword.getKeyword().getCount() - 1);
            teamFeedKeyword.getKeyword().setTeam_feed_keyword(null);
            teamFeedKeywordRepository.delete(teamFeedKeyword);
            System.out.println("=======================");
//            teamFeedKeywords.remove(teamFeedKeyword);
//            System.out.println(teamFeedKeyword.getKeyword().getName());
        }

        teamFeedRepository.delete(teamFeed);
        System.out.println("=====remove");
//        System.out.println(teamFeed.getContent());
////        teamFeedRepository.delete(teamFeed);
//        System.out.println(teamfeed_id);
//        System.out.println(teamFeed.getTeamfeed_id());
//
//        teamFeed.setTeamFeedKeywords(null);
//        teamFeedRepository.deleteById(teamfeed_id);
    }

    @Override
    public List<TeamFeed> showFindTeamFeedList() {
        List<TeamFeed> teamFeeds = new ArrayList<>();
        teamFeedRepository.findAll().forEach(teamFeed -> teamFeeds.add(teamFeed));

        return teamFeeds;
    }


}
