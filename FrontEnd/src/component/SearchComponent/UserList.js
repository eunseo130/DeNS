import React, { useEffect, useState } from 'react';

export default function UserList(props) {
    const [temp, setTemp] = useState([]);
    
    useEffect(() => {
        setTemp(props.userlist);
    });

    const userinfo = temp.map((data) => (<p key={data.email}>{data.name }</p> ))
    return (
        <ul>
            {userinfo }
        </ul>
    )
}
