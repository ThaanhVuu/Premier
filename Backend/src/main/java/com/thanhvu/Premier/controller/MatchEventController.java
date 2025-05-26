package com.thanhvu.Premier.controller;

import com.thanhvu.Premier.dto.Request.MatchEventRequest;
import com.thanhvu.Premier.dto.Response.APIResponse;
import com.thanhvu.Premier.service.MatchEventsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/matchEvent")
@RequiredArgsConstructor
public class MatchEventController {
    final MatchEventsService service;

    @PostMapping
    APIResponse<?> createMatchEvents(@RequestBody MatchEventRequest rq){
        return APIResponse.builder()
                .code(200)
                .info("Create Match-Events successful!")
                .result(service.createMatch(rq))
                .build();
    }

    @PutMapping("{id}")
    APIResponse<?> updateMatchEvents(@PathVariable long id, @RequestBody MatchEventRequest matchEventRequest){
        return APIResponse.builder()
                .code(200)
                .info("Update match-events successful")
                .result(service.updateMatchEvents(id, matchEventRequest))
                .build();
    }

    @GetMapping
    APIResponse<?> getAllMatchEvents(){
        return APIResponse.builder()
                .code(200)
                .info("Get all Match-Events Successful!")
                .result(service.getAllMatchEvent())
                .build();
    }

    @DeleteMapping("{id}")
    APIResponse<?> deleteMatchEvents(@PathVariable long id){
        return APIResponse.builder()
                .code(200)
                .info("Delete MatchEvents successful!")
                .result(service.deleteMatchEvents(id))
                .build();
    }
}
