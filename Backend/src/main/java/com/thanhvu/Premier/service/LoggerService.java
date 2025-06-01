package com.thanhvu.Premier.service;

import com.thanhvu.Premier.entity.Logger;
import com.thanhvu.Premier.repository.LoggerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LoggerService {
    private final LoggerRepository rp;

    @PostAuthorize("hasRole('ADMIN')")
    public List<Logger> getAllLogger(){
        return rp.findAll();
    }
}
