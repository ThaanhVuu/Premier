package com.thanhvu.Premier.mapper;

import com.thanhvu.Premier.dto.Request.MatchEventRequest;
import com.thanhvu.Premier.entity.MatchEvent;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-05-29T15:59:07+0700",
    comments = "version: 1.6.2, compiler: javac, environment: Java 21.0.7 (Oracle Corporation)"
)
@Component
public class MatchEventMapperImpl implements MatchEventMapper {

    @Override
    public MatchEvent toMatch(MatchEventRequest rq) {
        if ( rq == null ) {
            return null;
        }

        MatchEvent.MatchEventBuilder matchEvent = MatchEvent.builder();

        matchEvent.eventType( rq.getEventType() );
        matchEvent.minute( rq.getMinute() );
        matchEvent.related_player_id( rq.getRelated_player_id() );
        matchEvent.description( rq.getDescription() );

        return matchEvent.build();
    }

    @Override
    public void updateToMatchEvent(MatchEventRequest rq, MatchEvent matchEvent) {
        if ( rq == null ) {
            return;
        }

        matchEvent.setEventType( rq.getEventType() );
        matchEvent.setMinute( rq.getMinute() );
        matchEvent.setRelated_player_id( rq.getRelated_player_id() );
        matchEvent.setDescription( rq.getDescription() );
    }
}
