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
        console.log(foo, tokencheck);
        //redux에 값이 있는가
        if (foo === false) {
            //쿠키에 token값이 잇는가
            if (cookies.token) {
                //리덕스에 저장.
                dispatch(loginUser(cookies.token));
                //param으로 검색한 사용자정보와 token에 저장된 사용자정보가 같은지 구분을 할 수 있음.
            } else {
                alert('로그인이 필요합니다');
                navigate('/signin')
            }
        }
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