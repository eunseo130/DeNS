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
        List<TeamFeedKeyword> teamFeedKeywords = new ArrayList<>();
        for (String keyword : keywords) {
            if (teamKeywordRepository.findTeamKeyword(keyword, teamFeed.getTeam()) == null) {
                TeamKeyword newTeamKeyword = new TeamKeyword();
                newTeamKeyword.setName(keyword);
                newTeamKeyword.setCount(1);
                newTeamKeyword.setTeam(teamFeed.getTeam());
                teamKeywordRepository.save(newTeamKeyword);
                TeamFeedKeyword newTeamFeedKeyword = new TeamFeedKeyword();
                newTeamFeedKeyword.setName(keyword);
                newTeamFeedKeyword.setTeam_feed(teamFeed);
                teamFeedKeywordRepository.save(newTeamFeedKeyword);
                teamFeedKeywords.add(newTeamFeedKeyword);
            } else {
                TeamKeyword findTeamKeyword = teamKeywordRepository.findTeamKeyword(keyword, teamFeed.getTeam());
                findTeamKeyword.setCount(findTeamKeyword.getCount()+1);
                TeamFeedKeyword findTeamFeedKeyword = teamFeedKeywordRepository.findTeamFeedKeyword(keyword, teamFeed.getTeamfeed_id());
                if (findTeamFeedKeyword == null) {
                    TeamFeedKeyword newTeamFeedKeyword = new TeamFeedKeyword();
                    newTeamFeedKeyword.setName(keyword);
                    newTeamFeedKeyword.setTeam_feed(teamFeed);
                    teamFeedKeywords.add(newTeamFeedKeyword);
                } else {
                    teamFeedKeywords.add(findTeamFeedKeyword);
                }
            }
        }
        teamFeed.setTeamFeedKeywords(teamFeedKeywords);
        teamFeed.setTeamFeedFiles(teamFeedFiles);
        return teamFeedRepository.save(teamFeed);
    }


    @Override
    public TeamFeed modifyTeamFeed(TeamFeed teamFeed, TeamFeedDto teamFeedDto) {
        teamFeed.setContent(teamFeedDto.getContent());

        List<TeamFeedKeyword> teamFeedKeywords = teamFeed.getTeamFeedKeywords();
        List<TeamKeyword> teamKeywords = teamFeed.getTeam().getTeam_keyword();
        List<String> keywords = hashTagAlgorithm.strList(teamFeed.getContent());
        List<TeamKeyword> deleteKeywords = new ArrayList<>();
        for (TeamKeyword teamKeyword : teamKeywords) {
            if (!keywords.contains(teamKeyword.getName())) {
                System.out.println(teamKeyword.getName());
                System.out.println("==============if");
                teamKeyword.setCount(teamKeyword.getCount() - 1);
                deleteKeywords.add(teamKeyword);
////                keywords.remove(teamFeedKeyword.getKeyword().getName());
//                teamFeedKeywords.remove(teamFeedKeyword);
            } else if (keywords.contains(teamKeyword.getName())) {
                System.out.println(teamKeyword.getName());
                System.out.println("=============else");
                keywords.remove(teamKeyword.getName());
            }
        }
        for (TeamKeyword deleteKeyword : deleteKeywords) {
//            teamFeedKeywords.remove(deleteKeyword);
            if (deleteKeyword.getCount() <= 0) {

//                deleteKeyword.setTeam_feed(null);
//                deleteKeyword.setKeyword(null);
//                teamFeedKeywordRepository.deleteById(deleteKeyword.getTeamfeedkeyword_id());
                System.out.println("=======remove");
                teamFeedKeywords.remove(deleteKeyword);
                System.out.println("==========delete");
                teamKeywordRepository.delete(deleteKeyword);
//                teamFeedKeywordRepository.deleteById(deleteKeyword.getTeamfeedkeyword_id());
//                keywordRepository.deleteById(deleteKeyword.getKeyword().getKeyword_id());

//                teamFeedKeywords.remove(deleteKeyword);
            }
        }

        for (String key : keywords) System.out.println(key.getBytes(StandardCharsets.UTF_8));
        for (String keyword : keywords) {
            if (teamKeywordRepository.findTeamKeyword(keyword, teamFeed.getTeam()) == null) {
                TeamKeyword newTeamKeyword = new TeamKeyword();
                newTeamKeyword.setName(keyword);
                newTeamKeyword.setCount(1);
                newTeamKeyword.setTeam(teamFeed.getTeam());
                teamKeywordRepository.save(newTeamKeyword);
                TeamFeedKeyword newTeamFeedKeyword = new TeamFeedKeyword();
                newTeamFeedKeyword.setName(keyword);
                newTeamFeedKeyword.setTeam_feed(teamFeed);
                teamFeedKeywordRepository.save(newTeamFeedKeyword);
                teamFeedKeywords.add(newTeamFeedKeyword);
            } else {
                TeamKeyword findTeamKeyword = teamKeywordRepository.findTeamKeyword(keyword, teamFeed.getTeam());
                findTeamKeyword.setCount(findTeamKeyword.getCount()+1);

                if (teamFeedKeywordRepository.findTeamFeedKeyword(keyword, teamFeed.getTeamfeed_id()) == null) {
                    TeamFeedKeyword newTeamFeedKeyword = new TeamFeedKeyword();
                    newTeamFeedKeyword.setName(keyword);
                    newTeamFeedKeyword.setTeam_feed(teamFeed);
                }
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
            return teamFeed;

    }

    // 수정 teamFeed만 삭제되도록
    @Override
    public void deleteTeamFeed(long teamfeed_id) {
        TeamFeed teamFeed = teamFeedRepository.findByFeedId(teamfeed_id);
//        Team team = teamFeed.getTeam();
        List<TeamFeedKeyword> teamFeedKeywordList = teamFeed.getTeamFeedKeywords();
        List<TeamKeyword> deleteKeywordList = new ArrayList<>();
        for (TeamFeedKeyword teamFeedKeyword : teamFeedKeywordList) {
//            teamFeedKeyword.getKeyword().setCount(teamFeedKeyword.getKeyword().getCount() - 1);
//            teamFeedKeyword.getKeyword().setTeam_feed_keyword(null);
            TeamKeyword teamKeyword = teamKeywordRepository.findTeamKeyword(teamFeedKeyword.getName(), teamFeed.getTeam());
            teamKeyword.setCount(teamKeyword.getCount()-1);
            if (teamKeyword.getCount() <= 0) {
                teamKeywordRepository.delete(teamKeyword);
            }
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
