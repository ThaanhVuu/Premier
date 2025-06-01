package com.thanhvu.Premier.mapper;

import com.thanhvu.Premier.dto.Request.TeamRequest;
import com.thanhvu.Premier.entity.Team;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-06-01T13:47:14+0700",
    comments = "version: 1.6.2, compiler: Eclipse JDT (IDE) 3.42.0.v20250514-1000, environment: Java 21.0.7 (Eclipse Adoptium)"
)
@Component
public class TeamMapperImpl implements TeamMapper {

    @Override
    public Team toTeam(TeamRequest request) {
        if ( request == null ) {
            return null;
        }

        Team.TeamBuilder team = Team.builder();

        team.coach( request.getCoach() );
        team.currentPosition( request.getCurrentPosition() );
        team.foundedYear( request.getFoundedYear() );
        team.logoUrl( request.getLogoUrl() );
        team.name( request.getName() );
        team.shortName( request.getShortName() );
        team.website( request.getWebsite() );

        return team.build();
    }

    @Override
    public void updateToTeam(TeamRequest rq, Team team) {
        if ( rq == null ) {
            return;
        }

        team.setCoach( rq.getCoach() );
        team.setCurrentPosition( rq.getCurrentPosition() );
        team.setFoundedYear( rq.getFoundedYear() );
        team.setLogoUrl( rq.getLogoUrl() );
        team.setName( rq.getName() );
        team.setShortName( rq.getShortName() );
        team.setWebsite( rq.getWebsite() );
    }
}
