package com.thanhvu.Premier.mapper;

import com.thanhvu.Premier.dto.Request.NewsRequest;
import com.thanhvu.Premier.entity.News;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-05-29T15:59:07+0700",
    comments = "version: 1.6.2, compiler: javac, environment: Java 21.0.7 (Oracle Corporation)"
)
@Component
public class NewsMapperImpl implements NewsMapper {

    @Override
    public News toNews(NewsRequest request) {
        if ( request == null ) {
            return null;
        }

        News.NewsBuilder news = News.builder();

        news.title( request.getTitle() );
        news.content( request.getContent() );
        news.publishDate( request.getPublishDate() );
        news.imageURL( request.getImageURL() );

        return news.build();
    }

    @Override
    public void updateNewsFromRequest(NewsRequest request, News news) {
        if ( request == null ) {
            return;
        }

        news.setTitle( request.getTitle() );
        news.setContent( request.getContent() );
        news.setPublishDate( request.getPublishDate() );
        news.setImageURL( request.getImageURL() );
    }
}
