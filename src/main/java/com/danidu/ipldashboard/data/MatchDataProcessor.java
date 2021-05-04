package com.danidu.ipldashboard.data;

import com.danidu.ipldashboard.model.Match;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.item.ItemProcessor;

import java.time.LocalDate;

//get data in processor and return output.
public class MatchDataProcessor implements ItemProcessor<MatchInput, Match> {

    private static final Logger log = LoggerFactory.getLogger(MatchDataProcessor.class);

        @Override
        public Match process(final MatchInput matchInput) throws Exception {
           Match match = new Match();
           match.setId(Long.parseLong(matchInput.getId()));
           match.setCity(matchInput.getCity());
           match.setDate(LocalDate.parse(matchInput.getDate()));
           match.setPlayerOfMatch(matchInput.getPlayer_of_match());
           match.setVenue(matchInput.getVenue());
           String firstInnigsTeam,secondInningsTeam;
           //set team1 and 2 depending on toss order
           if("bat".equals(matchInput.getToss_decision()))
           {
               firstInnigsTeam = matchInput.getToss_winner();
               secondInningsTeam = matchInput.getToss_winner().equals(matchInput.getTeam1())
                       ?matchInput.getTeam2():matchInput.getTeam1();
           }
           else
           {
               secondInningsTeam = match.getTossWinner();
               firstInnigsTeam = matchInput.getToss_winner().equals(matchInput.getTeam1())
                       ?matchInput.getTeam2():matchInput.getTeam1();
           }
           match.setTeam1(firstInnigsTeam);
           match.setTeam2(secondInningsTeam);
           match.setTossWinner(matchInput.getToss_winner());
           match.setTossDecision(matchInput.getToss_decision());
           match.setWinner(matchInput.getWinner());
           match.setResult(matchInput.getResult());
           match.setResultMargin(matchInput.getResult_margin());
           match.setUmpire1(matchInput.getUmpire1());
           match.setUmpire2(matchInput.getUmpire2());
           return match;
        }

    }

