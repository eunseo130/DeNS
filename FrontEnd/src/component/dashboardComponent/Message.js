import React, { Component } from "react";
import styled, { css } from "styled-components";

function Message(props) {
  return (
    <Container {...props}>
      <메시지>메시지</메시지>
      <Rect4></Rect4>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const 메시지 = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 700;
  color: rgba(244,106,114,1);
  height: 22px;
  width: 57px;
  margin-left: 3px;
`;

const Rect4 = styled.div`
  width: 1387px;
  height: 305px;
  background-color: #E6E6E6;
  margin-top: 21px;
`;

export default Message;
