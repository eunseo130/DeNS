import React from "react";
import styled from "styled-components";
import TeamLink from "./TeamLink";
import Message from "./Message";
import MessageTitle from "./MessageTitle"

export default function Dashboard() {
    return (
      <DashBoardBox>
        <TeamLink
          style={{
            height: 215,
            width: 1387,
            marginTop: 103,
            marginLeft: 293
          }}
          ></TeamLink>
        <MessageStack>
          <Message
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: 348,
              width: 1387
            }}
          ></Message>
          <MessageTitle
            style={{
              position: "absolute",
              top: 78,
              left: 133,
              height: 22,
              width: 1113
            }}
          ></MessageTitle>
          <팀이름팀장>팀 이름/팀장</팀이름팀장>
        </MessageStack>
        <최근내가본팀>최근 내가 본 팀</최근내가본팀>
        <Rect5Row>
          <Rect5></Rect5>
          <Rect6></Rect6>
        </Rect5Row>
      </DashBoardBox>
    );
  }
  const DashBoardBox = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform:translate(-50%, -50%);
  `
  const 팀이름팀장 = styled.span`
    font-family: Roboto;
    top: 78px;
    left: 133px;
    position: absolute;
    font-style: normal;
    font-weight: 700;
    color: rgba(244,106,114,1);
    height: 22px;
    width: 88px;
  `;
  
  const MessageStack = styled.div`
    width: 1387px;
    height: 348px;
    margin-top: 52px;
    margin-left: 293px;
    position: relative;
  `;
  
  const 최근내가본팀 = styled.span`
    font-family: Roboto;
    font-style: normal;
    font-weight: 700;
    color: rgba(244,106,114,1);
    height: 22px;
    width: 100px;
    margin-top: 40px;
    margin-left: 301px;
  `;
  
  const Rect5 = styled.div`
    width: 569px;
    height: 137px;
    background-color: #E6E6E6;
  `;
  
  const Rect6 = styled.div`
    width: 569px;
    height: 137px;
    background-color: #E6E6E6;
    margin-left: 32px;
  `;
  
  const Rect5Row = styled.div`
    height: 137px;
    flex-direction: row;
    display: flex;
    margin-top: 60px;
    margin-left: 359px;
    margin-right: 391px;
  `;