package com.ssafy.TeamZOI.repository;

import com.ssafy.TeamZOI.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

<<<<<<< HEAD
import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    List<User> findByEmail (String email);
=======
import javax.persistence.EntityManager;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

>>>>>>> 0e2024f4069e4502fe1c749e42ede855c418576a

}
