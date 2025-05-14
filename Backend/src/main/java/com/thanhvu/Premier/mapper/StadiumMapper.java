package com.thanhvu.Premier.mapper;

import com.thanhvu.Premier.dto.Request.StadiumRequest;
import com.thanhvu.Premier.entity.Stadium;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface StadiumMapper {
    Stadium toStadium(StadiumRequest request);
}
