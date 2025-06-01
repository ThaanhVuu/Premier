package com.thanhvu.Premier.controller;

import com.thanhvu.Premier.dto.Response.APIResponse;
import com.thanhvu.Premier.service.LoggerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/logger")
@RequiredArgsConstructor
public class LoggerController {
    private final LoggerService service;

    @GetMapping
    APIResponse<?> getAllLogger(){
        return APIResponse.builder()
                .code(200)
                .info("get logger success!")
                .result(service.getAllLogger())
                .build();
    }
}
