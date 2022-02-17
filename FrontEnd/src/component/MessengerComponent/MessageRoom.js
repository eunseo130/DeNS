import axios from 'axios'
import { useEffect, useRef, useState, createContext } from 'react'
import { useCookies } from 'react-cookie'
import { useParams } from 'react-router-dom'
import { API_BASE_URL } from '../../config';
// import SockJs from 'sockjs-client';
import * as StompJs from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import MessageBox from './MessageBox';





export default function MessageRoom() {
    const paramTest = useParams();
    const [cookie] = useCookies(['token']);
    const client = useRef({});
    const message = useRef();
    const [messagelog, setMessagelog] = useState([]);
    const ref = useRef(null);
   
    function connect() {
        client.current = new StompJs.Client({
            webSocketFactory: () => new SockJS(`${API_BASE_URL}ws-stomp`),
            connectHeaders: {
                "token": cookie.token
            },
            onConnect: () => {
                client.current.subscribe(`/topic/chat/room/${paramTest.roomid}`, message => {
                    const temp = JSON.parse(message.body);
                    setMessagelog((messagelog) => [...messagelog,temp])
                })
            },
            debug: function (str) {
                console.log(str)
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            onStompError: (frame) => {
                console.error(frame);
            }
        });
        client.current.activate();
    }
    const disconnect = () => {
        client.current.deactivate();
    }


    function send(e) {
        client.current.publish({
            destination: `/app/chat/${paramTest.roomid}`,
            body: JSON.stringify({ type: "TALK", roomId: paramTest.roomid, message: message.current.value }),
            headers: { token: cookie.token },
        });
    }
    const [cookies] = useCookies();
    const authAxios = axios.create({
        baseURL: API_BASE_URL,
        headers: {
          Authorization: `Bearer "${cookies.token}"`,
          withCredentials: true,
        },
      })

    useEffect(() => {
        authAxios.get(`/chat/messages/${paramTest.roomid}`).then((res) => {
            //console.log(res.data[0].sender);
            res.data.map((data) => {
                setMessagelog(
                    (messagelog) => [
                        ...messagelog,
                        data
                    ]
                )
            })


        }).catch((error) => { console.log(error) });
        
        connect();
    },[])
    return (
        <>
            <h3>메시지보내기 창</h3>
                { messagelog.map((data,idx) => (
                    <MessageBox key={idx } data={data}/>
                ))
            }
            <input name="text" ref={message}></input>
            
                    
            <button onClick={send}>전송하기</button>
        </>
    )
}
