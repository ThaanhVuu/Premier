package com.thanhvu.Premier.dto.Request;

import lombok.Value;

import java.time.LocalDate;

@Value
public class PlayerRequest {
    long playerId;
    String name;
    String nationality;
    String position;
    int jerseyNumber;
    LocalDate dateOfBirth;
    double height;
    int weight;
    String photoUrl;
    int teamId;
}
