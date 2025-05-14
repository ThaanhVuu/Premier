package com.thanhvu.Premier.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "teams")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Team {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int teamId;
    @Column(nullable = false, unique = true)
    String name;
    String shortName;
    int foundedYear;
    String logoUrl;
    String website;
    String coach;
    int currentPosition;
    @OneToOne
    @JoinColumn(name = "stadiumId", referencedColumnName = "stadiumId") // tạo cột stadiumId và là khoá ngoại nối tới stadium
    private Stadium stadium;
}
