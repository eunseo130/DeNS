import React from 'react';
import { Outlet } from 'react-router-dom';
export default function Search() {
    return (
        <>
            <h2>Search 페이지입니다.</h2>
            <Outlet />
        </>


    )


}