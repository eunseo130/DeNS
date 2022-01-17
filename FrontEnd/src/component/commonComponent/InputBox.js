import React from "react";
import styled from "styled-components";

function InputBox(props) {
  return (
    <Container {...props}>
      <InputBoxBg>
        <InputBoxTitle>Full Name</InputBoxTitle>
        <InputBoxIn>
          <InputboxplaceholderRow>
            <Inputboxplaceholder>full Name</Inputboxplaceholder>
            <svg
              viewBox="0 0 39 39"
              style={{
                width: 39,
                height: 39,
                marginLeft: 262
              }}
            >
              <ellipse
                stroke="rgba(0,0,0,1)"
                strokeWidth={3}
                fill="rgba(255,255,255,1)"
                cx={20}
                cy={20}
                rx={18}
                ry={18}
              ></ellipse>
            </svg>
          </InputboxplaceholderRow>
        </InputBoxIn>
      </InputBoxBg>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputBoxBg = styled.div`
  width: 460px;
  height: 118px;
  background-color: rgba(231,163,163,1);
  border-radius: 17px;
  flex-direction: column;
  display: flex;
`;

const InputBoxTitle = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: #121212;
  font-size: 20px;
  margin-top: 8px;
  margin-left: 23px;
`;

const InputBoxIn = styled.div`
  width: 382px;
  height: 50px;
  background-color: rgba(255,255,255,1);
  border-radius: 19px;
  flex-direction: row;
  display: flex;
  margin-top: 8px;
  margin-left: 25px;
`;

const Inputboxplaceholder = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: rgba(131,131,131,1);
  margin-top: 7px;
`;

const InputboxplaceholderRow = styled.div`
  height: 39px;
  flex-direction: row;
  display: flex;
  flex: 1 1 0%;
  margin-right: 8px;
  margin-left: 13px;
  margin-top: 8px;
`;

export default InputBox;
