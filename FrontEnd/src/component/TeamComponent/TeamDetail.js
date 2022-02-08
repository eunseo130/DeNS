import React, { useEffect, useState } from 'react';
// import { detail } from '../../api/team';
import styled from "styled-components";
import { useLocation } from 'react-router-dom';

export default function TeamDetail(props) {
    // const [teamInfo, setTeamInfo] = useState('');
    const hello = useLocation();
    // const title = 
    console.log(hello)
    // console.log(props)
    // useEffect(() => {
    //     detail(
    //         (response) => {
    //             console.log(response);
    //             // setTeamInfo(response.data);
    //         },             
    //         (error) => {
    //             console.log("오류가 됨.", (error));
    //         });
    //   });
    return (
        <TeamDetails>
            <h2>{props.id}팀페이지입니다.</h2>
        </TeamDetails>
    )
}
const TeamDetails = styled.div`
    display: grid;
    grid-template columns: 200px;
`