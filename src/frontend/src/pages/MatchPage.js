import {React, useEffect, useState} from 'react'
import { MatchDetailCard } from '../components/MatchDetailCard'
import {useParams} from 'react-router-dom';
import {YearSelector} from "../components/YearSelector";

import './MatchPage.scss';
export const MatchPage = () => {
    const [matches,setMatches] = useState([]);//team state is defined with empty array
    const {teamName,year} = useParams();
    useEffect(
        () =>
        {
            const fetchMatches = async () =>
            {
                const response = await fetch(`http://localhost:8080/team/${teamName}/matches?year=${year}`);
                const data = await response.json(); //use await because respond send in promise
                setMatches(data);
            };
            fetchMatches();
        },[teamName,year]//call usereffect only when one of these changes should not load if doesn't change
    )

    return (
        <div className="MatchPage">
            <div className="year-selector">
                <h3>Select Year</h3>
                <YearSelector teamName={teamName}/>
            </div>
            <div>
            <h1 className="page-heading">{teamName} matches in {year}</h1>
            {
                matches.map(match => <MatchDetailCard teamName={teamName} match={match}/>)
            }
            {/*    from slice remove first one and then mapped*/}
            </div>
        </div>
    )
}
