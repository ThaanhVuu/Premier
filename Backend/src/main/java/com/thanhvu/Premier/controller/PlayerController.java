package com.thanhvu.Premier.controller;

import com.thanhvu.Premier.dto.Request.PlayerRequest;
import com.thanhvu.Premier.dto.Response.APIResponse;
import com.thanhvu.Premier.service.PlayerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/player")
@RequiredArgsConstructor
public class PlayerController {
    private final PlayerService service;

    @GetMapping
    APIResponse<?> getAllPlayers(){
        return APIResponse.builder()
                .code(200)
                .info("Get player successful!")
                .result(service.getAllPlayers())
                .build();
    }

    @PostMapping
    APIResponse<?> createPlayer(@RequestBody PlayerRequest rq){
        return APIResponse.builder()
                .code(200)
                .info("Create new player successful!")
                .result(service.createPlayer(rq))
                .build();
    }

    @PutMapping("{id}")
    APIResponse<?> updatePlayer(@PathVariable int id, @RequestBody PlayerRequest rq){
        return APIResponse.builder()
                .code(200)
                .info("Update player successful!")
                .result(service.updatePlayer(id, rq))
                .build();
    }

    @DeleteMapping("{id}")
    APIResponse<?> deletePlayer(@PathVariable long id){
        return APIResponse.builder()
                .code(200)
                .info("Delete successful!")
                .result(service.deletePlayer(id))
                .build();
    }

    @GetMapping("{id}")
    APIResponse<?> getPlayerByTeam(@PathVariable int id){
        return APIResponse.builder()
                .code(200)
                .info("Success get player by team")
                .result(service.getPlayerByTeam(id))
                .build();
    }
}
