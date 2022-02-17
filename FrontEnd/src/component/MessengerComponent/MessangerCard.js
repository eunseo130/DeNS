import axios from 'axios'
import React, { useState } from 'react'
import { Cookies, useCookies } from 'react-cookie'
import { useNavigate, Link } from 'react-router-dom'
import { API_BASE_URL } from '../../config'
import { store } from '../..'
import { useEffect } from 'react'

export default function MessangerCard({ data }) {
  const singleData = data
  const cookie = useCookies(['token'])
  const [talkingLog, setTalkingLog] = useState([])
  const navigate = useNavigate()
  const [yourId, setYourId] = useState('');

  useEffect(() => {
    setYourId(data.user2.profileId);
  }, [])

  const token = store.getState().user.token
  const profileId = store.getState().user.profileid
  const handleClick = () => {
    console.log('clickCheck', data)
    const authAxios = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        Authorization: `Bearer "${token}"`,
        withCredentials: true,
      },
    })
    // authAxios
    //   .get(`/chat/room/enter/${singleData.roomId}/${profileId}`)
    //   .then(navigate(`/auth/messenger/${singleData.roomId}`))
    //   .catch()
  }

    // const authAxios = axios.create({
    //     baseURL: API_BASE_URL,
    //     headers: {
    //         Authorization: `Bearer "${cookie.token}"`,
    //         withCredentials : true,
    //     }
    // })
    // authAxios.get(`/chat/messages/${singleData.roomId}`)
    //     .then((res) => {
    //         console.log(res)
    //         setTalkingLog(res.data);
    //     })
    //     .catch((error) => { console.log(error) });
  return (
    <div onClick={handleClick}>
      <Link
        to={{
          pathname:`/auth/messenger/${singleData.roomId}`,
        }}
        state={{
          yourId: yourId
        }}
      >
        사람 : {singleData.name} | 최근 대화내용:{singleData.message}{' '}
      </Link>
    </div>
  )
}
