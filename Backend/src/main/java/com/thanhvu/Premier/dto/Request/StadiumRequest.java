package com.thanhvu.Premier.dto.Request;

import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Value;
import lombok.experimental.FieldDefaults;

@Value
@FieldDefaults(level = AccessLevel.PRIVATE)
public class StadiumRequest {
    @Size(min = 3 ,message = "INVALID_STADIUM_NAME")
    String name;
    String city;
    int capacity;
    String address;
    int builtYear;
    String photoUrl;
}
