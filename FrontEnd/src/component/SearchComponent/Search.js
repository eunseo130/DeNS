import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Searchbigbox from './Searchbigbox';
import dummy from '../../db/data.json';
import TeamList from './TeamList';
import UserList from './UserList';
import { searchTeamkeyword, searchUserkeyword } from '../../api/search';
export default function Search() {

    const [teamList, setTeamList] = useState([]);
    const [userList, setUserList] = useState([]);

    const initList = (data) => {
        if(data === 1){

            setTeamList([]);
        }else{
            setUserList([]);
        }
    }

    const searchKeyword = (e) => {
        searchTeamkeyword(e.target.value,(response) => { setTeamList(response.data)}, (error) => { initList(1)});
        searchUserkeyword(e.target.value,(response) => { setUserList(response.data)}, (error) => { initList(2)});
    }



    return (
        <>
            검색창<input name='name' onKeyUp={searchKeyword}></input><br></br>
            <TeamList teamlist={ teamList}/>
            <UserList userlist={ userList}/>
        </>
    )
}

const Contain = styled.div`
    background-color:white;
    text-align: center;
    flexDirection:row;
    display:inline-block;
    width:800px;
    height:700px
    margin-top:50px;
`