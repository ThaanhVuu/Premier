package com.thanhvu.Premier.repository;

import com.thanhvu.Premier.entity.Stadium;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StadiumsRepository extends JpaRepository<Stadium, Integer> {
    Stadium getStadiumByStadiumId(int stadiumId);

    @Query("SELECT s FROM Stadium s WHERE s NOT IN (SELECT t.stadium FROM Team t WHERE t.stadium IS NOT NULL)")
    List<Stadium> findStadiumsNotAssignedToTeam();
}
