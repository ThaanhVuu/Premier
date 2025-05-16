package com.thanhvu.Premier.dto.Request;

import com.thanhvu.Premier.entity.MatchStatus;
import lombok.Value;

import java.time.LocalDateTime;

@Value
public class MatchRequest {
    int homeTeamId;
    int awayTeamId;
    LocalDateTime matchDate;
    int matchWeek;
    String season;
    MatchStatus status;
    String referee;
    int attendance;
    int homeScore;
    int awayScore;
}
