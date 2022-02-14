import React, { useState } from 'react';
import styled from "styled-components";
import {Link} from "react-router-dom";

export default function Head() {
    const [drop,setDrop] = useState(false);


    const clickCheck = () => {
        setDrop(!drop);
        console.log(drop);
    }

    return (
        <>
            <span>채널명</span>
            <Profileimage onClick={clickCheck}>check</Profileimage><br/><br/><br/>
            {drop ? <ProfileDrop><Link to="/auth/profile">프로필가기</Link></ProfileDrop> : ''}
        </>
    );
}

const Profileimage = styled.span`
  position: absolute;   
  background-color: rgba(244,106,114,1);
  left: 95vw;
`;

const ProfileDrop = styled.div`
  position: absolute;   
  background-color: rgba(244,106,114,1);
  left: 95vw;
`;
