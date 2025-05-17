package com.thanhvu.Premier.mapper;

import com.thanhvu.Premier.dto.Request.MatchRequest;
import com.thanhvu.Premier.entity.Match;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-05-17T12:56:15+0700",
    comments = "version: 1.6.2, compiler: javac, environment: Java 21.0.7 (Oracle Corporation)"
)
@Component
public class MatchMapperImpl implements MatchMapper {

    @Override
    public Match toMatch(MatchRequest rq) {
        if ( rq == null ) {
            return null;
        }

        Match.MatchBuilder match = Match.builder();

        match.matchDate( rq.getMatchDate() );
        match.matchWeek( rq.getMatchWeek() );
        match.season( rq.getSeason() );
        match.status( rq.getStatus() );
        match.referee( rq.getReferee() );
        match.attendance( rq.getAttendance() );
        match.homeScore( rq.getHomeScore() );
        match.awayScore( rq.getAwayScore() );

        return match.build();
    }

    @Override
    public void updateMatch(MatchRequest rq, Match match) {
        if ( rq == null ) {
            return;
        }

        match.setMatchDate( rq.getMatchDate() );
        match.setMatchWeek( rq.getMatchWeek() );
        match.setSeason( rq.getSeason() );
        match.setStatus( rq.getStatus() );
        match.setReferee( rq.getReferee() );
        match.setAttendance( rq.getAttendance() );
        match.setHomeScore( rq.getHomeScore() );
        match.setAwayScore( rq.getAwayScore() );
    }
}
