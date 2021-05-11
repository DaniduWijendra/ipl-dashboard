import {React} from 'react'
import {Link} from "react-router-dom";

export const MatchDetailCard = ({teamName,match}) => {
    if(!match) return null;
    const otherTeam = match.team1 === teamName ? teamName = match.team2 :teamName = match.team1;
    const otherTeamRoute = `/teams/${teamName}`;
    //best practise to avoid spelling mistakes when exporting functional class
    return (
        <div className="MatchDetailCard">
            <h2>Match Details</h2>
            <h4>Latest Matches</h4>
            <h2>vs <Link to = {otherTeamRoute}>{otherTeam}</Link></h2>
            <h3>On {match.date}</h3>
            <h3>At {match.venue}</h3>
            <h3>{match.winner} won by {match.resultMargin} {match.result}</h3>


        </div>
    )
}
