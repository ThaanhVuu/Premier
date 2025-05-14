package com.thanhvu.Premier.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Entity
@Table(name = "news")
@Data @Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)

public class News {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "news_id")
    int newsId;
    String title;
    String content;
    LocalDateTime publishDate;
    String imageURL;
    int views;
    @ManyToOne @JoinColumn(name = "authorId", referencedColumnName = "userId", nullable = true)
    User author;
}
