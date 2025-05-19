package com.thanhvu.Premier.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity @Table(name = "standings")
@NoArgsConstructor @AllArgsConstructor
@Data @Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Standing {
    @Id @GeneratedValue
    long standingId;
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
    @ManyToOne @JoinColumn(name = "team_id")
    Team team;
}
