import React, { useEffect } from "react";
import styled from "styled-components";
import TeamLink from "./TeamLink";
import Message from "./Message";
import TeamList from "./TeamList"
import { myteam } from "../../api/test";

export default function Dashboard() {
    // 배경 스타일
    // const colors = d
      useEffect(() => {
        myteam("안녕하세여",
            (response) => {
                console.log(response);
        },  
        (error) => {
            console.log("오류가 됨.", (error));
        });
    });


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
  