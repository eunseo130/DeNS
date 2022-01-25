import React, { Component } from "react";
import styled, { css } from "styled-components";

function MessageTitle(props) {
  return (
    <Container {...props}>
      <팀이름팀장2Row>
        <팀이름팀장2>팀 이름/팀장</팀이름팀장2>
        <최근메시지내용>최근 메시지 내용</최근메시지내용>
        <프로필>프로필</프로필>
        <연결된팀원정보명>연결된 팀원 정보(명)</연결된팀원정보명>
      </팀이름팀장2Row>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const 팀이름팀장2 = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 700;
  color: rgba(244,106,114,1);
  height: 22px;
  width: 88px;
`;

const 최근메시지내용 = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 700;
  color: rgba(244,106,114,1);
  height: 22px;
  width: 128px;
  margin-left: 289px;
`;

const 프로필 = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 700;
  color: rgba(244,106,114,1);
  height: 22px;
  width: 128px;
  margin-left: 207px;
`;

const 연결된팀원정보명 = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 700;
  color: rgba(244,106,114,1);
  height: 22px;
  width: 142px;
  margin-left: 131px;
`;

const 팀이름팀장2Row = styled.div`
  height: 22px;
  flex-direction: row;
  display: flex;
  flex: 1 1 0%;
`;

export default MessageTitle;
