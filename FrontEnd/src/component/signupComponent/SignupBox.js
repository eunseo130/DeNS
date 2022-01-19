import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import InputHjBox from './InputHjBox';
import '../../test.css';

function SignupBox(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pwdCerti, setPwdCerti] = useState('');
  const [correct, setCorrect] = useState(false);

  if (name.length > 5 && email.length > 10) {
    setCorrect(true);
    console.log("check");
  }
  
  const testFunc = () => {
    if (correct) {
      console.log("test ok ");
    }
  }

  return (
    <>
      <SignupBoxBg>
        <SignupBoxTitleStack>
          <SignupBoxTitle>
            <SignUp>Sign Up</SignUp>
            <WelcomeBack>Welcome Back!</WelcomeBack>
          </SignupBoxTitle>
        </SignupBoxTitleStack>
          <InputHjBox title="이름" ph="이름" idcheck={"name"} check={setName}/>
          <InputHjBox title="이메일" ph="이메일" idcheck={"email" } check={setEmail} />
          <InputHjBox title="비밀번호" ph="비밀번호" idcheck={"password" } check={setPassword}/>
          <InputHjBox title="비밀번호확인" ph="비밀번호확인" idcheck={"pwdCerti" } check={setPwdCerti}/>
        <button className={correct ? 'active' : 'unactive'} onClick={ testFunc}style={SendFormbtn} disabled>전송하기</button>
      </SignupBoxBg>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top:0;
  bottom:0; 
  justify-content: center; 
  align-items: center;
  
`;

const SignupBoxBg = styled.div`
  width: 562px;
  height: 858px;
  background-color: rgba(255,255,255,1);
  border-radius: 29px;
  flex-direction: column;
  display: flex;
`;

const SignupBoxTitle = styled.div`
  top: 2px;
  width: 298px;
  height: 88px;
  position: absolute;
  background-color: rgba(255,255,255,1);
  border-radius: 15px;
  left: 0px;
  flex-direction: column;
  display: flex;
`;

const WelcomeBack = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: rgba(226,63,63,1);
  font-size: 20px;
  margin-top: 59px;
  margin-left: 68px;
`;

const SignUp = styled.span`
  font-family: Roboto;
  top: 0px;
  left: 81px;
  position: absolute;
  font-style: normal;
  font-weight: 400;
  color: rgba(249,90,90,1);
  text-align: center;
  font-size: 40px;
`;

const SignupBoxTitleStack = styled.div`
  width: 298px;
  height: 90px;
  margin-top: 38px;
  margin-left: 132px;
  position: relative;
`;

const SendFormbtn = {
  fontFamily: "Ubuntu",
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: "20px",
  lineHeight: "24px",
  width: "185px",
  height: "43px",
  backgroundColor: "rgba(200,64,64,1)",
  borderRadius: "20px",
  marginTop:"10px"
};

export default SignupBox;
