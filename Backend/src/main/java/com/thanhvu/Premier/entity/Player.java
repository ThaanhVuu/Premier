package com.thanhvu.Premier.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Entity @Table(name = "Players")
@Data @AllArgsConstructor @NoArgsConstructor
@Builder @FieldDefaults(level = AccessLevel.PRIVATE)
public class Player {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    long playerId;
    String name;
    String nationality;
    String position;
    int jerseyNumber;
    LocalDate dateOfBirth;
    double height;
    int weight;
    String photoUrl;
    @ManyToOne
            @JoinColumn(name = "team_id")
    Team team;
}
