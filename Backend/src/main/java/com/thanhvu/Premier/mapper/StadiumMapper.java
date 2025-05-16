package com.thanhvu.Premier.mapper;

import com.thanhvu.Premier.dto.Request.StadiumRequest;
import com.thanhvu.Premier.entity.Stadium;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface StadiumMapper {
    Stadium toStadium(StadiumRequest request);
    void updateToStadium(StadiumRequest rq, @MappingTarget Stadium stadium);
}
