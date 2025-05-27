package com.thanhvu.Premier.mapper;

import com.thanhvu.Premier.dto.Request.PlayerRequest;
import com.thanhvu.Premier.entity.Player;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface PlayerMapper {
    @Mapping(target = "playerId", ignore = true)
    Player toPlayer(PlayerRequest rq);

    @Mapping(target = "playerId", ignore = true)
    void updatePlayer(PlayerRequest rq, @MappingTarget Player player);
}
