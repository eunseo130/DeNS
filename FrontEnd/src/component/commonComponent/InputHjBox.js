import React from "react";
import styled from "styled-components";

function InputHjBox(props) {
  return (
    <Container {...props}>
      <비밀번호2>비밀번호</비밀번호2>
      <Rect>
        <input>
          <InputBox>
            아이디를 입력해주세요.
          </InputBox>
        </input>
      </Rect>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const 비밀번호2 = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 700;
  color: rgba(131,131,131,1);
  width: 93px;
  height: 18px;
  margin-left: 4px;
`;

const Rect = styled.div`
  width: 374px;
  height: 36px;
  background-color: rgba(255,255,255,1);
  border-width: 1px;
  border-color: rgba(220,220,220,1);
  flex-direction: column;
  display: flex;
  margin-top: 5px;
  border-style: solid;
`;

const InputBox = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 700;
  color: rgba(220,220,220,1);
  width: 233px;
  height: 18px;
  margin-top: 9px;
  margin-left: 10px;
`;

export default InputHjBox;
