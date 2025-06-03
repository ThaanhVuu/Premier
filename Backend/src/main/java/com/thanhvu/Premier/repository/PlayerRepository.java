package com.thanhvu.Premier.repository;

import com.thanhvu.Premier.entity.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Long> {
    @Query("select p from Player p where p.team.teamId = :teamId")
    List<Player> getPlayerByTeam(int teamId);
}
