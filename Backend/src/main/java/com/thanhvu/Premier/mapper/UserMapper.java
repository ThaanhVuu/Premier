package com.thanhvu.Premier.mapper;

import com.thanhvu.Premier.dto.Request.UserRequest;
import com.thanhvu.Premier.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(target = "userId", ignore = true)
    User toUser(UserRequest userRequest);
    void updateUserFromRequest(UserRequest request, @MappingTarget User user);
}

