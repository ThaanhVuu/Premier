package com.thanhvu.Premier.mapper;

import com.thanhvu.Premier.dto.Request.PlayerRequest;
import com.thanhvu.Premier.entity.Player;
import java.time.format.DateTimeFormatter;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-06-01T13:47:14+0700",
    comments = "version: 1.6.2, compiler: Eclipse JDT (IDE) 3.42.0.v20250514-1000, environment: Java 21.0.7 (Eclipse Adoptium)"
)
@Component
public class PlayerMapperImpl implements PlayerMapper {

    @Override
    public Player toPlayer(PlayerRequest rq) {
        if ( rq == null ) {
            return null;
        }

        Player.PlayerBuilder player = Player.builder();

        if ( rq.getDateOfBirth() != null ) {
            player.dateOfBirth( DateTimeFormatter.ISO_LOCAL_DATE.format( rq.getDateOfBirth() ) );
        }
        player.height( rq.getHeight() );
        player.jerseyNumber( rq.getJerseyNumber() );
        player.name( rq.getName() );
        player.nationality( rq.getNationality() );
        player.photoUrl( rq.getPhotoUrl() );
        player.playerId( rq.getPlayerId() );
        player.position( rq.getPosition() );
        player.weight( rq.getWeight() );

        return player.build();
    }

    @Override
    public void updatePlayer(PlayerRequest rq, Player player) {
        if ( rq == null ) {
            return;
        }

        if ( rq.getDateOfBirth() != null ) {
            player.setDateOfBirth( DateTimeFormatter.ISO_LOCAL_DATE.format( rq.getDateOfBirth() ) );
        }
        else {
            player.setDateOfBirth( null );
        }
        player.setHeight( rq.getHeight() );
        player.setJerseyNumber( rq.getJerseyNumber() );
        player.setName( rq.getName() );
        player.setNationality( rq.getNationality() );
        player.setPhotoUrl( rq.getPhotoUrl() );
        player.setPlayerId( rq.getPlayerId() );
        player.setPosition( rq.getPosition() );
        player.setWeight( rq.getWeight() );
    }
}
