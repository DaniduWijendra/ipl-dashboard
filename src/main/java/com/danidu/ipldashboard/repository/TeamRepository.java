package com.danidu.ipldashboard.repository;

import com.danidu.ipldashboard.model.Team;
import org.springframework.data.repository.CrudRepository;

public interface TeamRepository extends CrudRepository<Team,Long> {

    Team findByTeamName(String teamName);
}
