import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { DashBoard, Messenger, Profile } from './index';

const Router = () => {
    return (
        <Routes>
            <Route path='/DashBoard' element={<DashBoard />}></Route>
            <Route path='/Messenger' element={<Messenger />}></Route>
            <Route path='/Profile' element={< Profile />}></Route>
        </Routes>
    );
}

export default Router;