import styled from "styled-components";
import TeamFeedIndex from "./TeamFeedIndex"
import React, { useState } from 'react';
import { useEffect } from "react";
import { teamFeed, makeTeamFeed } from "../../api/team"
import { useParams } from 'react-router-dom';
import axios from 'axios';


function TeamFeedContainer() {
  const [imgName, setImgName] = useState('');
  const [fileName, setFileName] = useState('');
  const [img, setImg] = useState([]);
  const [file, setFile] = useState([]);
  const teamId = useParams().id;

  const [inputs, setInputs] = useState({
    images: null,
    files: null,
  });
  
  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputs({
        ...inputs,
        [name]: value,
    });
  }

  const [content, setContent] = useState('');
  
  const onInput = (e) => {
    setContent(e.target.value);
  }

  const KeyboardSend = (e) => {
    if (e.key === 'Enter') {
      DataSend();  
    }
  };

  const setTheImg = (e) => {
    setImg(e.target.files[0])
  }
  const setTheFile = (e) => {
    setFile(e.target.files[0])
  }

  useEffect(() => {
    // console.log(content, img, file);
    setImgName(inputs.images);
    setFileName(inputs.files);
  })

  // 데이터 전송
  const DataSend = (e) => {
    e.preventDefault();
    setContent(''); // 초기화
    const formData = new FormData();
    formData.append("content", content);
    formData.append("imageFiles", img);
    formData.append("generalFiles", file);

    
    makeTeamFeed(
      [teamId, 1, formData],
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log("오류", error);
      }
    )

  };

  // 피드 정보 가져오기
  useEffect(() => {
      teamFeed(teamId,
        (response) => {
          console.log(response)
        },
        (error) => {
            console.log("오류가 됨.", (error));
        }); 
    }, []);


  return (
    <Container>
      <TeamFeedTitle>팀 피드</TeamFeedTitle>
      <InputBox>
        <FormInput onSubmit={DataSend}>
          <TeamFeedInput 
            placeholder="작성할 피드를 입력해주세요" 
            onChange={onInput} 
            onKeyPress={KeyboardSend}
            name="content"
            />
          <ImgBox>
            <ImgInputLabel onChange={handleInput} htmlFor="img-input">
              <img src="https://img.icons8.com/ios/50/000000/image.png" width="20vw" height="20vh"/>
              <FeedImgUpload onChange={setTheImg} name="images" id="img-input" type="file" hidden />
            </ImgInputLabel>
            <ImgInputLabel onChange={handleInput} htmlFor="file-input">
              <img src="https://img.icons8.com/material-outlined/96/000000/add-file.png" width="20vw" height="20vh" />
              <FeedImgUpload onChange={setTheFile} name="files" id="file-input" type="file" hidden />
            </ImgInputLabel>
          </ImgBox>
          <FeedInputBtn type="submit" value="Upload File" onClick={DataSend}>글 작성</FeedInputBtn>
        </FormInput>
        <NameInfo>
          <div>
            {imgName}
          </div>
          <div>
            {fileName}
          </div>
        </NameInfo>
      </InputBox>
      
        {/* Team Feed Index */}
      <TeamFeedIndex/>
    </Container>
  )
};
export default TeamFeedContainer;

const NameInfo = styled.div`
  display:flex;
  flex-direction: column;
`
const TeamFeedTitle = styled.h3`
  position: relative;
  margin-top: 5%;
  left: 5%;
  font-weight: bold;
`

const TeamFeedInput = styled.input`
  position: relative;
  width: 70%;
  margin-left: 5%;
  font-family: Roboto;
  font-style: normal;
  font-weight: 700;

  border-width: 1px;
  border-color: rgba(220,220,220,1);
  border-radius: 4px;
  border-style: solid;
`
const InputBox = styled.div`
  width: 100%;
`
const ImgBox = styled.div`
  position: relative;
  display: flex;
  background: transparent;
`
const FeedInputBtn = styled.button`
  position: relative;
  margin-left: 8%;
`
const ImgInputLabel = styled.label`
  border: none;
  background-color: white;
  color: white;
  margin-left: 10%;
`
const FeedImgUpload = styled.input`
  border: none;
  background-color: white;
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
const FormInput = styled.form`
  display: flex;
  width: 100%;
`