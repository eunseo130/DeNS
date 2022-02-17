import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { myteam } from '../../api/team';
import TeamLinkBox from '../dashboardComponent/TeamLinkBox';
import { Outlet, Link } from 'react-router-dom';
import { API_BASE_URL } from '../../config';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { store } from '../..';

export default function TeamIndex() {
  const [index, setIndex] = useState('');
  const token =  store.getState().user.token;
  const profileid = store.getState().user.profileid;
  // 팀 불러오기
  const authAxios = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        Authorization: `Bearer "${token}"`,
        withCredentials : true,
    }
  })

  const myteam = () => { 
    authAxios.get(`/team/myteam/${profileid}`).then(
    (response) => {
      setIndex(response.data);
      console.log(response.data);
    }
    ).catch((error) => {
      console.log("오류가 됨.", (error));
    });


  }
  useEffect(() => {
    myteam();
  },[]);

  // 팀 생성하기

  return (
    <div>
      <Link Link to={{pathname:`/auth/team/maketeam`}}>
        <button>팀 생성하기</button>
      </Link>
      <div>
        {index ? index.map((el, key) => {
          return (
            <TeamLinkBox 
              title={el.title}
              team_id={el.team_id}
              key={key}
            />
          )
        }) : null }

      </div>

      <Outlet/>
    </div>

  )

};