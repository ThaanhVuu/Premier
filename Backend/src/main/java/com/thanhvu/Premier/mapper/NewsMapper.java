package com.thanhvu.Premier.mapper;

import com.thanhvu.Premier.dto.Request.NewsRequest;
import com.thanhvu.Premier.entity.News;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface NewsMapper {
    @Mapping(target = "newsId", ignore = true)
    News toNews(NewsRequest request);
    void updateNewsFromRequest(NewsRequest request, @MappingTarget News news);
}
