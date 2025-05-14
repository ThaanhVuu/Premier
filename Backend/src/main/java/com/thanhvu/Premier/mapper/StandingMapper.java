package com.thanhvu.Premier.mapper;

import com.thanhvu.Premier.dto.Request.StandingRequest;
import com.thanhvu.Premier.entity.Standing;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface StandingMapper {
    Standing toStanding(StandingRequest request);
    void updateToStanding(StandingRequest request, @MappingTarget Standing standing);
}
