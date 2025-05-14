package com.thanhvu.Premier.repository;

import com.thanhvu.Premier.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    User getUsersByUserId(int userId);

    boolean existsByUsername(String username);

    Optional<User> findByUsername(String username);
}
