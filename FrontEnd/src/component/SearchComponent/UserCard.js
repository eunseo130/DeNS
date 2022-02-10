import React from "react";
import styled from "styled-components";
import { searchprofileID } from "../../api/search";
import dd from './dd.png'
export default function UserCard(props){
    const check = () => {
        props.click(props.check,props.data.name,props.data.email);
        //searchprofileID(props.check,(response) => {console.log(response.data)}, (error)=> {console.log(error)});
    }

    return(
        <TeamCarddg onClick={check}>
            <p>{props.data.name}</p>
            <img src={dd } alt='test중입니다' width={'50px'} height={ '50px'}/>
            <p>{props.data.email}</p>
            <p>{props.data.position}</p>
            <p>{props.data.stack}</p>
            {/* <p>{props.data.}</p> */}
        </TeamCarddg>
    )
}
const TeamCarddg = styled.div`
    dsiplay : flex;
    flex-direction : row;
    background-color: white;
    // flex-basis: 100px;
    height: 100px;
    min-height: 100px;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 5px;
    margin-bottom: 5px;

    box-shadow : 0px 30px 40px pink;
    border-radius: 10px;
    &:hover{
        background: white;
    }
`