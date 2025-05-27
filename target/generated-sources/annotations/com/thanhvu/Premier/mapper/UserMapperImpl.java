package com.thanhvu.Premier.mapper;

import com.thanhvu.Premier.dto.Request.UserRequestSignUp;
import com.thanhvu.Premier.entity.User;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-05-27T14:31:20+0700",
    comments = "version: 1.6.2, compiler: javac, environment: Java 21.0.7 (Oracle Corporation)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public User toUser(UserRequestSignUp userRequestSignUp) {
        if ( userRequestSignUp == null ) {
            return null;
        }

        User.UserBuilder user = User.builder();

        user.username( userRequestSignUp.getUsername() );
        user.password( userRequestSignUp.getPassword() );
        user.name( userRequestSignUp.getName() );

        return user.build();
    }

    @Override
    public void updateUserFromRequest(UserRequestSignUp request, User user) {
        if ( request == null ) {
            return;
        }

        user.setUsername( request.getUsername() );
        user.setPassword( request.getPassword() );
        user.setName( request.getName() );
    }
}
