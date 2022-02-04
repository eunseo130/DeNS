import React, { useEffect, useState } from 'react';
import UserCard from './UserCard';
export default function UserList(props) {
    const [temp, setTemp] = useState([]);
    
    useEffect(() => {
        setTemp(props.userlist);
    });
    return (
        <ul>
            {temp.map((data) => {return <UserCard check= {data.profile_id} data={data}/>}) }
        </ul>
    )
}
