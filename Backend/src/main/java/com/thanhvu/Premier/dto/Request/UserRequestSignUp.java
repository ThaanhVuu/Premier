package com.thanhvu.Premier.dto.Request;

import lombok.AccessLevel;
import lombok.Value;
import lombok.experimental.FieldDefaults;

@Value
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserRequestSignUp {
    String username;
    String password;
    String name;
}
