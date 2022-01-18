import React from "react";
import styled from "styled-components";

function InputBox(props) {
  return (
    
    <Container {...props}>
      <Name>{props.name}</Name>
      <input placeholder={props.ph} style={InputSquare} />     
    </Container>
  );
}

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

export default InputBox;