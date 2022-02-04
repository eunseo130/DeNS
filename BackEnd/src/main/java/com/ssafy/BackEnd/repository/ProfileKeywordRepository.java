package com.ssafy.BackEnd.repository;

import com.ssafy.BackEnd.entity.ProfileKeyword;
import com.ssafy.BackEnd.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ProfileKeywordRepository extends JpaRepository<ProfileKeyword, Long> {
    @Query(value = "select k from ProfileKeyword k where keyword_id = :keyword_id")
    ProfileKeyword findByKeywordId(Long keyword_id);
}
