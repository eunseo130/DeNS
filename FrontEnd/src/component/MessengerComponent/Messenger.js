import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { createRooms, showRooms } from '../../api/messanger';
import { API_BASE_URL } from '../../config';
import MessangerCard from './MessangerCard';



export default function Messenger() {
    const dispatch = useDispatch();
    const token = useSelector(state => state.user.token);
    const [cookie] = useCookies(['token']);
    const [temp, setTemp] = useState([
        {
            name: 'test1',
            message : 'example1',
        },{
            name: 'test2',
            message : 'example2',
        },{
            name: 'test3',
            message : 'example3',
        },{
            name: 'test4',
            message : 'example4',
        },{
            name: 'test5',
            message : 'example5',
        }
    ]);
    useEffect(() => { 
        const authAxios = axios.create({
            baseURL: API_BASE_URL,
            headers: {
                Authorization: `Bearer "${cookie.token}"`,
                withCredentials : true,
            }
        })
        authAxios.get(`/chat/rooms/1`)
            .then((res) => {
                console.log(res)
                setTemp(res.data);
            })
            .catch((error) => { console.log(error) });

        // showRooms(1, (res) => { console.log(res) }, (error) => { console.log(error) });

        //1. 채팅방 목록에서 제일 마지막에 친 채팅 내용을 표시하는 것.
        //2. 채팅방에 들어갔을때 이전 대화 기록 표시하는 것.


    },[])
    const createRoom = () => {
        const authAxios = axios.create({
            baseURL: API_BASE_URL,
            headers: {
                Authorization: `Bearer "${cookie.token}"`,
                withCredentials : true,
            }
        })
        console.log("check");
        authAxios.post(`/chat/room/1/8`)
            .then((res) => { console.log(res) })
            .catch((error) => { console.log(error) });

        // createRooms(1,(res) => { console.log(res) }, (error) => { console.log(error) });
    }

    return (
        <>
        {
            temp.map((data, idx) => {
                return <MessangerCard key={idx } data={data }/>
            })
        }
        <button onClick={createRoom}>채팅방 개설하기</button>

        </>
        )

}