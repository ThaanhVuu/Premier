package com.thanhvu.Premier.repository;

import com.thanhvu.Premier.entity.Standing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StandingRepository extends JpaRepository<Standing, Long> {
}
