import {React} from 'react'
import {Link} from "react-router-dom";

import './MatchDetailCard.scss';

export const MatchDetailCard = ({teamName, match}) => {
    if (!match) return null;
    const otherTeam = match.team1 === teamName ? teamName = match.team2 : teamName = match.team1;
    const otherTeamRoute = `/teams/${teamName}`;
    const isMatchwon = teamName === match.winner;
    //best practise to avoid spelling mistakes when exporting functional class
    return (
        <div className={isMatchwon ? 'MatchDetailCard won-card' : 'MatchDetailCard loss-card'}>
            <div>
                <span className="vs">vs</span>
                <h2><Link to={otherTeamRoute}>{otherTeam}</Link></h2>
                <h3 className="match-date">On {match.date}</h3>
                <h3 className="match-venue">At {match.venue}</h3>
                <h3 className="match-result">{match.winner} won by {match.resultMargin} {match.result}</h3>
            </div>
            <div className="additional-details">
                <h3>First Innings</h3>
                <p>{match.team1}</p>
                <h3>Second Innings</h3>
                <p>{match.team2}</p>
                <h3>Man of the Match</h3>
                <p>{match.playerOfMatch}</p>
                <h3>Umpires</h3>
                <p>{match.umpire1}, {match.umpire2}</p>
            </div>

        </div>
    )
}
