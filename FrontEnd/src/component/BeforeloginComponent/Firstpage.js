import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';



export default function Firstpage() {
    return (
        <>
            <HeadBlock>DeNS</HeadBlock>
            <Outlet/>
        </>
    )
}
const HeadBlock = styled.div`
    // background-color: pink;
    font-size : 3em
    display: flex;
    background-color: rgba(244,106,114,1);
    width:100vw;
    color:#fbebeb;
    font-family: 'Baloo', cursive;
`