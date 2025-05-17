package com.thanhvu.Premier.mapper;

import com.thanhvu.Premier.dto.Request.StandingRequest;
import com.thanhvu.Premier.entity.Standing;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-05-18T01:25:31+0700",
    comments = "version: 1.6.2, compiler: javac, environment: Java 21.0.7 (Oracle Corporation)"
)
@Component
public class StandingMapperImpl implements StandingMapper {

    @Override
    public Standing toStanding(StandingRequest request) {
        if ( request == null ) {
            return null;
        }

        Standing.StandingBuilder standing = Standing.builder();

        standing.season( request.getSeason() );
        standing.position( request.getPosition() );
        standing.played( request.getPlayed() );
        standing.won( request.getWon() );
        standing.drawn( request.getDrawn() );
        standing.lost( request.getLost() );
        standing.goalsFor( request.getGoalsFor() );
        standing.goalsAgainst( request.getGoalsAgainst() );
        standing.goalDifference( request.getGoalDifference() );
        standing.points( request.getPoints() );

        return standing.build();
    }

    @Override
    public void updateToStanding(StandingRequest request, Standing standing) {
        if ( request == null ) {
            return;
        }

        standing.setSeason( request.getSeason() );
        standing.setPosition( request.getPosition() );
        standing.setPlayed( request.getPlayed() );
        standing.setWon( request.getWon() );
        standing.setDrawn( request.getDrawn() );
        standing.setLost( request.getLost() );
        standing.setGoalsFor( request.getGoalsFor() );
        standing.setGoalsAgainst( request.getGoalsAgainst() );
        standing.setGoalDifference( request.getGoalDifference() );
        standing.setPoints( request.getPoints() );
    }
}
