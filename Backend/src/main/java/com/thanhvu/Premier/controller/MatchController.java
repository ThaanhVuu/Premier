package com.thanhvu.Premier.controller;

import com.thanhvu.Premier.dto.Request.MatchRequest;
import com.thanhvu.Premier.dto.Response.APIResponse;
import com.thanhvu.Premier.service.MatchService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/match")
public class MatchController {
    MatchService sv;

    @GetMapping
    APIResponse<?> getAllmatches(){
        return APIResponse.builder()
                .code(200)
                .info("Get all matches successful!")
                .result(sv.getAllMatches())
                .build();
    }

    @PostMapping
    APIResponse<?> createMatch(@RequestBody MatchRequest rq){
        return APIResponse.builder()
                .code(200)
                .info("Create new match successful!")
                .result(sv.createMatch(rq))
                .build();
    }

    @PutMapping("{id}")
    APIResponse<?> updateMatch(@PathVariable long id, @RequestBody MatchRequest rq){
        return APIResponse.builder()
                .code(200)
                .info("Update match successful!")
                .result(sv.updateMatch(id, rq))
                .build();
    }

    @DeleteMapping("{id}")
    APIResponse<?> deleteMatch(@PathVariable long id){
        sv.deleteMatch(id);
        return APIResponse.builder()
                .code(200)
                .info("Delete match successful!")
                .build();
    }
}
