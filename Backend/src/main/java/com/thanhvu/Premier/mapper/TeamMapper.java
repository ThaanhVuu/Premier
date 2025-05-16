package com.thanhvu.Premier.mapper;

import com.thanhvu.Premier.dto.Request.TeamRequest;
import com.thanhvu.Premier.entity.Team;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface TeamMapper {
    Team toTeam(TeamRequest request);
    void updateToTeam(TeamRequest rq, @MappingTarget Team team);
}
