package com.danidu.ipldashboard.controller;

import com.danidu.ipldashboard.model.Team;
import com.danidu.ipldashboard.repository.MatchRepository;
import com.danidu.ipldashboard.repository.TeamRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin // to avoid cross origin errors
//cross origin errors occurs when one domain page is requesting service from another domain.

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
