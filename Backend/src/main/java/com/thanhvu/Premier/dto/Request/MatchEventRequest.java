package com.thanhvu.Premier.dto.Request;

import com.thanhvu.Premier.entity.EventType;
import com.thanhvu.Premier.entity.Match;
import com.thanhvu.Premier.entity.Player;
import com.thanhvu.Premier.entity.Team;
import jakarta.persistence.ManyToOne;
import lombok.Value;

@Value
public class MatchEventRequest {
    long matchId;

    int teamId;

    long playerId;
    EventType eventType;
    int minute;
    int related_player_id;
    String description;
}
