import React, { useState } from 'react'
import styled from 'styled-components'
import { Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { store } from '../..'
import { Navbar } from 'react-bootstrap'
export default function Head() {
  const [drop, setDrop] = useState(false)
  const userId = store.getState().user.profileid
  const clickCheck = () => {
    setDrop(!drop)
    console.log(drop)
  }

  return (
    // <>
    //   <span>채널명</span>
    //   <Profileimage onClick={clickCheck}>check</Profileimage>
    //   <br />
    //   <br />
    //   <br />

    //   {drop ? (
    //     <>
    //       <ProfileDrop>
    //         <Image
    //           width={20}
    //           height={20}
    //           src={require('./profile_default.png')}
    //           roundedCircle
    //         />
    //         <Link to={`/auth/profile/${userId}`}>프로필가기</Link>
    //       </ProfileDrop>
    //     </>
    //   ) : (
    //     ''
    //   )}
    // </>
    <>
      <Navbar.Brand >채널명</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          Signed in as:
          <Image
            width={20}
            height={20}
            src={require('./profile_default.png')}
            roundedCircle
          />
          <Link to={`/auth/profile/${userId}`}>프로필가기</Link>
        </Navbar.Text>
      </Navbar.Collapse>
    </>
  )
}

// const Profileimage = styled.span`
//   position: absolute;
//   background-color: rgba(244, 106, 114, 1);
//   left: 95vw;
// `

// const ProfileDrop = styled.div`
//   position: absolute;
//   background-color: rgba(244, 106, 114, 1);
//   left: 95vw;
// `
