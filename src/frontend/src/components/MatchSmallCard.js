import {React} from 'react'
import {Link} from "react-router-dom";

export const MatchSmallCard = ({teamName,match}) => {
    if(!match) return null;
    const otherTeam = match.team1 === teamName ? teamName = match.team2 :teamName = match.team1;
    const otherTeamRoute = `/teams/${teamName}`;
    //best practise to avoid spelling mistakes when exporting functional class
    return (
        <div className="MatchSmallCard">
            <h3>vs <Link to = {otherTeamRoute}>{otherTeam}</Link></h3>
            <p>{match.winner} won by {match.resultMargin} {match.result}</p>
        </div>
    )
}
