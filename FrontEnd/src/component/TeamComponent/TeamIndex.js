import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { myteam } from '../../api/team';
import TeamLinkBox from '../dashboardComponent/TeamLinkBox';
import { Outlet } from 'react-router-dom';

export default function TeamIndex() {
  const [index, setIndex] = useState('');
  useEffect(() => {
    myteam(
      6,
      (response) => {
        setIndex(response.data);
        console.log(response.data);
      },  
      (error) => {
       console.log("오류가 됨.", (error));
      });
  },[]);
  return (
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
      <Outlet/>
    </div>
  )

};