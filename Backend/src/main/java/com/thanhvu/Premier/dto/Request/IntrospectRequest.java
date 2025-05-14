package com.thanhvu.Premier.dto.Request;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data @Builder
@AllArgsConstructor @NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class IntrospectRequest {
    String token;
}
