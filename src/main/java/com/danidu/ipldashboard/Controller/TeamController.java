package com.danidu.ipldashboard.Controller;

import com.danidu.ipldashboard.model.Team;
import com.danidu.ipldashboard.repository.MatchRepository;
import com.danidu.ipldashboard.repository.TeamRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController

public class TeamController {
    private TeamRepository teamRepository;
    private MatchRepository matchRepository;

    public TeamController(TeamRepository teamRepository, MatchRepository matchRepository) {
        this.teamRepository = teamRepository;
        this.matchRepository = matchRepository;
    }


    //rest apis
    @GetMapping("/team/{teamName}")
    public Team getTeam(@PathVariable String teamName)//get value fom argument
    {
        Team team = this.teamRepository.findByTeamName(teamName);
        team.setMatches(matchRepository.findLatestMatchesByTeam(teamName,4));
        return team;
    }

}
