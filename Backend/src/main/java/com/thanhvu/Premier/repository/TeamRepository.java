package com.thanhvu.Premier.repository;

import com.thanhvu.Premier.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeamRepository extends JpaRepository<Team, Integer> {
    Team getTeamByTeamId(int clubId);
}
