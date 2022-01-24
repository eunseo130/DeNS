import React from 'react';
import { Outlet } from 'react-router-dom';

export default function ProfileMain() {
    return (
        <>
            <h3>프로필 메인페이지입니다</h3>
            <Outlet />
        </>


    )
    


}