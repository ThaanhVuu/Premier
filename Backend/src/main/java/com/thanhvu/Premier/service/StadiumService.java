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

    @PreAuthorize("hasRole('MANAGER')")
    // Tạo mới sân
    public Stadium createStadium(StadiumRequest request) {
        Stadium stadium = stadiumMapper.toStadium(request);
        return stadiumsRepository.save(stadium);
    }

    @PreAuthorize("hasRole('MANAGER')")
    // Cập nhật sân
    public Stadium updateStadium(int id, StadiumRequest request) {
        Stadium stadium = getStadium(id);
        stadiumMapper.updateToStadium(request, stadium);
        return stadiumsRepository.save(stadium);
    }

    @PreAuthorize("hasRole('MANAGER')")
    // Xoá sân
    public void deleteStadium(int id) {
        if (!stadiumsRepository.existsById(id)) {
            throw new AppException(ErrorCode.NOT_FOUND);
        }
        stadiumsRepository.deleteById(id);
    }

    @PreAuthorize("hasRole('MANAGER')")
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
