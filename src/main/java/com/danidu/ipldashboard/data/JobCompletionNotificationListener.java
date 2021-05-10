package com.danidu.ipldashboard.data;

import com.danidu.ipldashboard.model.Team;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.core.BatchStatus;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.listener.JobExecutionListenerSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.HashMap;
import java.util.Map;

@Component
public class JobCompletionNotificationListener extends JobExecutionListenerSupport {

    private static final Logger log = LoggerFactory.getLogger(JobCompletionNotificationListener.class);

    //jpa way of interacting with db
    private final EntityManager em;

    @Autowired
    public JobCompletionNotificationListener(EntityManager em) {
        this.em = em;
    }

//    Steam is Introduced in Java 8, the Stream API is used to process collections of objects. A stream is a sequence of objects that supports various methods which can be pipelined to produce the desired result.
//    A stream is not a data structure instead it takes input from the Collections,
//    Arrays or I/O channels.
    @Override
    @Transactional
    public void afterJob(JobExecution jobExecution) {
        if (jobExecution.getStatus() == BatchStatus.COMPLETED) {
            log.info("!!! JOB FINISHED! Time to verify the results");

            Map<String,Team> teamData = new HashMap<>();
            //jpql = jpa query language
            em.createQuery("select m.team1, count(m) from Match m group by m.team1", Object[].class)
                    .getResultList()
                    .stream()
                    .map(e -> new Team((String) e[0], (long) e[1]))
                    .forEach(team -> teamData.put(team.getTeamName(), team));
            em.createQuery("select m.team2, count(m) from Match m group by m.team2", Object[].class)
                    .getResultList()
                    .stream()
                    .forEach(e -> {
                        Team team = teamData.get((String) e[0]);
                        if(team!=null)team.setTotalMatches(team.getTotalMatches() + (long) e[1]);
                    });
            em.createQuery("select m.winner, count(m) from Match m group by m.winner", Object[].class)
                    .getResultList()
                    .stream()
                    .forEach(e -> {
                        Team team = teamData.get((String) e[0]);
                        if(team!=null) team.setTotalWins((long) e[1]);
                    });
            teamData.values().forEach(team -> em.persist(team));
            teamData.values().forEach(team -> System.out.println(team));
        }

    }


}
