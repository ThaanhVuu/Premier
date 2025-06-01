package com.thanhvu.Premier.mapper;

import com.thanhvu.Premier.dto.Request.UserRequest;
import com.thanhvu.Premier.entity.User;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-06-01T13:47:14+0700",
    comments = "version: 1.6.2, compiler: Eclipse JDT (IDE) 3.42.0.v20250514-1000, environment: Java 21.0.7 (Eclipse Adoptium)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public User toUser(UserRequest userRequest) {
        if ( userRequest == null ) {
            return null;
        }

        User.UserBuilder user = User.builder();

        user.name( userRequest.getName() );
        user.password( userRequest.getPassword() );
        user.username( userRequest.getUsername() );

        return user.build();
    }

    @Override
    public void updateUserFromRequest(UserRequest request, User user) {
        if ( request == null ) {
            return;
        }

        user.setName( request.getName() );
        user.setPassword( request.getPassword() );
        user.setUsername( request.getUsername() );
    }
}
