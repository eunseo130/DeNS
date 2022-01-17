package com.ssafy.TeamZOI.repository;

import com.ssafy.TeamZOI.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

@Repository
public interface UserRepository extends JpaRepository<User, String> {


}
