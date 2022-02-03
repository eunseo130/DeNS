import React, { useEffect, useState } from 'react';

export default function TeamList( props) {
    const [temp, setTemp] = useState([]);

    useEffect(() => {
        setTemp(props.teamlist);
    },[temp]);
    
    const teaminfo = temp.map((data) => (<p key={data.id}>{data.title }</p>));
    return (
        <ul>
            {teaminfo}
        </ul>
    )
}