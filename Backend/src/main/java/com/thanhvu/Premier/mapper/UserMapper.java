package com.thanhvu.Premier.mapper;

import com.thanhvu.Premier.dto.Request.UserRequestSignUp;
import com.thanhvu.Premier.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(target = "userId", ignore = true)
    User toUser(UserRequestSignUp userRequestSignUp);
    @Mapping(target = "userId", ignore = true)
    void updateUserFromRequest(UserRequestSignUp request, @MappingTarget User user);
}

