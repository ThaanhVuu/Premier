package com.thanhvu.Premier.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity @Table(name = "match_events")
@AllArgsConstructor @Builder @NoArgsConstructor @Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class MatchEvent {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    long eventId;
    @ManyToOne
    Player player;
    @ManyToOne @JoinColumn(name = "match_id")
    Match match;
    @Enumerated(EnumType.STRING)
    EventType eventType;
    int minute;
    Integer related_player_id;
    String description;
}
