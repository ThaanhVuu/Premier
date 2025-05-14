package com.thanhvu.Premier.controller;

import com.thanhvu.Premier.dto.Response.APIResponse;
import com.thanhvu.Premier.dto.Request.TeamRequest;
import com.thanhvu.Premier.entity.Team;
import com.thanhvu.Premier.service.TeamService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/team")
@RequiredArgsConstructor
public class TeamController {
    private final TeamService teamService;

    @PostMapping
    APIResponse<Team> createTeam(@RequestBody TeamRequest request){
        APIResponse<Team> apiResponse = new APIResponse<>();
        apiResponse.setCode(200);
        apiResponse.setInfo("Create new team successful!");
        apiResponse.setResult(teamService.createTeam(request));
        return apiResponse;
    }

    @PutMapping("{id}")
    APIResponse<Team> updateTeam(@PathVariable int id, @RequestBody TeamRequest request){
        APIResponse<Team> apiResponse = new APIResponse<>();
        apiResponse.setCode(200);
        apiResponse.setInfo("Update team successful!");
        apiResponse.setResult(teamService.updateClub(id,request));
        return apiResponse;
    }

    @DeleteMapping("{id}")
    APIResponse<String> deleteTeam(@PathVariable int id){
        APIResponse<String> apiResponse = new APIResponse<>();
        apiResponse.setCode(200);
        apiResponse.setResult("Delete team with id = "+ id);
        apiResponse.setInfo("Delete team successful!");
        teamService.deleteTeam(id);
        return apiResponse;
    }

    @GetMapping
    APIResponse<List<Team>> getTeams(){
        APIResponse<List<Team>> apiResponse = new APIResponse<>();
        apiResponse.setCode(200);
        apiResponse.setInfo("Get list team successful!");
        apiResponse.setResult(teamService.getTeams());
        return apiResponse;
    }
}
