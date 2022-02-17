import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { store } from '../..';
import { makeMyTeam } from "../../api/team";
export default function CreateTeam() {

    const [teamName, setTeamName] = useState('');
    const [teamInfo, setTeamInfo] = useState('');

    const onChangeName = (e) => {
        setTeamName(e.target.value);
    };

    const onChangeInfo = (e) => {
        setTeamInfo(e.target.value);
    };
    
    const toSend = {
        title:teamName,
        content:teamInfo,
    }
    
    const profileId = store.getState().user.profileid;

    let navigate = useNavigate();
    const TeamMaker = () => {
        // e.preventDefault()
        makeMyTeam(
            profileId, toSend,
            (response) => {
            console.log("response!!!!!")
                console.log(response);
                navigate(`/auth/dashboard`,{ replace: true })
            },  
            (error) => {
            console.log("오류가 됨.", (error));
        });
    };

    return (
        <Square>
            <MakeBoxOut>
                <h3>팀 생성</h3>
                <MakeBoxIn>
                    팀 이름<input type="text" onKeyUp={onChangeName}/>
                    팀 소개<input type="text" onKeyUp={onChangeInfo}/>
                    <button onClick={TeamMaker}>팀 생성</button>
                </MakeBoxIn>
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