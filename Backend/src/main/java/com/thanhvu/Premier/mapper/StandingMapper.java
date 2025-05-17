package com.thanhvu.Premier.mapper;

import com.thanhvu.Premier.dto.Request.StandingRequest;
import com.thanhvu.Premier.entity.Standing;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface StandingMapper {
    @Mapping(target = "team", ignore = true)
    Standing toStanding(StandingRequest request);
    @Mapping(target = "team", ignore = true)
    void updateToStanding(StandingRequest request, @MappingTarget Standing standing);
}
