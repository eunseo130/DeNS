package com.ssafy.BackEnd.repository;

import com.ssafy.BackEnd.entity.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProfileRepository extends JpaRepository<Profile, String> {
    Optional<Profile> findByName(String name);
    Optional<Profile> findByEmail(String email);
}
