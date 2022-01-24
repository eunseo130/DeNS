import React from 'react';
import { Link } from 'react-router-dom';



export default function Day(props) {
    return (
        <>
            <h3>{ props.number }페이지입니다</h3>
            <Link to="/group/start">start 페이지로 test</Link>
            <Link to="/group/channels">start 페이지로 test</Link>
            <Link to="/group/link">start 페이지로 test</Link>
        </>  

    );

}