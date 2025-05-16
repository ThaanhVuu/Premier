package com.thanhvu.Premier.mapper;

import com.thanhvu.Premier.dto.Request.MatchRequest;
import com.thanhvu.Premier.entity.Match;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface MatchMapper {
    Match toMatch(MatchRequest rq);
    void updateMatch(MatchRequest rq, @MappingTarget Match match);
}
