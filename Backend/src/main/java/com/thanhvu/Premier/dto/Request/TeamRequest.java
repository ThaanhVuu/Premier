package com.thanhvu.Premier.dto.Request;

import lombok.AccessLevel;
import lombok.Value;
import lombok.experimental.FieldDefaults;

@Value
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TeamRequest {
    private String name;
    private String shortname;
    private int foundedYear;
    private String logoUrl;
    private String website;
    private String coach;
    private int currentPosition;
    private int stadiumId;
}
