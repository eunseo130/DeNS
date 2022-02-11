import styled from "styled-components";
import TeamFeedIndex from "./TeamFeedIndex"
import React, { useState } from 'react';
import { useEffect } from "react";
import { teamFeed, makeTeamFeed } from "../../api/team"
import { useParams } from 'react-router-dom';
import axios from 'axios';

function TeamFeedContainer() {
  const [data, setData] = useState('');
  const [theData, setTheData] = useState(''); // JSON stringify
  const [imageFiles, setImageFiles] = useState(null); // 이미지 파일
  const [generalFiles, setGeneralFiles] = useState(null); // 이미지 파일
  const teamId = useParams().id;
  // 입력 값
  const ComingInput = (e) => {
    setData(e.target.value);
  };
  const handleImg = (e) => {
    setImageFiles(e.target.files[0]);
  };
  const handleGen = (e) => {
    setGeneralFiles(e.target.files[0]);
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
  const DataSend = (e) => {
    e.preventDefault();
    setData(''); // 초기화
    const formData = new FormData();
    formData.append("content", theData);
    formData.append("imageFiles", imageFiles);
    formData.append("generalFiles", generalFiles);
    for(var pair of formData.entries()) {
      console.log(pair[0]+ ', '+ pair[1]); 
    };
    try {
      // url: `teamfeed/${team_id}/${profile_id}`,
      axios({
        method:"post",
        url: `/teamfeed/${teamId}/1`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      // console.log(formData[0])
    } catch(error) {
      console.log(error);
    }
    
    // 피드 만들기(teamId와 profileId)
    // makeTeamFeed(teamId, 1, [theData, "", ""],
    //   (response) => {
    //     console.log(response)
    //   },
    //   (error) => {
    //       console.log("오류가 됨.", (error));
    //   });
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
        <form onSubmit={DataSend}>
          <TeamFeedInput 
            placeholder="작성할 피드를 입력해주세요" 
            onChange={ComingInput} 
            onKeyPress={KeyboardSend}
            value={data}
            />
          <FeedImgUpload type="file" onChange={handleImg}/>이미지
          <FeedImgUpload type="file" onChange={handleGen}/>일반
          <FeedInputBtn type="submit" value="Upload File" onClick={DataSend}>글 작성</FeedInputBtn>
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
const FeedImgUpload = styled.input`
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