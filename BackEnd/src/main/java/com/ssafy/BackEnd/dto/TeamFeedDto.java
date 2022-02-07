package com.ssafy.BackEnd.dto;

import com.ssafy.BackEnd.entity.FileType;
import com.ssafy.BackEnd.entity.Team;
import com.ssafy.BackEnd.entity.TeamFeed;
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
public class TeamFeedDto {

    private Team team;

    @NotBlank
    private String content;

    private Map<FileType, List<MultipartFile>> teamfeed_file = new ConcurrentHashMap<>();

    @Builder
    public TeamFeedDto(Team team, String content, Map<FileType, List<MultipartFile>> teamfeed_file) {
        this.team = team;
        this.content = content;
        this.teamfeed_file = teamfeed_file;
    }

    public TeamFeed createTeamFeed() {
        return TeamFeed.builder()
                .team(team)
                .content(content)
                .teamfeed_file(new ArrayList<>())
                .build();
    }
}
