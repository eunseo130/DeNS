import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Searchbigbox from './Searchbigbox';
import dummy from '../../db/data.json';
import TeamList from './TeamList';
import UserList from './UserList';
import AllList from './AllList';
import { searchTeamkeyword, searchUserkeyword } from '../../api/search';
import '../../css/search.css';
export default function Search() {

    const [teamList, setTeamList] = useState([]);
    const [userList, setUserList] = useState([]);
    const [totalList, setTotalList] = useState([]);
    const [nullSearch, setNullSearch] = useState(true);
    const initList = (data) => {
        if (data === 1) {
            setTeamList([]);
        } else {
            setUserList([]);
        }
    }

    //초기화
    useEffect(() => {
        searchTeamkeyword("", (response) => { setTeamList(response.data) }, (error) => { console.log(error) });
        searchUserkeyword("", (response) => { setUserList(response.data) }, (error) => { console.log(error) });
    }, []);
    
    const searchKeyword = (e) => {
        
        setNullSearch(true);
        searchTeamkeyword(e.target.value, (response) => { setTeamList(response.data) }, (error) => { initList(1) });
        searchUserkeyword(e.target.value, (response) => { setUserList(response.data) }, (error) => { initList(2) });
        setTotalList(...teamList, ...userList);
        
    }
    
    return (
        <>
        검색창 < input name = 'name' onKeyUp = { searchKeyword } ></input ><br></br>
        {nullSearch ? <div className = 'searchBig' >
            <div className='searchSmall'>
                <div >
                    <TeamList teamlist={ teamList}/>
                </div>
                <div >
                    <UserList userlist={userList} />
                </div>
            </div>
            </div >
                : <AllList data={totalList}/>}
            
        </>
        )
}