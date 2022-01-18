import React from "react";

import styled from "styled-components";
import Btn from "../commonComponent/Btn";
import InputBox from "../commonComponent/InputBox";

function Login () {
    return (
      <LoginBox>
        <H3>로그인</H3>
        <InputBox name="이름" ph="이름을 입력해주세요." />
        <InputBox name="비밀번호" ph="비밀번호를 입력해주세요." />
        <Btn name="로그인" style={LoginSqaure}/>
      </LoginBox >
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

const LoginSqaure = styled.button`
  display: flex;
  justify-content: center;
`;

export default Login;
