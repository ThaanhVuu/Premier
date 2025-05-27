package com.thanhvu.Premier.service;

import com.thanhvu.Premier.dto.Request.NewsRequest;
import com.thanhvu.Premier.entity.News;
import com.thanhvu.Premier.entity.User;
import com.thanhvu.Premier.exceptions.AppException;
import com.thanhvu.Premier.exceptions.ErrorCode;
import com.thanhvu.Premier.mapper.NewsMapper;
import com.thanhvu.Premier.repository.NewsRepository;
import com.thanhvu.Premier.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class NewsService {
    NewsRepository newsRepo;
    NewsMapper mapper;
    UserRepository userRepo;

    @PreAuthorize("hasRole('MANAGER')")
    public News createNews(NewsRequest request) {
        News news = mapper.toNews(request);
        news.setViews(1);
        User author = userRepo.findById(request.getAuthorId())
                .orElseThrow(() -> new AppException(ErrorCode.NOT_FOUND));

        news.setAuthor(author);
        return newsRepo.save(news);
    }

    public News getANews(int id) {
        System.out.println("🔍 Trying to find News with ID: " + id);
        Optional<News> optionalNews = newsRepo.findById(id);
        if (optionalNews.isEmpty()) {
            System.out.println("❌ News with ID " + id + " not found in database.");
        } else {
            System.out.println("✅ Found news: " + optionalNews.get());
        }
        return newsRepo.findById(id).orElseThrow(() -> new AppException(ErrorCode.NOT_FOUND));
    }

    public List<News> getAllNews(){
        return newsRepo.findAll();
    }

    @PreAuthorize("hasRole('MANAGER')")
    public void deleteNews(int id){
        News news = getANews(id);
        newsRepo.delete(news);
    }
    @PreAuthorize("hasRole('MANAGER')")
    public News updateNews(int id, NewsRequest request){
        News news = getANews(id);
        mapper.updateNewsFromRequest(request, news);
        User author = userRepo.findById(request.getAuthorId())
                .orElseThrow(() -> new AppException(ErrorCode.NOT_FOUND));
        news.setAuthor(author);
        return newsRepo.save(news);
    }

    @PreAuthorize("hasRole('MANAGER')")
    public long countTotalNews(){
        return newsRepo.count();
    }

    @PreAuthorize("hasRole('MANAGER')")
    public long getTotalViews(){
        return newsRepo.getTotalView();
    }

    @PreAuthorize("hasRole('MANAGER')")
    public long countNewsInDay(){
        LocalDate today = LocalDate.now();
        LocalDateTime startOfDay = today.atStartOfDay(); // 00:00
        LocalDateTime endOfDay = today.atTime(LocalTime.MAX); // 23:59:59.999999999

        return newsRepo.countByPublishDateBetween(startOfDay, endOfDay);
    }
//    @PreAuthorize("hasRole('ADMIN')")
//    public long countViewInDay(){
//        LocalDate today = LocalDate.now();
//        LocalDateTime startOfDay = today.atStartOfDay(); // 00:00
//        LocalDateTime endOfDay = today.atTime(LocalTime.MAX); // 23:59:59.999999999
//
////        return newsRepo.countTotalViewsInDay(startOfDay, endOfDay);
//    }
}