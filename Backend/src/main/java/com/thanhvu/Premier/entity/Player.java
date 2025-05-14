package com.thanhvu.Premier.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity @Table(name = "players") @Data
@NoArgsConstructor @AllArgsConstructor
@Builder @FieldDefaults(level = AccessLevel.PRIVATE)
public class Player {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int playerId;

}
