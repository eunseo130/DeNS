import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { makeMyTeam } from "../../api/team";

export default function MakeTeam() {

    const [teamName, setTeamName] = useState('');
    const [teamInfo, setTeamInfo] = useState('');

    const onChangeName = (e) => {
        setTeamName(e.target.value);
    };

    const onChangeInfo = (e) => {
        setTeamInfo(e.target.value)
    };

    const TeamMaker = (e) => {
        e.preventDefault()
    };
    const toSend = [teamName, teamInfo]

    useEffect(() => {
        makeMyTeam(1,
        (response) => {
        console.log(response);
        },  
        (error) => {
        console.log("오류가 됨.", (error));
    });
    }, []);;

    return (
        <Square>
            <MakeBoxOut>
                <h3>팀 생성</h3>
                <form action="">
                    <MakeBoxIn>
                        팀 이름<input type="text" onChange={onChangeName}/>
                        팀 소개<input type="text" onChange={onChangeInfo}/>
                        <button onClick={TeamMaker}>팀 생성</button>
                    </MakeBoxIn>
                </form>
            </MakeBoxOut>
        </Square>
    );
}

const Square = styled.div`
position: absolute;
top: 35%;
left: 50%;
transform:translate(-50%, -50%);
`
const MakeBoxOut = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`
const MakeBoxIn = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`