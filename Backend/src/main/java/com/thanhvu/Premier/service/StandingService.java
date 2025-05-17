package com.thanhvu.Premier.service;

import com.thanhvu.Premier.dto.Request.StandingRequest;
import com.thanhvu.Premier.entity.Standing;
import com.thanhvu.Premier.exceptions.AppException;
import com.thanhvu.Premier.exceptions.ErrorCode;
import com.thanhvu.Premier.mapper.StandingMapper;
import com.thanhvu.Premier.repository.StandingRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class StandingService {
    StandingRepository rp;
    StandingMapper mp;
    TeamService team;

    public List<Standing> getAllStanding() {
        return rp.findAll();
    }

    @PreAuthorize("hasRole('ADMIN')")
    public Standing getStanding(long id) {
        return rp.findById(id).orElseThrow(() -> new AppException(ErrorCode.NOT_FOUND));
    }

    @PreAuthorize("hasRole('ADMIN')")
    public Standing createStanding(StandingRequest rq) {
        Standing standing = mp.toStanding(rq);
        standing.setTeam(team.getTeamById(rq.getTeamId()));
        return rp.save(standing);
    }

    @PreAuthorize("hasRole('ADMIN')")
    public Standing updateStanding(long id, StandingRequest rq) {
        Standing standing = getStanding(id);
        mp.updateToStanding(rq, standing);
        standing.setTeam(team.getTeamById(rq.getTeamId()));
        return rp.save(standing);
    }

    @PreAuthorize("hasRole('ADMIN')")
    public void deleteStanding(long id) {
        rp.delete(getStanding(id));
    }

    public List<Standing> sortStandings(){
        return rp.getAllSortedByPoints();
    }

//    static List<Standing> quickSort(List<Standing> list, int low, int high) {
//        if (low < high) {
//            int pi = partition(list, low, high);
//            quickSort(list, low, pi - 1);
//            quickSort(list, pi + 1, high);
//        }
//        return list;
//    }
//
//    //low la ptu dau arr. high la cuoi
//    static int partition(List<Standing> list, int low, int high) {
//        Standing pivot = list.get(high);
//        int i = low - 1;
//
//        for (int j = low; j < high; j++) {
//            if (list.get(j).getPoints() > pivot.getPoints()) { //SX giam dan
//                i++;
//                swap(list, i, j);
//            }
//        }
//
//        swap(list, i + 1, high);
//        return i + 1;
//    }
//
//    static void swap(List<Standing> list, int i, int j) {
//        Standing temp = list.get(i);
//        list.set(i, list.get(j));
//        list.set(j, temp);
//    }
}
