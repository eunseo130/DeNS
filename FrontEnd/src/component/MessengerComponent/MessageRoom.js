import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router-dom'
import { API_BASE_URL } from '../../config';
import SockJs from 'sockjs-client';
import * as Stomp from '@stomp/stompjs';





export default function MessageRoom() {
    const paramTest = useParams();
    const [cookie] = useCookies(['token']);
    // let stompClient = Stomp.over(sockjs);

    const client = new Stomp.Client({
        brokerURL: `ws://3.36.131.59:2345/ws-stomp`,
        // webSocketFactory: () => new SockJs(`${API_BASE_URL}ws-stomp`),
        connectHeaders: {
            "name": "seol"
        },
        debug: function (str) {
            console.log(str);
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
    });


    // const [message, setMessage] = useState('');

    useEffect(() => {
        console.log(paramTest.roomid);
        const authAxios = axios.create({
            baseURL: API_BASE_URL,
            headers: {
                Authorization: `Bearer "${cookie.token}"`,
                withCredentials : true,
            }
        })

        authAxios.get(`/chat/messages/${paramTest.roomid}`)
            .then((res) => {
                
                console.log(res);
            }
        );
    }, []);
    
    //1. 내가 보낸 메시지가 해당 방에 들어있는가
    //2. 이전데이터를 가져온다 -> 어떤 파라미터 혹은 데이터를 가지고 조회를 하는가
    //ps 연결은 됫다?

    //1. redis에 sub-0이라는 내역이있는지 확인.
    //2. 내역에 값이 없는지 + 추가되는지
    client.onConnect = function (frame) {
        client.subscribe(`ws://3.36.131.59:2345/sub/chat/room/${paramTest.roomid}`)
        
    
    }
    client.onStompError = function (frame) {
        console.log("chjecklcjeclcel0");
    }
    client.activate();
    
    const message = useRef();

    const publish = () => {
        if (!client.connected) {
          return;
        }
    
        client.publish({
            destination: `${API_BASE_URL}pub/chat/message`,
            body: message
        });
      };


    const sendMessage = () => {
        publish();
    }
    
    return (
        <>
            <h3>메시지보내기 창</h3>
            <input name="text" ref={message}></input>
            <button onClick={sendMessage}>전송하기</button>
        </>


    )


}