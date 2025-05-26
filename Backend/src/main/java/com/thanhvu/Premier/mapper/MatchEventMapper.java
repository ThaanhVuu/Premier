package com.thanhvu.Premier.mapper;

import com.thanhvu.Premier.dto.Request.MatchEventRequest;
import com.thanhvu.Premier.entity.MatchEvent;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface MatchEventMapper {

    MatchEvent toMatch(MatchEventRequest rq);

    void updateToMatchEvent(MatchEventRequest rq, @MappingTarget MatchEvent matchEvent);

}
