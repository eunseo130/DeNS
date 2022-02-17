import styled from "styled-components";
import TeamFeedIndex from "./TeamFeedIndex"
import React, { useState } from 'react';
import { useEffect } from "react";
import { teamFeed, makeTeamFeed, downloadFeedFile } from "../../api/team"
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { store } from "../..";

function TeamFeedContainer() {
  const profileId = store.getState().user.profileid;
  const teamId = useParams().id;
  
  const [imgName, setImgName] = useState('');
  const [fileName, setFileName] = useState('');
  let [img, setImg] = useState();
  let [file, setFile] = useState();

  const [inputs, setInputs] = useState({
    images: [],
    files: [],
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

  const [imgBase64, setImgBase64] = useState([])
  let reader = new FileReader();
  const setTheImg = (e) => {
    setImg(e.target.files[0])
    reader.readAsDataURL(e.target.files[0]);
  }
  reader.onloadend = () => {
    const base64 = reader.result;
    console.log(base64);
    if (base64) {
      let base64Sub = base64.toString();
      setImgBase64(imgBase64 => [...imgBase64, base64Sub])
    }
  }
  // 이미지, 파일 set
  // useEffect(() => {
  //   downloadFeedFile(
  //     bringFileName,
  //     (response) => {
  //       console.log(response);
  //     },
  //     (error) => {
  //       console.log(error);
  //       console.log(bringFileName);
  //     }
  //   )
  // })
  const [bringFileName, setBringFileName] = useState('');
  const setTheFile = (e) => {
    setFile(e.target.files[0]);
    // setBringFileName(e.target.files[0].name);
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
    if (!img) {
      img = new File([""], "filename");
      console.log(11);
    }
    if (!file) {
      file = new File([""], "filename");
    }

    const formData = new FormData();
    formData.append("content", content);
    formData.append("imageFiles", img);
    formData.append("generalFiles", file);
    // 피드 작성하기
    makeTeamFeed(
      [teamId, profileId, formData],
      (response) => {
        console.log(response);
        // window.location.replace(`/auth/team/${teamId}`);
      },
      (error) => {
        console.log("오류", error);
      }
    )
  };




  return (
    <Container>
      <TeamFeedTitle>팀 피드</TeamFeedTitle>
      <InputBox>
        <FormInput onSubmit={DataSend}>
          {/* input 창 */}
          <TeamFeedInput 
            placeholder="작성할 피드를 입력해주세요" 
            onChange={onInput} 
            onKeyPress={KeyboardSend}
            name="content"
            />
          {/* 이미지/파일 전송 */}
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
          {/* 글 작성 완료 버튼 */}
          <FeedInputBtn type="submit" value="Upload File" onClick={DataSend}>글 작성</FeedInputBtn>
        </FormInput>
        <NameInfo>
          <div>
            {imgName}
          </div>
          <div>
            {fileName}
            {imgBase64.map((item, key) => {
              return(
                <img
                  // className="d-block w-100"
                  src={item}
                  alt="First slide"
                  style={{width:"50px", height:"50px"}}
                  key={key}
                />
              )
              })
            }
          </div>
          
        </NameInfo>
      </InputBox>

        {/* Team Feed Index */}
      <TeamFeedIndex/>
    </Container>
  )
};
export default TeamFeedContainer;

// 팀 피드
const Container = styled.div`
  border: 1px solid;
  border-radius: 5px;
  display: flex;
  height: 60vh;
  width: 50vw;
  flex-direction: column;
  align-items: start;

  overflow: scroll;
`

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
  height: 5vh;
`
const ImgBox = styled.div`
  position: relative;
  display: flex;
  background: transparent;
`
const FeedInputBtn = styled.button`
  position: relative;
  margin-left: 5%;
  background-color: #F46A72;
  border: none;
  border-radius: 2px;
  color: white;
  height: 3.5vh;
  width: 15%;
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
const FormInput = styled.form`
  display: flex;
  width: 100%;
`