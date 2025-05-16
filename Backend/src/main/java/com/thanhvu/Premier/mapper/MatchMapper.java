package com.thanhvu.Premier.mapper;

import com.thanhvu.Premier.dto.Request.MatchRequest;
import com.thanhvu.Premier.entity.Match;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface MatchMapper {
    @Mapping(target = "homeTeamId", ignore = true)
    @Mapping(target = "awayTeamId", ignore = true)
    Match toMatch(MatchRequest rq);

    @Mapping(target = "homeTeamId", ignore = true)
    @Mapping(target = "awayTeamId", ignore = true)
    void updateMatch(MatchRequest rq, @MappingTarget Match match);
}
