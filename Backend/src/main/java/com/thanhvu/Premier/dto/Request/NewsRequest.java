package com.thanhvu.Premier.dto.Request;

import lombok.AccessLevel;
import lombok.Value;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Value
@FieldDefaults(level = AccessLevel.PRIVATE)
public class NewsRequest {
    String title;
    String content;
    LocalDateTime publishDate;
    String imageURL;
    int authorId;
}
