package com.thanhvu.Premier.mapper;

import com.thanhvu.Premier.dto.Request.PlayerRequest;
import com.thanhvu.Premier.entity.Player;
import java.time.format.DateTimeFormatter;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-05-20T08:47:41+0700",
    comments = "version: 1.6.2, compiler: javac, environment: Java 21.0.7 (Oracle Corporation)"
)
@Component
public class PlayerMapperImpl implements PlayerMapper {

    @Override
    public Player toPlayer(PlayerRequest rq) {
        if ( rq == null ) {
            return null;
        }

        Player.PlayerBuilder player = Player.builder();

        player.playerId( rq.getPlayerId() );
        player.name( rq.getName() );
        player.nationality( rq.getNationality() );
        player.position( rq.getPosition() );
        player.jerseyNumber( rq.getJerseyNumber() );
        if ( rq.getDateOfBirth() != null ) {
            player.dateOfBirth( DateTimeFormatter.ISO_LOCAL_DATE.format( rq.getDateOfBirth() ) );
        }
        player.height( rq.getHeight() );
        player.weight( rq.getWeight() );
        player.photoUrl( rq.getPhotoUrl() );

        return player.build();
    }

    @Override
    public void updatePlayer(PlayerRequest rq, Player player) {
        if ( rq == null ) {
            return;
        }

        player.setPlayerId( rq.getPlayerId() );
        player.setName( rq.getName() );
        player.setNationality( rq.getNationality() );
        player.setPosition( rq.getPosition() );
        player.setJerseyNumber( rq.getJerseyNumber() );
        if ( rq.getDateOfBirth() != null ) {
            player.setDateOfBirth( DateTimeFormatter.ISO_LOCAL_DATE.format( rq.getDateOfBirth() ) );
        }
        else {
            player.setDateOfBirth( null );
        }
        player.setHeight( rq.getHeight() );
        player.setWeight( rq.getWeight() );
        player.setPhotoUrl( rq.getPhotoUrl() );
    }
}
