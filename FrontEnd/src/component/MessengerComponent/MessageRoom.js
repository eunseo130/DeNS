import axios from 'axios'
import { useEffect, useRef, useState, createContext } from 'react'
import { useCookies } from 'react-cookie'
import { useParams } from 'react-router-dom'
import { API_BASE_URL } from '../../config'
import * as SockJs from 'sockjs-client'
import * as Stomp from '@stomp/stompjs'
import { contextType } from 'google-map-react'
import { StompSessionProvider, useSubscription } from 'react-stomp-hooks'

export default function MessageRoom() {
  const paramTest = useParams()
  const [cookie] = useCookies(['token'])
  const [token, setToken] = useState('')
  // let stompClient = Stomp.over(sockjs);
  const [chatMessages, setChatMessages] = useState([])
  const [message, setMessage] = useState('')

  const client = new Stomp.Client({
    // brokerURL: 'ws://3.36.131.59:3456/ws-stomp',
    webSocketFactory: () => new SockJs(`${API_BASE_URL}ws-stomp`),
    connectHeaders: {
      token: token,
    },
    debug: function (str) {
      console.log(str)
    },
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
  })

  useEffect(() => {
    console.log(paramTest)
    const authAxios = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        Authorization: `Bearer "${cookie.token}"`,
        withCredentials: true,
      },
    })
    authAxios.get('/chat/user').then((res) => {
      setToken(res.data.token)
    })
    authAxios.get(`/chat/messages/${paramTest.roomid}`).then((res) => {
      console.log(res)
    })
  }, [])

  //1. 내가 보낸 메시지가 해당 방에 들어있는가
  //2. 이전데이터를 가져온다 -> 어떤 파라미터 혹은 데이터를 가지고 조회를 하는가
  //ps 연결은 됫다?

  //1. redis에 sub-0이라는 내역이있는지 확인.
  //2. 내역에 값이 없는지 + 추가되는지
  client.onConnect = function (frame) {
    client.subscribe(
      `${API_BASE_URL}sub/chat/room/${paramTest.roomid}`,
      ({ body }) => {
        setChatMessages((_chatMessages) => [..._chatMessages, JSON.parse(body)])
      }
    )
  }
  client.onStompError = function (frame) {
    console.log('chjecklcjeclcel0')
  }
  client.activate()
  // const message = useRef()

  const publish = (message) => {
    if (!client.connected) {
      return
    }

    client.publish({
      destination: `${API_BASE_URL}pub/chat/message/`,
      // destination: 'pub/chat/message/',
      body: JSON.stringify({
        roomid: paramTest.roomid,
        message: message,
      }),
      headers: {
        // token: token,
        'content-type': 'application/octet-stream',
      },
      skipContentLengthHeader: true,
    })
    console.log(message)
  }

  //   const sendMessage = () => {
  //     publish()
  //   }
  useEffect(() => {}, [])
  return (
    <>
      <h3>메시지보내기 창</h3>
      <div>
        {chatMessages && chatMessages.length > 0 && (
          <ul>
            {chatMessages.map((_chatMessage, index) => (
              <li key={index}>{_chatMessage.message}</li>
            ))}
          </ul>
        )}
      </div>
      <input
        type={'text'}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></input>
      <button onClick={() => publish(message)}>전송하기</button>
    </>
  )
}
