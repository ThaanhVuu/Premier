package com.thanhvu.Premier.service;

import com.thanhvu.Premier.dto.Request.PlayerRequest;
import com.thanhvu.Premier.entity.Player;
import com.thanhvu.Premier.exceptions.AppException;
import com.thanhvu.Premier.exceptions.ErrorCode;
import com.thanhvu.Premier.mapper.PlayerMapper;
import com.thanhvu.Premier.repository.PlayerRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PlayerService {
    PlayerRepository rp;
    PlayerMapper mp;
    TeamService teamService;

    public List<Player> getAllPlayers(){
        return rp.findAll();
    }

    @PreAuthorize("hasRole('MANAGER')")
    public Player getPlayer(long id){
        return rp.findById(id).orElseThrow(() -> new AppException(ErrorCode.NOT_FOUND));
    }

    public List<Player> getPlayerByTeam(int teamId){
        return rp.getPlayerByTeam(teamId);
    }

    @PreAuthorize("hasRole('MANAGER')")
    public Player createPlayer(PlayerRequest rq){
        Player player = mp.toPlayer(rq);
        player.setTeam(teamService.getTeamById(rq.getTeamId()));
        return rp.save(player);
    }

    @PreAuthorize("hasRole('MANAGER')")
    public Player updatePlayer(int id, PlayerRequest rq){
        Player player = getPlayer(id);
        mp.updatePlayer(rq, player);
        player.setTeam(teamService.getTeamById(rq.getTeamId()));
        return rp.save(player);
    }

    @PreAuthorize("hasRole('MANAGER')")
    public String deletePlayer(long id){
        rp.delete(getPlayer(id));
        return "Delete player id: " + id;
    }
}
