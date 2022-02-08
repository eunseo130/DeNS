import React from "react";
import styled from "styled-components";
import { searchTeamID } from "../../api/search";

export default function TeamCard(props){
   // console.log(props.data);
    console.log(props.check);
    const check = () => {
        props.click(props.data.title,props.data.content);
        searchTeamID(props.check,(response) => {console.log(response.data)}, (error)=> {console.log(error)});
    }

    return(
        <TeamCarddg onClick={check}>
            <p>{props.data.title}</p>
            <p>{props.data.content}</p>
        </TeamCarddg>
    )
}
const TeamCarddg = styled.div`
    width: 500px;
    border: 1px solid black;
    &:hover{
        background: black;
    }
`