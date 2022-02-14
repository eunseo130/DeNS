import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/userreduce';
import { store } from '../..';
import {useCookies} from 'react-cookie';
import { signin } from '../../api/test'

function Login() {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  let navigate = useNavigate();
  
  const changeCheck = (e) => {
    const { name, value } = e.target;
    console.log(name, value)
    setInputs({
        ...inputs,
        [name]: value,
    });
  }
  
  
  const LoginConsole = () => {
    // dispatch(loginUser());
    // const cookieCheck = store.getState().user.token;
    // let expires = new Date();
    // expires.setMinutes(expires.getMinutes() + 1);
    // removeCookie('token', { expires: 0 });
    // setCookie('token', cookieCheck, { path: '/auth', expires });
    signin(inputs,
      (response) => {
        console.log(response)
      },
      (error) => {
        console.log(error)
      } 
      )
    
    navigate('/auth');
  };
  
    return (
      <LoginBox>
        <H3>로그인</H3>
        <Container>
          <Name>이메일</Name>
          <InputSquare  name="email" placeholder="이메일을 입력해주세요."  onChange={changeCheck}/>
          {/* <input placeholder="이름을 입력해주세요." onChange={(e) => Setname(e.target.value)}/>      */}
        </Container>

        <Container>
          <Name>비밀번호</Name>
          <InputSquare name="password" placeholder="비밀번호" onChange={changeCheck}/>
        </Container>
        <Btn onClick={LoginConsole}>로그인</Btn>
        <SignUpBtn onClick={() => navigate("/signup") }>회원가입</SignUpBtn>
        <FindIdPw>아이디/비밀번호 찾기</FindIdPw>

      </LoginBox>
    );
}

const LoginBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform:translate(-50%, -50%);

  border: 1px solid; // 위치 확인용
  display: flex;
  flex-direction: column;
`;

const H3 = styled.h3`
  text-align: center;
  color: #F46A72; 
`;

const Btn = styled.button`
  width:140px;
  position: relative;
  left: 50%;
  transform:translate(-50%, 0%);
  background-color: #F46A72; 
  color: white;
  border: none;
  border-radius: 2px;

  margin-top: 4%;
  width: 30%;
  height: 3.5vh;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const Name = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 700;
  width: 150px;
  height: 18px;
  margin-left: 4px;
  `;
  
const InputSquare = styled.input`
  font-family: Roboto;
  font-style: normal;
  font-weight: 700;
  margin-top: 5px;
  margin-left: 4px;
  margin-right: 4px;

  width: 374px;
  height: 36px;
  background-color: rgba(255,255,255,1);
  border-width: 1px;
  border-color: rgba(220,220,220,1);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  border-style: solid;
`

const SignUpBtn = styled.a`
  text-align: center;
  margin-top: 5%;
  color: #F46A72;
  font-family: Roboto;
`

const FindIdPw = styled.a`
  text-align: center;
  margin-top: 2%;
  font-family: Roboto;
`


export default Login;
