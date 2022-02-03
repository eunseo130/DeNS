import React from "react";
import styled from "styled-components";
import TeamLink from "./TeamLink";
import Message from "./Message";
import TeamList from "./TeamList"

export default function Dashboard() {
    return (
      <DashBoardBox>

        <TeamLink></TeamLink>

        <MessageBox>
          <Message></Message>

        </MessageBox>

        {/* 캐러셀 */}
        <TeamList/> 

      </DashBoardBox>
    );
  }
  const DashBoardBox = styled.div`
    position: absolute;
    top: 17%;
    left: 50%;
    transform:translate(-50%, -50%);
    height: 215px;
    width: 1387px;
    // marginTop: 103px;
    // marginLeft: 293px;
  `
  const MessageBox = styled.div`
  `;
  