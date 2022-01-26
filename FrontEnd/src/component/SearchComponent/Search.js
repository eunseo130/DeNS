import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Searchbigbox from './Searchbigbox';
export default function Search() {
    return (
        <>                <input type="text"></input><button>check</button><br></br>
            <Contain>
                <Searchbigbox />
                <Searchbigbox />
                <Outlet />
            </Contain>
            </>

    )
}

const Contain = styled.div`
    background-color:black;
    text-align: center;
    flexDirection:row;
    display:inline-block;
    width:800px;
    height:700px;
    margin-top:50px;
`