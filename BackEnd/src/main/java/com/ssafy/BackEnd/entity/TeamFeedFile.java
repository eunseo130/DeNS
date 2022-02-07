package com.ssafy.BackEnd.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SequenceGenerator(
        name = "File_SEQ_GENERATOR",
        sequenceName = "FILE_SEQ"
)
@Table(name = "teamfeedfile")
@Getter @Setter
public class TeamFeedFile {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long teamfeedfile_id;

    private String originalFileName;

    private String fileName;

    @Enumerated(EnumType.STRING)
    private FileType fileType;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "teamfeed_id")
    TeamFeed team_feed;

    @Builder
    public TeamFeedFile(String originalFileName, String storePath, FileType fileType) {
        this.originalFileName = originalFileName;
        this.fileName = storePath;
        this.fileType = fileType;
    }
}
