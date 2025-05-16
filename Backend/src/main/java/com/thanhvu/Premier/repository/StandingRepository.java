package com.thanhvu.Premier.repository;

import com.thanhvu.Premier.entity.Standing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StandingRepository extends JpaRepository<Standing, Long> {
    List<Standing> findAllSortedByPointsDesc();
}
