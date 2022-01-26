import React from 'react';
import { Outlet } from 'react-router-dom';
import HeaderBox from '../commonComponent/HeaderBox';
import Sidebar from '../commonComponent/sidebar';

export default function ProfileMain() {
    return (
        <div>
            <HeaderBox></HeaderBox>
            <Sidebar />
            <h3>프로필 메인페이지입니다</h3>
            <Outlet />
        </div>


    )
    


}