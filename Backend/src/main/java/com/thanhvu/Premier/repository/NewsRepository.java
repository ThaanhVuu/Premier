package com.thanhvu.Premier.repository;

import com.thanhvu.Premier.entity.News;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;


@Repository
public interface NewsRepository extends JpaRepository<News, Integer> {
    @Query("select sum(views) from News")
    long getTotalView();

    long countByPublishDateBetween(LocalDateTime start, LocalDateTime end);

//    @Query("SELECT SUM(n.views) FROM News n WHERE n.publishDate BETWEEN :start AND :end")
//    long countTotalViewsInDay(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);
}
