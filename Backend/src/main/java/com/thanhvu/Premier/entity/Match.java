package com.thanhvu.Premier.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Entity @Table(name = "matches")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Match {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    long matchId;
    @ManyToOne
    @JoinColumn(name = "home_team_id")
    Team homeTeamId;
    @ManyToOne
    @JoinColumn(name = "away_team_id")
    Team awayTeamId;
    @ManyToOne
    @JoinColumn(name = "stadium_id")
    Stadium stadium;
    LocalDateTime matchDate;
    int matchWeek;
    String season;
    @Enumerated(EnumType.STRING)
    MatchStatus status;
    String referee;
    Integer attendance;
    Integer homeScore;
    Integer awayScore;
}
