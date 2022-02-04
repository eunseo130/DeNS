import React from "react";
import styled from "styled-components";
import { searchTeamID } from "../../api/search";

export default function TeamCard(props){
    console.log(props.data);
    
    const check = () => {
        searchTeamID(props.check,(response) => {console.log(response.data)}, (error)=> {console.log(error)});
    }

    return(
        <TeamCarddg onClick={check}>
            <p>{props.data.title}</p>
            <p>{props.data.content}</p>
            <hr/>
        </TeamCarddg>
    )
}
const TeamCarddg = styled.div`
    &:hover{
        background: black;
    }
`