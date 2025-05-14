package com.thanhvu.Premier.exceptions;

import com.thanhvu.Premier.dto.Response.APIResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashSet;

@Slf4j
@RestControllerAdvice
public class GlobalHandlerException {
    @ExceptionHandler(value = Exception.class)
    ResponseEntity<APIResponse> handlingException(Exception e){
        APIResponse apiResponse = new APIResponse();
        apiResponse.setCode(403);
        apiResponse.setResult("False");
        apiResponse.setInfo(e.getMessage());
        return ResponseEntity.badRequest().body(apiResponse);
    }

    @ExceptionHandler(value = AppException.class)
    ResponseEntity<APIResponse> handlingRuntimeException(AppException ex){
        ErrorCode errorCode = ex.getErrorCode();

        APIResponse apiResponse = new APIResponse();

        apiResponse.setResult("False");
        apiResponse.setCode(errorCode.getCode());
        apiResponse.setInfo(errorCode.getInfo());

        return ResponseEntity.badRequest().body(apiResponse);
    }

    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    ResponseEntity<APIResponse> handlingValidException(MethodArgumentNotValidException e){
        String enumKey = e.getFieldError().getDefaultMessage();

        ErrorCode errorCode = ErrorCode.INVALID_MESSAGE_KEY;

        try{
            errorCode = ErrorCode.valueOf(enumKey);
        }catch (IllegalArgumentException ex){
            log.error(ex.getMessage());
        }

        APIResponse apiResponse = new APIResponse();

        apiResponse.setCode(errorCode.getCode());
        apiResponse.setResult("False");
        apiResponse.setInfo(errorCode.getInfo());

        return ResponseEntity
                .status(errorCode.getStatusCode())
                .body(apiResponse);
    }

    @ExceptionHandler(value = AccessDeniedException.class)
    ResponseEntity<APIResponse> handlingAccessDeniedException(AccessDeniedException e){
        ErrorCode errorCode = ErrorCode.UNAUTHORIZED;

        return ResponseEntity.status(errorCode.getStatusCode()).body(
                APIResponse.builder()
                        .code(errorCode.getCode())
                        .info(errorCode.getInfo())
                        .build()
        );
    }
}
