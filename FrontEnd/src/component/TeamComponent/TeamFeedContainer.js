import styled from "styled-components";
import TeamFeedIndex from "./TeamFeedIndex"
import React, { useState } from 'react';
import { useEffect } from "react";
import { teamFeed, makeTeamFeed } from "../../api/team"
import { useParams } from 'react-router-dom';

function TeamFeedContainer() {
  const [data, setData] = useState('');
  const [theData, setTheData] = useState('');
  const teamId = useParams().id;

  const ComingInput = (e) => {
    setData(e.target.value)
  };

  const KeyboardSend = (e) => {
    if (e.key === 'Enter') {
      DataSend();  
    }
  };

  useEffect(() => {
    setTheData(JSON.stringify(data));
  });

  // 데이터 전송
  // 1. RequestParam : ?name="value"
  // 2. Json : 
  const DataSend = () => {
    console.log(data)
    setData(''); // 초기화
    console.log(theData)
    // 피드 만들기(teamId와 profileId)
    makeTeamFeed(teamId, 1, [theData, "", ""],
      (response) => {
        console.log(response)
      },
      (error) => {
          console.log("오류가 됨.", (error));
      });
  };

  // 피드 정보 가져오기
  useEffect(() => {
      teamFeed(teamId,
        (response) => {
          // console.log(response)
        },
        (error) => {
            console.log("오류가 됨.", (error));
        }); 
    }, []);


  return (
    <Container>
      <TeamFeedTitle>팀 피드</TeamFeedTitle>
        <InputDiv>
        <form action="">
          <TeamFeedInput 
            placeholder="작성할 피드를 입력해주세요" 
            onChange={ComingInput} 
            onKeyPress={KeyboardSend}
            value={data}
            />
          <FeedInputBtn onClick={DataSend}>글 작성</FeedInputBtn>
        </form>
        </InputDiv>
        {/* Team Feed Index */}
      <TeamFeedIndex/>
    </Container>
  )
};

export default TeamFeedContainer;

const TeamFeedTitle = styled.h3`
  position: relative;
  margin-top: 5%;
  left: 5%;
  font-weight: bold;
`

const TeamFeedInput = styled.input`
  position: relative;
  margin-top: 5%;
  width: 70%;
  left: 5%;
`
const InputDiv = styled.div`
  display: flex;
  width: 100%;
`
const FeedInputBtn = styled.button`
  position: relative;
  margin-left: 8%;
`
// 팀 피드
const Container = styled.div`
  border: 1px solid;
  // text-align: center;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: start;
`