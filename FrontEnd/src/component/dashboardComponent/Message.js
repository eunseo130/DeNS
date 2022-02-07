import React, { Component } from "react";
import styled, { css } from "styled-components";

function Message(props) {
  const data = [
    { name: "Anom", age: 19, gender: "Male" },
    { name: "Megha", age: 19, gender: "Female" },
    { name: "Subham", age: 25, gender: "Male"},
  ]
  return (
    <Container {...props}>
      <Title>메시지</Title>
      <Rect>
        <tr>
          <TableHeader>팀 이름/팀장</TableHeader>
          <TableHeader>최근 메세지 내용</TableHeader>
          <TableHeader>프로필</TableHeader>
          <TableHeader>연결된 팀원 정보</TableHeader>
        </tr>
        {data.map((val, key) => {
          return (
            <tr key={key}>
              <TableContent>{val.name}</TableContent>
              <TableContent>{val.age}</TableContent>
              <TableContent>{val.gender}</TableContent>
              {/* <TableContent>{val.gender}</TableContent> 이미지 추가*/}
            </tr>
          )
        })}
      </Rect>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: column;
  margin-top: 2vh;
`;

const Title = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 700;
  color: rgba(244,106,114,1);
  height: 22px;
  width: 57px;
  margin-left: 3px;
`;

const Rect = styled.div`
  width: 100%;
  height: 40vh;
  margin-top: 21px;
  box-shadow: 3px 3px 5px;
  border: 2px solid forestgreen;
`;

const TableHeader = styled.th`
border-bottom: 1px solid black;
`
const TableContent = styled.td`
text-align: center;
`

export default Message;
