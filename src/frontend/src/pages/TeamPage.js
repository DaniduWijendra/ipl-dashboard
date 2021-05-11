import {React, useEffect, useState} from 'react'
import { MatchDetailCard } from '../components/MatchDetailCard'
import { MatchSmallCard } from '../components/MatchSmallCard'
import {useParams} from 'react-router-dom';

export const TeamPage = () => {
    //best practise to avoid spelling mistakes when exporting functional class
    
    const [team,setTeam] = useState({matches :[]});//team state is defined with empty array
    const {teamName} = useParams();
    useEffect(
        () =>
        {
           const fetchMatches = async () =>
           {
               const response = await fetch(`http://localhost:8080/team/${teamName}`);
               const data = await response.json(); //use await because respond send in promise
               setTeam(data);
           };
           fetchMatches();
        },[teamName]//call usereffect only when one of these changes should not load if doesn't change
    )
    if(!team || !team.teamName)
    {
        return <h1>Team Not found</h1>
    }
    return (
        <div className="TeamPage">
            <h1>{team.teamName}</h1>
            <MatchDetailCard teamName = {team.teamName} match={team.matches[0]}/>
            {team.matches.slice(1).map(match => <MatchSmallCard teamName =  {team.teamName} match= {match}/> )}
        {/*    from slice remove first one and then mapped*/}
        </div>
    )
}
