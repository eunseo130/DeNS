import axios from 'axios';
import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Outlet } from 'react-router-dom';
import { store } from '../..';
import { getMember, test11 } from '../../api/test';
import { API_BASE_URL } from '../../config';
import { authUser, loginUser } from '../../redux/userreduce';
import HeaderBox from './HeaderBox';
import Sidebar from './sidebar';


export default function Back(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector(state => state.user.token);
    const [cookies] = useCookies(['token']);
    useEffect(() => {
        dispatch(loginUser(cookies));
        // console.log(cookies.token);
        const authAxios = axios.create({
            baseURL: API_BASE_URL,
            headers: {
                Authorization: `Bearer "${cookies.token}"`,
                withCredentials : true,
            }
        })
        authAxios.get(`test11`, (res) => { console.log(res) }, (error) => { console.log(error) });
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