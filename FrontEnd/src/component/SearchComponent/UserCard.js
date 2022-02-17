import React, { useState, useEffect } from 'react'
import {  Image } from 'react-bootstrap'
import styled from 'styled-components'
import { API_BASE_URL } from '../../config'
import { searchprofileID } from '../../api/search'
import { Link, useNavigate } from 'react-router-dom'
import dd from './dd.png'
export default function UserCard(props){
    const check = () => {
        props.click(props.check,props.data.name,props.data.email);
        //searchprofileID(props.check,(response) => {console.log(response.data)}, (error)=> {console.log(error)});
    }

    return(
        <TeamCarddg onClick={check}>
            <UserCardTitle>{props.data.name}</UserCardTitle>
            <img src={dd } alt='test중입니다' align={"right"} width={'50px'} height={ '50px'}/>
            <UserCardContent>email: {props.data.email}</UserCardContent>
            <UserCardContent>position: {props.data.position}</UserCardContent>
            <UserCardContent>stack: {props.data.stack}</UserCardContent>
            
            {/* <p>{props.data.}</p> */}
        </TeamCarddg>
    )
}
const TeamCarddg = styled.div`
  dsiplay: flex;
  flex-direction: row;
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


const UserCardTitle = styled.h5`
    font-family : 'Cafe24Ssurround';
    color: #F46A72;
    margin-top: 10px;
    margin-left: 10px;
    margin-bottom: 3px;
`

const UserCardContent = styled.p`
    font-family : 'Cafe24SsurroundAir';
    font-size: 13px;
    color: grey
    margin-left: 10px;
    margin-bottom: -2px;
`
