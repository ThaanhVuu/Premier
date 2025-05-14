package com.thanhvu.Premier.service;

import com.thanhvu.Premier.dto.Request.StadiumRequest;
import com.thanhvu.Premier.entity.Stadium;
import com.thanhvu.Premier.exceptions.AppException;
import com.thanhvu.Premier.exceptions.ErrorCode;
import com.thanhvu.Premier.mapper.StadiumMapper;
import com.thanhvu.Premier.repository.StadiumsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StadiumService {
    private final StadiumsRepository stadiumsRepository;
    private final StadiumMapper stadiumMapper;

    // Lấy danh sách tất cả sân
    public List<Stadium> getAllStadiums() {
        return stadiumsRepository.findAll();
    }

    // Lấy sân theo ID
    public Stadium getStadium(int id) {
        return stadiumsRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.NOT_FOUND));
    }

    @PreAuthorize("hasRole('ADMIN')")
    // Tạo mới sân
    public Stadium createStadium(StadiumRequest request) {
        Stadium stadium = stadiumMapper.toStadium(request);
        return stadiumsRepository.save(stadium);
    }

    @PreAuthorize("hasRole('ADMIN')")
    // Cập nhật sân
    public Stadium updateStadium(int id, StadiumRequest request) {
        Stadium stadium = getStadium(id);

        stadium = stadiumMapper.toStadium(request);
        stadium.setStadiumId(id);

        return stadiumsRepository.save(stadium);
    }

    @PreAuthorize("hasRole('ADMIN')")
    // Xoá sân
    public void deleteStadium(int id) {
        if (!stadiumsRepository.existsById(id)) {
            throw new AppException(ErrorCode.NOT_FOUND);
        }
        stadiumsRepository.deleteById(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    //Đếm tổng số sân
    public long countStadium(){
        return stadiumsRepository.count();
    }
    
    //cac san chua lk voi team
    public List<Stadium> getUnassignedStadiums() {
        List<Stadium> unassigned = stadiumsRepository.findStadiumsNotAssignedToTeam();
        return unassigned;
    }
}
