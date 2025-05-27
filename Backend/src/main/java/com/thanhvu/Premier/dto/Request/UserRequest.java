package com.thanhvu.Premier.dto.Request;

import com.thanhvu.Premier.entity.Role;
import lombok.Value;

@Value
public class UserRequest {
    String username;
    String password;
    String name;
    Role role;
}
