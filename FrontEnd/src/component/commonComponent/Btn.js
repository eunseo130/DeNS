import React from "react";
import styled from "styled-components";

function Btn(props) {
    return (
      <LoginBtn>{props.name}</LoginBtn>
    );  
}

const LoginBtn = styled.button`
  color: white;
  width: 140px;
  height: 35px;
  background-color: #F46A72; 
`;

export default Btn;
