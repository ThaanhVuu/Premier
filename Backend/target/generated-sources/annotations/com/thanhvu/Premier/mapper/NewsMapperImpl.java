package com.thanhvu.Premier.mapper;

import com.thanhvu.Premier.dto.Request.NewsRequest;
import com.thanhvu.Premier.entity.News;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-05-20T11:34:16+0700",
    comments = "version: 1.6.2, compiler: Eclipse JDT (IDE) 3.42.0.v20250514-1000, environment: Java 21.0.7 (Eclipse Adoptium)"
)
@Component
public class NewsMapperImpl implements NewsMapper {

    @Override
    public News toNews(NewsRequest request) {
        if ( request == null ) {
            return null;
        }

        News.NewsBuilder news = News.builder();

        news.content( request.getContent() );
        news.imageURL( request.getImageURL() );
        news.publishDate( request.getPublishDate() );
        news.title( request.getTitle() );

        return news.build();
    }

    @Override
    public void updateNewsFromRequest(NewsRequest request, News news) {
        if ( request == null ) {
            return;
        }

        news.setContent( request.getContent() );
        news.setImageURL( request.getImageURL() );
        news.setPublishDate( request.getPublishDate() );
        news.setTitle( request.getTitle() );
    }
}
