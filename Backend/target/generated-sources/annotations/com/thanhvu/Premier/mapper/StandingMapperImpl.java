package com.thanhvu.Premier.mapper;

import com.thanhvu.Premier.dto.Request.StandingRequest;
import com.thanhvu.Premier.entity.Standing;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-05-18T06:35:30+0700",
    comments = "version: 1.6.2, compiler: Eclipse JDT (IDE) 3.42.0.v20250514-1000, environment: Java 21.0.7 (Eclipse Adoptium)"
)
@Component
public class StandingMapperImpl implements StandingMapper {

    @Override
    public Standing toStanding(StandingRequest request) {
        if ( request == null ) {
            return null;
        }

        Standing.StandingBuilder standing = Standing.builder();

        standing.drawn( request.getDrawn() );
        standing.goalDifference( request.getGoalDifference() );
        standing.goalsAgainst( request.getGoalsAgainst() );
        standing.goalsFor( request.getGoalsFor() );
        standing.lost( request.getLost() );
        standing.played( request.getPlayed() );
        standing.points( request.getPoints() );
        standing.position( request.getPosition() );
        standing.season( request.getSeason() );
        standing.won( request.getWon() );

        return standing.build();
    }

    @Override
    public void updateToStanding(StandingRequest request, Standing standing) {
        if ( request == null ) {
            return;
        }

        standing.setDrawn( request.getDrawn() );
        standing.setGoalDifference( request.getGoalDifference() );
        standing.setGoalsAgainst( request.getGoalsAgainst() );
        standing.setGoalsFor( request.getGoalsFor() );
        standing.setLost( request.getLost() );
        standing.setPlayed( request.getPlayed() );
        standing.setPoints( request.getPoints() );
        standing.setPosition( request.getPosition() );
        standing.setSeason( request.getSeason() );
        standing.setWon( request.getWon() );
    }
}
