import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { store } from '../..'
export default function Head() {
  const [drop, setDrop] = useState(false)
  const userId = store.getState().user.profileid

  const clickCheck = () => {
    setDrop(!drop)
    console.log(drop)
  }
  const urlId = useParams()
  useEffect(() => { }, [urlId])

  return (
    <>
      <div class="header_toggle">
        <i id="header-toggle" class="fas fa-bars text-white">아이콘</i>
      </div>
      <div class="header_img">
        <img src="" alt="" />
        <Link to={`/auth/profile/${userId}`}>프로필가기</Link>
      </div>    </>
  )
}

const Profileimage = styled.span`
  position: absolute;
  background-color: rgba(244, 106, 114, 1);
  left: 95vw;
`

const ProfileDrop = styled.div`
  position: absolute;
  background-color: rgba(244, 106, 114, 1);
  left: 95vw;
`
