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
    @ManyToOne
    @JoinColumn(name = "team_id")
    Team team;
    String name;
    String nationality;
    String position;
    int jerseyNumber;
    @Column(name = "date_of_birth")
    String dateOfBirth;
    double height;
    int weight;
    String photoUrl;
}
