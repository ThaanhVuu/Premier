package com.thanhvu.Premier.mapper;

import com.thanhvu.Premier.dto.Request.TeamRequest;
import com.thanhvu.Premier.entity.Team;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-05-14T15:35:13+0700",
    comments = "version: 1.6.2, compiler: javac, environment: Java 21.0.7 (Oracle Corporation)"
)
@Component
public class TeamMapperImpl implements TeamMapper {

    @Override
    public Team toTeam(TeamRequest request) {
        if ( request == null ) {
            return null;
        }

        Team.TeamBuilder team = Team.builder();

        team.name( request.getName() );
        team.shortname( request.getShortname() );
        team.foundedYear( request.getFoundedYear() );
        team.logoUrl( request.getLogoUrl() );
        team.website( request.getWebsite() );
        team.coach( request.getCoach() );
        team.currentPosition( request.getCurrentPosition() );

        return team.build();
    }
}
