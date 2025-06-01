package com.thanhvu.Premier.mapper;

import com.thanhvu.Premier.dto.Request.StadiumRequest;
import com.thanhvu.Premier.entity.Stadium;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-06-01T13:47:14+0700",
    comments = "version: 1.6.2, compiler: Eclipse JDT (IDE) 3.42.0.v20250514-1000, environment: Java 21.0.7 (Eclipse Adoptium)"
)
@Component
public class StadiumMapperImpl implements StadiumMapper {

    @Override
    public Stadium toStadium(StadiumRequest request) {
        if ( request == null ) {
            return null;
        }

        Stadium.StadiumBuilder stadium = Stadium.builder();

        stadium.address( request.getAddress() );
        stadium.builtYear( request.getBuiltYear() );
        stadium.capacity( request.getCapacity() );
        stadium.city( request.getCity() );
        stadium.name( request.getName() );
        stadium.photoUrl( request.getPhotoUrl() );

        return stadium.build();
    }

    @Override
    public void updateToStadium(StadiumRequest rq, Stadium stadium) {
        if ( rq == null ) {
            return;
        }

        stadium.setAddress( rq.getAddress() );
        stadium.setBuiltYear( rq.getBuiltYear() );
        stadium.setCapacity( rq.getCapacity() );
        stadium.setCity( rq.getCity() );
        stadium.setName( rq.getName() );
        stadium.setPhotoUrl( rq.getPhotoUrl() );
    }
}
