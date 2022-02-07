import React, { useEffect } from "react";
import styled from "styled-components";
import TeamLink from "./TeamLink";
import Message from "./Message";
import TeamList from "./TeamList"
import { myteam } from "../../api/test";
import { useState } from "react";

export default function Dashboard() {
    // 배경 스타일
      useEffect(() => {
        myteam("안녕하세여",
            (response) => {
                console.log(response);
        },  
        (error) => {
            console.log("오류가 됨.", (error));
        });
    });

    // 팀 페이지로 들어가서 setItem하고.. TeamList에서 getItem하고...
    const jsonLocalStorage = {
      setItem: (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
      },
      getItem: (key) => {
        return JSON.parse(localStorage.getItem(key));
      },
    };
    
    const Hello = []
    const [seen, setSeen] = useState('')
    jsonLocalStorage.setItem(Hello, 'hey')
    // console.log(jsonLocalStorage.getItem(Hello))

    // table 예시
    
    return (
      <DashBoardBox>
        {/* 팀 링크 */}
        <TeamLink></TeamLink>

        <MessageBox>
          <Message></Message>
        </MessageBox>

        {/* 최근에 본 팀 */}
        <TeamList/> 

      </DashBoardBox>
    );
  }
  const DashBoardBox = styled.div`
    position: absolute;
    top: 35%;
    left: 50%;
    transform:translate(-50%, -50%);
    height: 40%;
    width: 60%;
  `
  const MessageBox = styled.div`
  `;
  