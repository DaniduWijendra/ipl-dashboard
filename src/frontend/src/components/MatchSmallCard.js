import {React} from 'react'
import {Link} from "react-router-dom";
import './MatchSmallCard.scss';

export const MatchSmallCard = ({teamName, match}) => {
    if (!match) return null;
    const otherTeam = match.team1 === teamName ? teamName = match.team2 : teamName = match.team1;
    const otherTeamRoute = `/teams/${teamName}`;
    const isMatchwon = teamName === match.winner;
    //best practise to avoid spelling mistakes when exporting functional class
    return (
        <div className={isMatchwon ? 'MatchSmallCard won-card' : 'MatchSmallCard loss-card'}>
            <span className="vs">vs</span>
            <h2><Link to={otherTeamRoute}>{otherTeam}</Link></h2>
            <p className="match-result">{match.winner} won by {match.resultMargin} {match.result}</p>
        </div>
    )
}
