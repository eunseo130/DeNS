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
    const id = useSelector(state => state.user.profileid);
    const [cookie] = useCookies(['token']);
    const [temp, setTemp] = useState([]);
    useEffect(() => {
        const authAxios = axios.create({
            baseURL: API_BASE_URL,
            headers: {
                Authorization: `Bearer "${token}"`,
                withCredentials : true,
            }
        })
        authAxios.get(`/chat/rooms/${id}`)
            .then((res) => {
                console.log(res)
                setTemp(res.data);
            })
            .catch((error) => { console.log(error) });
    },[id])
    const createRoom = () => {
        // createRooms(1,(res) => { console.log(res) }, (error) => { console.log(error) });
    }

    return (
        <>

        {temp?
            temp.map((data, idx) => {
                return <MessangerCard key={idx } data={data }/>
            })
        :``}
        <button onClick={createRoom}>채팅방 개설하기</button>

        </>
        )

}