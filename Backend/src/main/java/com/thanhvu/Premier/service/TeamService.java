package com.thanhvu.Premier.service;

import com.thanhvu.Premier.dto.Request.TeamRequest;
import com.thanhvu.Premier.entity.Stadium;
import com.thanhvu.Premier.entity.Team;
import com.thanhvu.Premier.exceptions.AppException;
import com.thanhvu.Premier.exceptions.ErrorCode;
import com.thanhvu.Premier.mapper.TeamMapper;
import com.thanhvu.Premier.repository.StadiumsRepository;
import com.thanhvu.Premier.repository.TeamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TeamService {
    private final TeamRepository teamRepository;
    private final TeamMapper teamMapper;
    private final StadiumsRepository stadiumsRepository;

    @PreAuthorize("hasRole('ADMIN')")
    public Team createTeam(TeamRequest request){
        Team team = teamMapper.toTeam(request);

        Stadium stadium = stadiumsRepository.getStadiumByStadiumId(request.getStadiumId());
        team.setStadium(stadium);

        return teamRepository.save(team);
    }

    @PreAuthorize("hasRole('ADMIN')")
    public void deleteTeam(int id){
        if(!teamRepository.existsById(id)){
            throw new AppException(ErrorCode.NOT_FOUND);
        }
        teamRepository.deleteById(id);
    }

    public List<Team> getTeams(){
        return teamRepository.findAll();
    }

    public Team getTeamById(int id){
        if (!teamRepository.existsById(id)){
            throw new AppException(ErrorCode.NOT_FOUND);
        }
        return teamRepository.getTeamByTeamId(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    public Team updateClub(int id, TeamRequest request){
        Team team = getTeamById(id);
        teamMapper.updateToTeam(request, team);
        teamRepository.save(team);
        return teamRepository.save(team);
    }
}
