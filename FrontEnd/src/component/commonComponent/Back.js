import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Outlet } from 'react-router-dom';
import { store } from '../..';
import { authUser } from '../../redux/userreduce';
import HeaderBox from './HeaderBox';
import Sidebar from './sidebar';


export default function Back(props) {

    const navigate = useNavigate();
    useEffect(() => {
        const foo = store.getState().user.auth;
        if (foo === false) {
            navigate('/error')
        }
    }, []);

    // console.log(dispatch());

    return (
        <>
            <HeaderBox />
            <Sidebar />
            <Outlet />
        </>
    )

}