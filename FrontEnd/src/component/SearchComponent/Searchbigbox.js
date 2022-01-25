import React from 'react';
import  styled  from 'styled-components';
import Searchsmallbox from './Searchsmallbox';

export default function Searchbigbox() {

    //상위 컴포넌트
    //객체를 만들기.

    return (
        <Contain>
            <Searchsmallbox />
            <Searchsmallbox />
            <Searchsmallbox />
            <Searchsmallbox />
        </Contain>
    )
}

const Contain = styled.div`
    background-color:black;
    text-align: center;
    width:800px;
    height:700px;
    margin-top:50px;
`