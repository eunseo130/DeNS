import React from 'react';
import { Link, Outlet } from 'react-router-dom';



export default function Day(props) {
    return (
        <>
            <h3>{ props.number }페이지입니다</h3>
            <Link to="/password">start 페이지로 test</Link>
            <Link to="/signup">start 페이지로 test</Link>
            <Link to="/signin">start 페이지로 test</Link>
            <Outlet />
        </>  

    );

}