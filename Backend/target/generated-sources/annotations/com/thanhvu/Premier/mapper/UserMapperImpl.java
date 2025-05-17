package com.thanhvu.Premier.mapper;

import com.thanhvu.Premier.dto.Request.UserRequest;
import com.thanhvu.Premier.entity.User;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-05-17T13:46:07+0700",
    comments = "version: 1.6.2, compiler: javac, environment: Java 21.0.7 (Oracle Corporation)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public User toUser(UserRequest userRequest) {
        if ( userRequest == null ) {
            return null;
        }

        User.UserBuilder user = User.builder();

        user.username( userRequest.getUsername() );
        user.password( userRequest.getPassword() );
        user.name( userRequest.getName() );

        return user.build();
    }

    @Override
    public void updateUserFromRequest(UserRequest request, User user) {
        if ( request == null ) {
            return;
        }

        user.setUsername( request.getUsername() );
        user.setPassword( request.getPassword() );
        user.setName( request.getName() );
    }
}
