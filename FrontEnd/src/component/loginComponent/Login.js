import React, { useState } from "react";
import styled from "styled-components";

function Login() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const onChangeId = (e) => {
      setName(e.target.value);
    }
    const onChangePw = (e) => {
      setPassword(e.target.value)
    }
    const LoginConsole = () => {
      console.log([name, password])
    };
    return (
      <LoginBox>
        <H3>로그인</H3>
        <Container>
          <Name>이름</Name>
          {/* <input placeholder="이름을 입력해주세요." onChange={(e) => Setname(e.target.value)}/>      */}
          <input placeholder="이름을 입력해주세요." onChange={onChangeId} value={name}/>     
        </Container>

        <Container>
          <Name>비밀번호</Name>
          <input placeholder="비밀번호" onChange={onChangePw} value={password}/>     
        </Container>
        <Btn onClick={LoginConsole}>로그인</Btn>

      </LoginBox>
    );
}

const LoginBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform:translate(-50%, -50%);

  border: 1px solid; // 위치 확인용
`;

const H3 = styled.h3`
  text-align: center;
  color: #F46A72; 
`;

const Btn = styled.button`
  width:140px;
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
  color: rgba(131,131,131,1);
  width: 150px;
  height: 18px;
  margin-left: 4px;
`;

const InputSquare = {
  fontFamily: "Roboto",
  fontStyle: "normal",
  fontWeight: 700,
  color: 'rgba(220,220,220,1)',
  // width: '233px',
  // height: '18px',
  marginTop: '5px',
  marginLeft: '10px',

  width: '374px',
  height: '36px',
  backgroundColor: 'rgba(255,255,255,1)',
  borderWidth: '1px',
  borderColor: 'rgba(220,220,220,1)',
  display: 'flex',
  flexDirection: 'column',
  borderStyle: 'solid',
};


export default Login;
