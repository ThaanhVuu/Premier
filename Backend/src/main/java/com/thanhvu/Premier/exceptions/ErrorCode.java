package com.thanhvu.Premier.exceptions;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
public enum ErrorCode {
    INVALID_MESSAGE_KEY(1001, "Error message key not found", HttpStatus.BAD_REQUEST),
    UNKNOWN_ERROR(1002, "Unexpected error occurred", HttpStatus.INTERNAL_SERVER_ERROR),
    NOT_NULL(1003, "This field must not be empty", HttpStatus.BAD_REQUEST),
    ALREADY_EXISTS(1004, "Entity already exists and must be unique", HttpStatus.CONFLICT),
    INVALID_CREDENTIALS(1005, "Invalid login credentials", HttpStatus.UNAUTHORIZED),
    NOT_FOUND(1006, "Entity not found", HttpStatus.NOT_FOUND),
    INVALID_TOKEN(1007, "Invalid token", HttpStatus.UNAUTHORIZED),
    UNAUTHENTICATED(1008, "Authentication is required", HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED(1009, "You are not authorized to perform this action", HttpStatus.FORBIDDEN),

    INVALID_FORMAT(1010, "Invalid format", HttpStatus.BAD_REQUEST),
    INVALID_LENGTH(1011, "Invalid length", HttpStatus.BAD_REQUEST),

    // Thêm mã lỗi cho business logic
    INVALID_OPERATION(1012, "Invalid operation", HttpStatus.BAD_REQUEST),
    RESOURCE_IN_USE(1013, "Resource is in use", HttpStatus.CONFLICT),

    // Thêm mã lỗi cho rate limiting
    TOO_MANY_REQUESTS(1014, "Too many requests", HttpStatus.TOO_MANY_REQUESTS),

    // Thêm mã lỗi cho service unavailable
    SERVICE_UNAVAILABLE(1015, "Service temporarily unavailable", HttpStatus.SERVICE_UNAVAILABLE)

    ;

    private final int code;
    private final String info;

    ErrorCode(int code, String info, HttpStatusCode statusCode) {
        this.code = code;
        this.info = info;
        this.statusCode = statusCode;
    }

    private final HttpStatusCode statusCode;
}
