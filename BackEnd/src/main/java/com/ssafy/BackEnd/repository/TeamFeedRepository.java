package com.ssafy.BackEnd.repository;

import com.ssafy.BackEnd.entity.TeamFeed;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TeamFeedRepository extends JpaRepository<TeamFeed, Long> {
    @Query("select t from TeamFeed t where teamfeed_id = :teamfeed_id")
    TeamFeed findByFeedId(long teamfeed_id);
}
