import React, { useState } from "react";
import styled, { css } from "styled-components";
import InputHjBox from './InputHjBox';


function SignupBox(props) {
  
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    pwdCerti: '',
  });

  //check = 입력값  id = 항목
  const setTest = (check, id) => {
    const temp = check;
    const temp2 = id;
    setData({
      ...data,
      [temp2]: temp   //자료구조 dic 
    });
    console.log(data);
  }

  const testfunc = () => {
    console.log(data);
  }

  //아이디, 값, true/false
  //아이디, 값
  //아이디, 값
  //아이디, 값
  //모두 true라면 버튼 활성화.

  //if(Bname && Bpwd && BpwdCerti ){
  //  버튼 활성화
  //}
  

  return (
    <Container {...props}>
      <SignupBoxBg>
        <SignupBoxTitleStack>
          <SignupBoxTitle>
            <SignUp>Sign Up</SignUp>
            <WelcomeBack>Welcome Back!</WelcomeBack>
          </SignupBoxTitle>
        </SignupBoxTitleStack>
          <InputHjBox title="이름" ph="이름" idcheck={"name"} check={setTest}/>
          <InputHjBox title="이메일" ph="이메일" idcheck={"email" } check={setTest} />
          <InputHjBox title="비밀번호" ph="비밀번호" idcheck={"pwd" } check={setTest}/>
          <InputHjBox title="비밀번호확인" ph="비밀번호확인" idcheck={"pwdCerti" } check={setTest}/>
        <button style={SendFormbtn} onClick={ testfunc}>전송하기</button>
      </SignupBoxBg>
    </Container>
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
