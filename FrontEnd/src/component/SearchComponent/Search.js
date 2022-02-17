import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Searchbigbox from './Searchbigbox';
import dummy from '../../db/data.json';
import TeamList from './TeamList';
import UserList from './UserList';
import AllList from './AllList';
import Slider from 'react-slick';
import { searchTeamkeyword, searchUserkeyword } from '../../api/search';
import axios, { Axios } from 'axios';
import { API_BASE_URL } from '../../config';
import { useCookies } from 'react-cookie';
// import '../../css/search.css';
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
        searchTeamkeyword("", (response) => {
            console.log(response);
            setTeamList(response.data)
        }, (error) => { console.log(error) });
        searchUserkeyword("", (response) => { setUserList(response.data) }, (error) => { console.log(error) });
    }, []);
    const [cookies] = useCookies();
    const authAxios = axios.create({
        baseURL: API_BASE_URL,
        headers: {
          Authorization: `Bearer "${cookies.token}"`,
          withCredentials: true,
        },
      })
    const searchKeywordTest = (e) => {
        const user = authAxios.get(`/search/keyword/user`, {params : {keyword:e.target.value}}).then((res)=> {console.log(res) }).catch((err)=> { console.log(err)});
        const team = authAxios.get(`/search/keyword/team`, {params : {keyword:e.target.value}}).then((res)=> {console.log(res) }).catch((err)=> { console.log(err)});
        
        console.log(user);
        console.log(team);


    }
      const searchKeyword = (e) => {
          
          setNullSearch(true);
          
          
        searchTeamkeyword(e.target.value, (response) => { setTeamList(response.data) }, (error) => { initList(1) });
        searchUserkeyword(e.target.value, (response) => { setUserList(response.data) }, (error) => { initList(2) });
        // setTotalList(...teamList, ...userList);
        //title, content, profile_id
        //teammember(사람)
        //keyword
    }
    
    const settings = {
        speed: 200,
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1
    }

    return (
        <Container>
            검색창 < input name = 'name' onKeyUp = { searchKeyword } ></input><br></br>
            {
                nullSearch ?
                    <Slider {...settings} style={{display:'flex'}}>
                    <TeamList teamlist={ teamList}/>
                    <UserList userlist={userList} />
                </Slider>
                : <AllList data={totalList} />
            }
        </Container>
        )
}

const Container = styled.div`
display:flex;
flex-direction : column;
// background-color : #fde1e36b;

`
const SearchContainer = styled.div`
    display: flex;
`