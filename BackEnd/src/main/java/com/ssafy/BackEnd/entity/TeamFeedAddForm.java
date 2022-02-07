package com.ssafy.BackEnd.entity;

import com.ssafy.BackEnd.dto.TeamFeedDto;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Data
@NoArgsConstructor
public class TeamFeedAddForm {

    @NotBlank
    private String content;

    private List<MultipartFile> imageFiles;
    private List<MultipartFile> generalFiles;

    @Builder
    private TeamFeedAddForm(String content, List<MultipartFile> imageFiles, List<MultipartFile> generalFiles) {
        this.content = content;
        this.imageFiles = (imageFiles != null) ? imageFiles : new ArrayList<>();
        this.generalFiles = (generalFiles != null) ? generalFiles : new ArrayList<>();
    }

    public TeamFeedDto createTeamFeedDto(Team team) {
        Map<FileType, List<MultipartFile>> teamfeed_file = getFileTypeListMap();
        return TeamFeedDto.builder()
                .team(team)
                .content(content)
                .teamFeedFiles(teamfeed_file)
                .build();
    }
    private Map<FileType, List<MultipartFile>> getFileTypeListMap() {
        Map<FileType, List<MultipartFile>> teamfeed_file = new ConcurrentHashMap<>();
        teamfeed_file.put(FileType.IMAGE, imageFiles);
        teamfeed_file.put(FileType.GENERAL, generalFiles);
        return teamfeed_file;
    }

}
