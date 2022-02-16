package com.ssafy.BackEnd.dto;

import com.ssafy.BackEnd.entity.*;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;
import reactor.util.annotation.Nullable;

import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Data
@NoArgsConstructor
public class TeamFeedDto {

    private Team team;

    @NotBlank
    private String content;

    @Nullable
    private Map<FileType, List<MultipartFile>> teamFeedFiles = new ConcurrentHashMap<>();

    @Nullable
    MultipartFile imageFiles;

    @Nullable
    MultipartFile generalFiles;

    @Builder
    public TeamFeedDto(Team team, String content, MultipartFile imageFiles, MultipartFile generalFiles) {
        this.team = team;
        this.content = content;
        this.imageFiles = imageFiles;
        this.generalFiles = generalFiles;
    }

    public TeamFeed createTeamFeed(TeamFeedDto teamFeedDto) {
        return TeamFeed.builder()
                .team(team)
                .content(content)
                .teamFeedFiles(new ArrayList<>())
                .build();
    }
}
