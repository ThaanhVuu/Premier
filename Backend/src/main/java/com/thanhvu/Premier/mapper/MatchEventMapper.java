package com.thanhvu.Premier.mapper;

import com.thanhvu.Premier.dto.Request.MatchEventRequest;
import com.thanhvu.Premier.entity.MatchEvent;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface MatchEventMapper {
//    @Mapping(target = "playerId", ignore = true)
//    @Mapping(target = "teamId", ignore = true)
//    @Mapping(target = "matchId", ignore = true)
    MatchEvent toMatch(MatchEventRequest rq);
//
//    @Mapping(target = "playerId", ignore = true)
//    @Mapping(target = "teamId", ignore = true)
//    @Mapping(target = "matchId", ignore = true)
    void updateToMatchEvent(MatchEventRequest rq, @MappingTarget MatchEvent matchEvent);

}
