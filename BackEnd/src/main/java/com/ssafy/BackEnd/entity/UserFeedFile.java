package com.ssafy.BackEnd.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "userfeedfile")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SequenceGenerator(
        name = "File_SEQ_GENERATOR",
        sequenceName = "FILE_SEQ"
)
@Getter @Setter
public class UserFeedFile {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long userfeedfile_id;

    private String originalFileName;

    private String fileName;

    @Enumerated(EnumType.STRING)
    private FileType fileType;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "userfeed_id")
    UserFeed user_feed;

    @Builder
    public UserFeedFile(String originalFileName, String storePath, FileType fileType) {
        this.originalFileName = originalFileName;
        this.fileName = storePath;
        this.fileType = fileType;
    }
}
