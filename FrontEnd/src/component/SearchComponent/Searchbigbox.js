import React from 'react';
import  styled  from 'styled-components';
import Searchsmallbox from './Searchsmallbox';
export default function Searchbigbox(props) {
    return (
        <SerachBigBox>
            <Searchsmallbox info={ props.info}></Searchsmallbox>
        </SerachBigBox>
    )
}

const SerachBigBox = styled.div`
    margin-left: 100px;
    display: flex;
    background-color: pink;
    flex-flow: column nowrap;
    width: 30vw;
    height: 30vh;
    overflow: scroll;
`