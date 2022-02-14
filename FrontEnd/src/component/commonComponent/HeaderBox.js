import React, { Component } from "react";
import styled, { css } from "styled-components";
import Head from "../Header/Head";

function HeaderBox(props) {
  return (
    <Container {...props}>
      <HeaderchannelRow>
        <Head/>
      </HeaderchannelRow>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  background-color: rgba(244,106,114,1);
  width: 100%;
`;

const HeaderchannelRow = styled.div`
  height: 4vh;
  display: flex;
  flex: 1 1 0%;
  margin-right: 23px;
  margin-left: 31px;
`;

export default HeaderBox;
