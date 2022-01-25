import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Searchbigbox from './Searchbigbox';
import dummy from '../../db/data.json';
export default function Search() {
    const check = dummy;

    return (
        <>
            <input type="text"></input><button>check</button><br></br>
            <Contain>
                <Searchbigbox info={check }/>
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