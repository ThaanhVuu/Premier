package com.thanhvu.Premier.mapper;

import com.thanhvu.Premier.dto.Request.MatchRequest;
import com.thanhvu.Premier.entity.Match;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-05-23T19:10:38+0700",
    comments = "version: 1.6.2, compiler: Eclipse JDT (IDE) 3.42.0.v20250514-1000, environment: Java 21.0.7 (Eclipse Adoptium)"
)
@Component
public class MatchMapperImpl implements MatchMapper {

    @Override
    public Match toMatch(MatchRequest rq) {
        if ( rq == null ) {
            return null;
        }

        Match.MatchBuilder match = Match.builder();

        match.attendance( rq.getAttendance() );
        match.awayScore( rq.getAwayScore() );
        match.homeScore( rq.getHomeScore() );
        match.matchDate( rq.getMatchDate() );
        match.matchWeek( rq.getMatchWeek() );
        match.referee( rq.getReferee() );
        match.season( rq.getSeason() );
        match.status( rq.getStatus() );

        return match.build();
    }

    @Override
    public void updateMatch(MatchRequest rq, Match match) {
        if ( rq == null ) {
            return;
        }

        match.setAttendance( rq.getAttendance() );
        match.setAwayScore( rq.getAwayScore() );
        match.setHomeScore( rq.getHomeScore() );
        match.setMatchDate( rq.getMatchDate() );
        match.setMatchWeek( rq.getMatchWeek() );
        match.setReferee( rq.getReferee() );
        match.setSeason( rq.getSeason() );
        match.setStatus( rq.getStatus() );
    }
}
