package com.thanhvu.Premier.service;

import com.thanhvu.Premier.dto.Request.MatchEventRequest;
import com.thanhvu.Premier.entity.MatchEvent;
import com.thanhvu.Premier.exceptions.AppException;
import com.thanhvu.Premier.exceptions.ErrorCode;
import com.thanhvu.Premier.mapper.MatchEventMapper;
import com.thanhvu.Premier.repository.MatchEventRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class MatchEventsService {
    MatchEventMapper mp;
    MatchEventRepository rp;
    PlayerService playerService;
    MatchService matchService;

    public List<MatchEvent> getAllMatchEvent(){
        return rp.findAll();
    }

    public MatchEvent getMatchEvent(long id){
        return rp.findById(id).orElseThrow(() -> new AppException(ErrorCode.NOT_FOUND));
    }

    public List<MatchEvent> getMatchEventByMatchId(long id){
        return rp.getMatchEventByMatch(id);
    }

    @PreAuthorize("hasRole('MANAGER')")
    public MatchEvent createMatch(MatchEventRequest rq){
        MatchEvent matchEvent = mp.toMatch(rq);
        matchEvent.setMatch(matchService.getMatch(rq.getMatchId()));
        matchEvent.setPlayer(playerService.getPlayer(rq.getPlayerId()));
        return rp.save(matchEvent);
    }
    @PreAuthorize("hasRole('MANAGER')")
    public MatchEvent updateMatchEvents(long id, MatchEventRequest rq){
        MatchEvent matchEvent = getMatchEvent(id);
        mp.updateToMatchEvent(rq, matchEvent);
        matchEvent.setMatch(matchService.getMatch(rq.getMatchId()));
        matchEvent.setPlayer(playerService.getPlayer(rq.getPlayerId()));
        return rp.save(matchEvent);
    }

    @PreAuthorize("hasRole('MANAGER')")
    public String deleteMatchEvents(long id){
        rp.delete(getMatchEvent(id));
        return "Deleted MatchEvent with id "+id;
    }
}
