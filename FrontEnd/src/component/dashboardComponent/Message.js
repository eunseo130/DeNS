import axios from 'axios';
import React, { Component, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { store } from '../..';
import { API_BASE_URL } from '../../config';

function Message(props) {
  const profileId = store.getState().user.profileid;
  const token = store.getState().user.token;
  const [data, setData] = useState(null);
  const authAxios = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        Authorization: `Bearer "${token}"`,
        withCredentials : true,
    }
  })
  const [roomid, setRoomid] = useState('');
  useEffect(() => {
   getData();
    // recentmessage();
  },[])
  //1. CHAT/ROOMS/프로필아이디 -> 
  
  //2. 룸아이디 가져오기
  const getData = () => {
    authAxios.get(`/chat/rooms/${profileId}`)
    .then((res) => {
      setData(res.data);
      console.log(res);
      // setRoomid(res.data[0].roomId);
    })
      .catch((error) => { console.log(error) });
  };

  const recentmessage = () => {
    authAxios.get(`/chat/messages/${data.roomid}`).then((res) => {
      console.log(res);
    }).catch((err)=> { console.log(err)});
  }

  return (
    <Container {...props}>
      <Title>메시지</Title>
      <Rect>
        <tr style={{display:'flex',justifyContent:'space-around'}}>
          <TableHeader>프로필</TableHeader>
          <TableHeader>최근 메세지 내용</TableHeader>
          <TableHeader>팀 이름/팀장</TableHeader>
          <TableHeader>연결된 팀원 정보</TableHeader>
        </tr>
        {data ? data.map((val, key) => {
          return (
            <tr key={key}>
              <TableContent>{val.user2.name}</TableContent>
              {/* <TableContent>{val.name}</TableContent> */}
              {/* <TableContent>{val.name}</TableContent> */}
            </tr>
          )
        }): ``}
      </Rect>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: row;
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
