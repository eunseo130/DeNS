import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/userreduce';
import { store } from '../..';
import {useCookies} from 'react-cookie';
import { login, signup } from '../../api/test';
function Login() {
  const dispatch = useDispatch();
  const [cookies, setCookie] = useCookies(['token']);

  let navigate = useNavigate();
  
  const [input, setInput] = useState({
    email: '',
    password: '',
  });
  // useEffect(() => { console.log(input) }, [input]);

  useEffect(() => {
    console.log(cookies);
    console.log(store.getState("token"));
  },[]);
  
  
  const changeCheck = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  }
  
  
  
  
  const LoginConsole = () => {
    //로그인 버튼을 눌렀을때
    //1. 아이디와 비밀번호를 가져옴.
    console.log(input);
    //2. 서버로 아이디와 비밀번호를 보낸다.
    //login(input, (response) => { console.log(response) }, (error) => { console.log(error) });
    
    //3. 응답으로 받은 JWT를 저장한다.
    let data = 'testtestsetsetset';
    
    //3-1 redux에 저장한다.  (최상단 컴포넌트에 저장한다.) ->  '/auth'에 접근을 못할수도 있다.
    dispatch(loginUser(data));
    //3-2 cookie에 저장한다. (브라우저에 저장한다.) -> 새로고침을 할 경우에 cookie에 저장된 데이터를 먼저 훑어보고 redux에 넣어준다면? ->'/auth'에 접근을 할수도 있다.
    setCookie('token', data);
    console.log(store.getState("token"));
    //6. 페이지가 이동
    navigate(`/auth`)
    

    //4. cookie에 저장되 있는지를 확인.
    //4-1 cookie에 저장되있는 값과 지금 redux에 저장된 값을 비교해서 다르다면 최신화를 해주고 이후
    



    //새로고침과 페이지이동을 생각하자.
    
    //새로고친다 => 컴퓨터를 포멧한다. -> 웹페이지를 다시 연다. -> cookie에 저장해야 됨.
    
    //페이지이동의 경우 => 컴퓨터를 사용한다. -> 웹페이지를 이동한다. -> redux에 저장해도 됨. -> 부분적으로 렌더를 한다. SPA방식, react에 대한 이야기
    
    //cookie란 github 내 컴퓨터랑 별개의 저장공간에 데이터를 넣는다.


    // '/'와 '/auth'

    // '/'를 통해 접속을 하지만, 로그인이 안되면 '/auth'안의 페이지를 접근할 수 없다.

    //3-3 서버에서 받은 값을 무조건적으로 바로 cookie에 저장한다. 
    
    //redux를 사용함으로써 페이지구조를 다바꿔야되지않느냐

    //우리가 어떤 데이터를 redux에 저장하느냐에 따라서 구조를 바꿔야될수도 있다. 
    
    // useState() -> 상태관리 hook 페이지별 데이터를 따로 가져오기때문에 사용함.
    
    // store에 저장을 하게 된다면? == redux에 저장하게 된다면?
    
    // 상위컴포넌트 dashboard // 하위컴포넌트로 teamlink recentTeam 
    // 상위컴포넌트 profile    
    
    
    //5. 사용할 컴포넌트에서 store에 있는 인증정보를 가져온다.  
    
    
    
  };
  
    return (
      <LoginBox>
        <H3>로그인</H3>
        <Container>
          <Name>이름</Name>
          <InputSquare  placeholder="이름을 입력해주세요." name="email" onChange={changeCheck}/>
          {/* <input placeholder="이름을 입력해주세요." onChange={(e) => Setname(e.target.value)}/>      */}
        </Container>

        <Container>
          <Name>비밀번호</Name>
          <InputSquare placeholder="비밀번호" name="password" onChange={changeCheck}/>
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
