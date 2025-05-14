package com.thanhvu.Premier.controller;

import com.thanhvu.Premier.dto.Request.NewsRequest;
import com.thanhvu.Premier.dto.Response.APIResponse;
import com.thanhvu.Premier.service.NewsService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/news")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class NewsController {
    NewsService newsService;

    @GetMapping("/{id}")
    APIResponse<?> getANews(@PathVariable int id){
        return APIResponse.builder()
                .code(200)
                .result(newsService.getANews(id))
                .build();
    }

    @PostMapping
    APIResponse<?> createNews(@RequestBody NewsRequest request){
        return APIResponse.builder()
                .code(200)
                .info("Create new News successful")
                .result(newsService.createNews(request))
                .build();
    }

    @GetMapping
    APIResponse<?> getAllNews(){
        return APIResponse.builder()
                .code(200)
                .info("Get all news successful")
                .result(newsService.getAllNews())
                .build();
    }

    @DeleteMapping("/{id}")
    APIResponse<?> deleteNews(@PathVariable int id){
        newsService.deleteNews(id);
        return APIResponse.builder()
                .code(200)
                .info("Delete news successful!")
                .build();
    }

    @PutMapping("/{id}")
    APIResponse<?> updateNews(@PathVariable int id, @RequestBody NewsRequest request){
        return APIResponse.builder()
                .code(200)
                .info("Update news successful!")
                .result(newsService.updateNews(id, request))
                .build();
    }

    @GetMapping("/newsStats")
    APIResponse<?> getStats(){
        Map<String,Long> stats = new HashMap<>();
        stats.put("totalNews", newsService.countTotalNews());
        stats.put("totalViews", newsService.getTotalViews());
        stats.put("newsInDay", newsService.countTotalNews());
//        stats.put("viewInDay", newsService.countViewInDay());
        return APIResponse.builder()
                .code(200)
                .result(stats)
                .build();
    }
}
