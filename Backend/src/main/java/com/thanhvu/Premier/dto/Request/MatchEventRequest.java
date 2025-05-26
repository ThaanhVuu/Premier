package com.thanhvu.Premier.dto.Request;

import com.thanhvu.Premier.entity.EventType;
import lombok.Value;

@Value
public class MatchEventRequest {
    long matchId;
    EventType eventType;
    int minute;
    Integer related_player_id;
    String description;
}
