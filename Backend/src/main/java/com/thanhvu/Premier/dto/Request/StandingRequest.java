package com.thanhvu.Premier.dto.Request;

import lombok.Value;

@Value
public class StandingRequest {
    String season;
    int position;
    int played;
    int won;
    int drawn;
    int lost;
    int goalsFor;
    int goalsAgainst;
    int goalDifference;
    int points;
    int teamId;
}
