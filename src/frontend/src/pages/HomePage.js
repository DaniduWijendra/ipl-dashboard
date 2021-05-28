import {React, useEffect, useState} from 'react'

import './HomePage.scss';
import {TeamTile} from "../components/TeamTile";

export const HomePage = () => {
    const [teams, setTeams] = useState([]);//team state is defined with empty array
    useEffect(
        () => {
            const fetchTeams = async () => {
                const response = await fetch(`${process.env.REACT_APP_API_ROOT_URL}/team`);
                const data = await response.json(); //use await because respond send in promise
                setTeams(data);
            };
            fetchTeams();
        }, []//call usereffect only when one of these changes should not load if doesn't change
    )
    return (
        <div className="HomePage">
            <div className="header-section">
                <h1 className="app-name">My IPL Dashboard</h1>
            </div>
            <div className="team-grid">
                {teams.map(team => <TeamTile key={team.id} teamName={team.teamName}/>)}
            </div>
        </div>
    )
}
