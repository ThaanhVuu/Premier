package com.thanhvu.Premier.mapper;

import com.thanhvu.Premier.dto.Request.StadiumRequest;
import com.thanhvu.Premier.entity.Stadium;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-05-27T17:12:47+0700",
    comments = "version: 1.6.2, compiler: javac, environment: Java 21.0.7 (Oracle Corporation)"
)
@Component
public class StadiumMapperImpl implements StadiumMapper {

    @Override
    public Stadium toStadium(StadiumRequest request) {
        if ( request == null ) {
            return null;
        }

        Stadium.StadiumBuilder stadium = Stadium.builder();

        stadium.name( request.getName() );
        stadium.city( request.getCity() );
        stadium.capacity( request.getCapacity() );
        stadium.address( request.getAddress() );
        stadium.builtYear( request.getBuiltYear() );
        stadium.photoUrl( request.getPhotoUrl() );

        return stadium.build();
    }

    @Override
    public void updateToStadium(StadiumRequest rq, Stadium stadium) {
        if ( rq == null ) {
            return;
        }

        stadium.setName( rq.getName() );
        stadium.setCity( rq.getCity() );
        stadium.setCapacity( rq.getCapacity() );
        stadium.setAddress( rq.getAddress() );
        stadium.setBuiltYear( rq.getBuiltYear() );
        stadium.setPhotoUrl( rq.getPhotoUrl() );
    }
}
