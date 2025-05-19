package com.thanhvu.Premier.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "stadiums")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Stadium {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "stadium_id")
    int stadiumId;
    @Column(nullable = false, unique = true)
    String name;
    String city;
    int capacity;
    String address;
    int builtYear;
    String photoUrl;
}
