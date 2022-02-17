import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { myteam } from '../../api/team';
import TeamLinkBox from '../dashboardComponent/TeamLinkBox';
import { Outlet, Link } from 'react-router-dom';

export default function TeamIndex() {
  const [index, setIndex] = useState('');

  // 팀 불러오기
  useEffect(() => {
    myteam(
      88,
      (response) => {
        setIndex(response.data);
        console.log(response.data);
      },  
      (error) => {
       console.log("오류가 됨.", (error));
      });
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