import React, { useEffect, useState } from 'react';
import TeamCard from './TeamCard';

export default function TeamList( props) {
    const [temp, setTemp] = useState([]);

    useEffect(() => {
        console.log("tsettestset");
        console.log(props.teamlist);
        setTemp(props.teamlist);
    });
    

    return (
        <ul>
            {
                temp.map((data) => { return <TeamCard check={data.team_id} data= {data}/>})
            }
        </ul>
    )
}