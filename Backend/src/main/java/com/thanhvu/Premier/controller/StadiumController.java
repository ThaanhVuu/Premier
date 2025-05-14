package com.thanhvu.Premier.controller;

import com.thanhvu.Premier.dto.Response.APIResponse;
import com.thanhvu.Premier.dto.Request.StadiumRequest;
import com.thanhvu.Premier.entity.Stadium;
import com.thanhvu.Premier.service.StadiumService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stadium")
@RequiredArgsConstructor
public class StadiumController {
    final private StadiumService stadiumService;

    @PostMapping
    APIResponse<Stadium> createStadium(@RequestBody @Valid StadiumRequest request){
        APIResponse<Stadium> apiResponse = new APIResponse<>();
        apiResponse.setCode(200);
        apiResponse.setInfo("Create stadium successfully");
        apiResponse.setResult(stadiumService.createStadium(request));
        return apiResponse;
    }

    @GetMapping
    APIResponse getAllStadiums(){
        APIResponse<List<Stadium>> apiResponse = new APIResponse<>();
        apiResponse.setCode(200);
        apiResponse.setInfo("Get list stadiums success");
        apiResponse.setResult(stadiumService.getAllStadiums());
        return apiResponse;
    }

    @PutMapping("{id}")
    APIResponse updateStadium(@PathVariable int id,@RequestBody StadiumRequest request){
        APIResponse<Stadium> apiResponse = new APIResponse<>();
        apiResponse.setCode(200);
        apiResponse.setInfo("Update stadium successful!");
        apiResponse.setResult(stadiumService.updateStadium(id, request));
        return apiResponse;
    }

    @DeleteMapping("{id}")
    APIResponse deleteId(@PathVariable int id){
        APIResponse<String> apiResponse = new APIResponse<>();
        apiResponse.setCode(200);
        apiResponse.setInfo("Delete stadium successful!");
        apiResponse.setResult("Delete stadium where id = "+id);
        stadiumService.deleteStadium(id);
        return apiResponse;
    }

    @GetMapping("/count")
    Long countStadium(){
        return stadiumService.countStadium();
    }

    @GetMapping("/unassigned")
    APIResponse getStadiumUnAssigned(){
        APIResponse<List<Stadium>> apiResponse = new APIResponse<>();
        return apiResponse.builder()
                .code(200)
                .info("Get stadium unAssigned successful!")
                .result(stadiumService.getUnassignedStadiums())
                .build();
    }
}
