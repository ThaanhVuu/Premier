package com.thanhvu.Premier.repository;

import com.thanhvu.Premier.entity.MatchEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MatchEventRepository extends JpaRepository<MatchEvent, Long> {
    @Query("select me from MatchEvent me where me.match.matchId = :matchId")
    List<MatchEvent> getMatchEventByMatch(Long matchId);
}
