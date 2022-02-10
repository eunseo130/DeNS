import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { useNavigate, Outlet } from 'react-router-dom';
import { store } from '../..';
import { getMember } from '../../api/test';
import { authUser, loginUser } from '../../redux/userreduce';
import HeaderBox from './HeaderBox';
import Sidebar from './sidebar';


export default function Back(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(['token']);
    useEffect(() => {
        const foo = store.getState().user.auth;
        const tokencheck = store.getState().user.token;

        if (foo === false) {
            if (cookies.token) {
                dispatch(loginUser(cookies.token));
                console.log("check");
            } else {
                alert('로그인이 필요합니다');
                navigate('/signin')
            }
        }
        getMember(``, (response) => {
            console.log(response);
        }, (error) => {
            console.log(error);
        })

    }, []);

    // console.log(dispatch());

    return (
        <>
        <HeaderBox />
            <Sidebar />
            <div className='tewst' style={{ backgroundColor:'#fde1e36b' }}>
                <Outlet />
        </div>
        </>
        )

}