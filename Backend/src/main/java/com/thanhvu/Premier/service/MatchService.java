package com.thanhvu.Premier.service;

import com.thanhvu.Premier.dto.Request.MatchRequest;
import com.thanhvu.Premier.entity.Match;
import com.thanhvu.Premier.exceptions.AppException;
import com.thanhvu.Premier.exceptions.ErrorCode;
import com.thanhvu.Premier.mapper.MatchMapper;
import com.thanhvu.Premier.repository.MatchRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class MatchService {
    MatchMapper mp;
    MatchRepository rp;
    TeamService teamService;

    public List<Match> getAllMatches(){
        return rp.findAll();
    }

    public Match getMatch(long id){
        return rp.findById(id).orElseThrow(() -> new AppException(ErrorCode.NOT_FOUND));
    }

    @PreAuthorize("hasRole('ADMIN')")
    public Match updateMatch(long id, MatchRequest rq){
        Match match = getMatch(id);
        mp.updateMatch(rq, match);
        match.setHomeTeamId(teamService.getTeamById(rq.getHomeTeamId()));
        match.setAwayTeamId(teamService.getTeamById(rq.getAwayTeamId()));
        return rp.save(match);
    }
    @PreAuthorize("hasRole('ADMIN')")
    public Match createMatch(MatchRequest rq){
        Match match = mp.toMatch(rq);
        match.setHomeTeamId(teamService.getTeamById(rq.getHomeTeamId()));
        match.setAwayTeamId(teamService.getTeamById(rq.getAwayTeamId()));
        return rp.save(match);
    }
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteMatch(long id){
        rp.delete(getMatch(id));
    }
}
