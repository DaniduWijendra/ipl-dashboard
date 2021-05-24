import {React, useEffect, useState} from 'react'
import {MatchDetailCard} from '../components/MatchDetailCard'
import {MatchSmallCard} from '../components/MatchSmallCard'
import {Link, useParams} from 'react-router-dom';
import {PieChart} from 'react-minimal-pie-chart';

import './TeamPage.scss';

export const TeamPage = () => {
    //best practise to avoid spelling mistakes when exporting functional class
    //use effect like axios
    const [team, setTeam] = useState({matches: []});//team state is defined with empty array
    const {teamName} = useParams();
    useEffect(
        () => {
            const fetchMatches = async () => {
                const response = await fetch(`http://localhost:8080/team/${teamName}`);
                const data = await response.json(); //use await because respond send in promise
                setTeam(data);
            };
            fetchMatches();
        }, [teamName]//call usereffect only when one of these changes should not load if doesn't change
    )
    if (!team || !team.teamName) {
        return <h1>Team Not found</h1>
    }
    return (
        <div className="TeamPage">
            <div className="team-name-section"><h1 className="team-name">{team.teamName}</h1></div>
            <div className="win-loss-section">
                <h3>Wins/Losses</h3>
                <PieChart
                    data={[
                        {title: 'Wins', value: team.totalWins, color: '#20b054'},
                        {title: 'Losses', value: team.totalMatches - team.totalWins, color: '#f9394d'},

                    ]}
                />
            </div>
            <div className="match-detail-section">
                <h3>Latest Matches</h3>
                <MatchDetailCard teamName={team.teamName} match={team.matches[0]}/></div>
            {team.matches.slice(1).map(match => <MatchSmallCard teamName={team.teamName} match={match}/>)}
            {/*    from slice remove first one and then mapped*/}
            <div className="more-link">
                <Link to={`/teams/${teamName}/matches/${process.env.REACT_APP_DATA_END_YEAR}`}>More..</Link>
            </div>
        </div>
    )
}
