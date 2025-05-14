package com.thanhvu.Premier.mapper;

import com.thanhvu.Premier.dto.Request.TeamRequest;
import com.thanhvu.Premier.entity.Team;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TeamMapper {
    Team toTeam(TeamRequest request);
}
