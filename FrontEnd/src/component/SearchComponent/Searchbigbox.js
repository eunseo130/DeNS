import React from 'react';
import  styled  from 'styled-components';
import Searchsmallbox from './Searchsmallbox';
import dummy from '../../db/data.json';
export default function Searchbigbox(props) {
    //상위 컴포넌트
    //객체를 만들기.
    console.log(props.info);
    const temp = props.info;
    return (
        <Contain>
                    <Searchsmallbox></Searchsmallbox>

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