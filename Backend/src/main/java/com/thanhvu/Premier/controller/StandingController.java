package com.thanhvu.Premier.controller;

import com.thanhvu.Premier.dto.Request.StandingRequest;
import com.thanhvu.Premier.dto.Response.APIResponse;
import com.thanhvu.Premier.service.StandingService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/standing")
@RequiredArgsConstructor
public class StandingController {
    private final StandingService service;

    @GetMapping
    APIResponse<?> getAllStanding(){
        return APIResponse.builder()
                .code(200)
                .info("Get all standing successful!")
                .result(service.getAllStanding())
                .build();
    }

    @PostMapping
    APIResponse<?> createStanding(@RequestBody StandingRequest rq){
        return APIResponse.builder()
                .code(200)
                .info("Create standing successful!")
                .result(service.createStanding(rq))
                .build();
    }

    @PutMapping("{id}")
    APIResponse<?> updateStanding(@PathVariable long id, @RequestBody StandingRequest rq){
        return APIResponse.builder()
                .code(200)
                .info("Update standing successful!")
                .result(service.updateStanding(id, rq))
                .build();
    }

    @DeleteMapping("{id}")
    APIResponse<?> deleteStanding(@PathVariable long id){
        service.deleteStanding(id);
        return APIResponse.builder()
                .code(200)
                .info("Delete standing successful!")
                .build();
    }

    @GetMapping("/sorted")
    APIResponse<?> sorted(){
        return APIResponse.builder()
                .code(200)
                .info("Get sorted Standings successful!")
                .result(service.sortStandings())
                .build();
    }
}
