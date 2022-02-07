package com.ssafy.BackEnd.service;

import com.ssafy.BackEnd.dto.TeamFeedDto;
import com.ssafy.BackEnd.entity.*;
import com.ssafy.BackEnd.repository.TeamFeedKeywordRepository;
import com.ssafy.BackEnd.repository.TeamFeedRepository;
import com.ssafy.BackEnd.repository.TeamKeywordRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class TeamFeedServiceImpl implements TeamFeedService{

    private final TeamFeedRepository teamFeedRepository;

    private final TeamFeedFileService teamFeedFileService;

    private final TeamKeywordRepository teamKeywordRepository;

    private final TeamFeedKeywordRepository teamFeedKeywordRepository;

    private HashTagAlgorithm hashTagAlgorithm = new HashTagAlgorithm();

    @Override
    public TeamFeed createTeamFeed(TeamFeedDto teamFeedDto) throws IOException {
        TeamFeed teamFeed = teamFeedDto.createTeamFeed(teamFeedDto);
        List<TeamFeedFile> teamFeedFiles = teamFeedFileService.saveTeamFeedFiles(teamFeedDto.getTeamFeedFiles());
        for(TeamFeedFile teamFeedFile : teamFeedFiles) {
            log.info(teamFeedFile.getOriginalFileName());
            teamFeedFile.setTeam_feed(teamFeed);
        }
        List<String> keywords = hashTagAlgorithm.strList(teamFeed.getContent());
        for (String keyword : keywords) {
            if (teamKeywordRepository.findByName(keyword) == null) {
                TeamKeyword newTeamKeyword = new TeamKeyword();
                newTeamKeyword.setName(keyword);
                newTeamKeyword.setCount(1);
                newTeamKeyword.setTeam(teamFeed.getTeam());
                TeamFeedKeyword newTeamFeedKeyword = new TeamFeedKeyword();
                newTeamFeedKeyword.setName(keyword);
                newTeamFeedKeyword.setTeam_feed(teamFeed);
                teamFeedKeywordRepository.save(newTeamFeedKeyword);

            } else {
                TeamKeyword findTeamKeyword = teamKeywordRepository.findByName(keyword);
                findTeamKeyword.setCount(findTeamKeyword.getCount()+1);

                if (teamFeedKeywordRepository.findTeamFeedKeyword(keyword, teamFeed.getTeamfeed_id()) == null) {
                    TeamFeedKeyword newTeamFeedKeyword = new TeamFeedKeyword();
                    newTeamFeedKeyword.setName(keyword);
                    newTeamFeedKeyword.setTeam_feed(teamFeed);
                }
            }
        }
        teamFeed.setTeamFeedFiles(teamFeedFiles);
        return teamFeedRepository.save(teamFeed);
    }


    @Override
    public TeamFeed modifyTeamFeed(TeamFeed teamFeed, TeamFeedDto teamFeedDto) {
        teamFeed.setContent(teamFeedDto.getContent());

        List<TeamFeedKeyword> teamFeedKeywords = teamFeed.getTeamFeedKeywords();
        List<String> keywords = hashTagAlgorithm.strList(teamFeed.getContent());
        List<TeamFeedKeyword> deleteKeywords = new ArrayList<>();
        for (TeamFeedKeyword teamFeedKeyword : teamFeedKeywords) {
            if (!keywords.contains(teamFeedKeyword.getName())) {
                System.out.println(teamFeedKeyword.getName());
                System.out.println("==============if");
                teamFeedKeyword.setCount(teamFeedKeyword.getCount() - 1);
                deleteKeywords.add(teamFeedKeyword);
//                keywords.remove(teamFeedKeyword.getKeyword().getName());
//                teamFeedKeywords.remove(teamFeedKeyword);
            } else if (keywords.contains(teamFeedKeyword.getKeyword().getName())) {
                System.out.println(teamFeedKeyword.getKeyword().getName());
                System.out.println("=============else");
                keywords.remove(teamFeedKeyword.getKeyword().getName());
            }
        }
        for (TeamFeedKeyword deleteKeyword : deleteKeywords) {
//            teamFeedKeywords.remove(deleteKeyword);
            if (deleteKeyword.getCount() <= 0) {

//                deleteKeyword.setTeam_feed(null);
//                deleteKeyword.setKeyword(null);
//                teamFeedKeywordRepository.deleteById(deleteKeyword.getTeamfeedkeyword_id());
                System.out.println(deleteKeyword.getKeyword().getKeyword_id());
                System.out.println("=======remove");
                teamFeedKeywords.remove(deleteKeyword);
                System.out.println("==========delete");
//                teamFeedKeywordRepository.delete(deleteKeyword);
//                teamFeedKeywordRepository.deleteById(deleteKeyword.getTeamfeedkeyword_id());
//                keywordRepository.deleteById(deleteKeyword.getKeyword().getKeyword_id());

//                teamFeedKeywords.remove(deleteKeyword);
            }
        }
        for (String key : keywords) System.out.println(key.getBytes(StandardCharsets.UTF_8));
        List<Keyword> keywordList = new ArrayList<>();
        for (String keyword : keywords) {
            if (keywordRepository.findByName(keyword) == null) {
                Keyword newKeyword = new Keyword();
                newKeyword.setName(keyword);
                keywordList.add(newKeyword);
                TeamFeedKeyword newTeamFeedKeyword = new TeamFeedKeyword();
                newTeamFeedKeyword.setKeyword(newKeyword);
                newTeamFeedKeyword.setTeam_feed(teamFeed);
                newTeamFeedKeyword.setCount(1);
                teamFeedKeywordRepository.save(newTeamFeedKeyword);
                teamFeedKeywords.add(newTeamFeedKeyword);
            } else {
                Keyword findKeyword = keywordRepository.findByName(keyword);
                keywordList.add(findKeyword);
                if (teamFeedKeywordRepository.findTeamFeedKeyword(findKeyword.getKeyword_id(), teamFeed.getTeamfeed_id()) == null) {
                    TeamFeedKeyword newTeamFeedKeyword = new TeamFeedKeyword();
                    newTeamFeedKeyword.setKeyword(findKeyword);
                    newTeamFeedKeyword.setTeam_feed(teamFeed);
                    newTeamFeedKeyword.setCount(1);
//                    teamFeedKeywordRepository.save(newTeamFeedKeyword);
                    teamFeedKeywords.add(newTeamFeedKeyword);
                } else {
                    TeamFeedKeyword findTeamFeedKeyword = teamFeedKeywordRepository.findTeamFeedKeyword(findKeyword.getKeyword_id(), teamFeed.getTeamfeed_id());
                    findTeamFeedKeyword.setCount(findTeamFeedKeyword.getCount() + 1);
                }
            }
            teamFeed.setTeamFeedKeywords(teamFeedKeywords);

//            List<TeamFeedFile> teamFeedFiles = teamFeed.getTeamFeedFiles();
//
//
//            Map<FileType, List<MultipartFile>> teamFeedDtoFiles = teamFeedDto.getTeamFeedFiles();
//            List<MultipartFile> imageFiles = teamFeedDtoFiles.get(FileType.IMAGE);
//            List<MultipartFile> generalFiles = teamFeedDtoFiles.get(FileType.GENERAL);
//
//            List<MultipartFile> addImageFiles = new ArrayList<>();
//            List<MultipartFile> addGeneralFiles = new ArrayList<>();
//
//            Map<FileType, List<MultipartFile>> addFiles = new HashMap<>();
//
//            for (MultipartFile image: imageFiles) {
//                if (!teamFeedFiles.contains(image)) {
//                    addImageFiles.add(image);
//                }
//            }
//
//            addFiles.put(FileType.IMAGE, addImageFiles);
//
//
//            for (MultipartFile file: generalFiles) {
//                if (!teamFeedFiles.contains(file)) {
//                    addGeneralFiles.add(file);
//                }
//            }
//
//            addFiles.put(FileType.GENERAL, addGeneralFiles);
//
//            ;

            teamFeedRepository.save(teamFeed);
        }
            return teamFeed;

    }

    // 수정 teamFeed만 삭제되도록
    @Override
    public void deleteTeamFeed(long teamfeed_id) {
        TeamFeed teamFeed = teamFeedRepository.findByFeedId(teamfeed_id);
//        Team team = teamFeed.getTeam();
        List<TeamFeedKeyword> teamFeedKeywordList = teamFeed.getTeamFeedKeywords();
        for (TeamFeedKeyword teamFeedKeyword : teamFeedKeywordList) {
//            teamFeedKeyword.getKeyword().setCount(teamFeedKeyword.getKeyword().getCount() - 1);
//            teamFeedKeyword.getKeyword().setTeam_feed_keyword(null);
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
