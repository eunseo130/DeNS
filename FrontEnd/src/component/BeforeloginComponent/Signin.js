import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { getId, getTOKEN, loginUser } from '../../redux/userreduce'
import { store } from '../..'
import { useCookies } from 'react-cookie'
import { signin, signup, test11 } from '../../api/test'
import axios from 'axios'
import { apiInstance } from '../../api'
import './nav.scss'
function Login() {
  const dispatch = useDispatch()
  const [token, setToken] = useCookies(['token'])
  const [profileid, setProfileid] = useCookies(['myID'])

  const token2 = useSelector((state) => state)
  let navigate = useNavigate()

  const [input, setInput] = useState({
    email: '',
    password: '',
  })

  const changeCheck = (e) => {
    const { name, value } = e.target
    setInput({
      ...input,
      [name]: value,
    })
  }

  const LoginConsole = () => {
    console.log(input);
    signin(input, (response) => {
     console.log(response.data);
      dispatch(loginUser(response.data));
      // dispatch(getId());
      // console.log(store.getState().user.token);
      if (store.getState().user.profileid == -1) {
        return navigate(`/asdfsasfsafsfd`)
      }
      setToken('token', store.getState().user.token);
      setProfileid('myID', store.getState().user.profileid);
      navigate(`/auth`);
    }, (error) => {
      console.log(error);
    });
    // console.log(cookies);
  }
  return (
    <div>
      <section class="ftco-section">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-6 text-center mb-5">
              <h2 class="heading-section" style={{ color: '#f46a72' }}>
                Login
              </h2>
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="col-md-6 col-lg-5">
              <div class="login-wrap p-4 p-md-5">
                <div class="icon d-flex align-items-center justify-content-center">
                  <span class="fa fa-user-o"></span>
                </div>
                <h3 class="text-center mb-4" style={{ color: '#f46a72' }}>
                  Have an account?
                </h3>
                <form action="#" class="login-form">
                  <div class="form-group d-flex justify-content-center ">
                    <input
                      placeholder="이름"
                      name="email"
                      onChange={changeCheck}
                    />
                  </div>
                  <br />
                  <div class="form-group d-flex justify-content-center">
                    <input
                      placeholder="비밀번호"
                      name="password"
                      onChange={changeCheck}
                    />
                  </div>
                  <br />
                  <div class="form-group d-flex justify-content-center">
                    <button
                      type="submit"
                      class="btn rounded submit p-2 px-5"
                      style={{
                        backgroundColor: '#f46a72',
                        textAlign: 'center',
                      }}
                      onClick={LoginConsole}
                    >
                      로그인
                    </button>
                  </div>
                  <hr />
                  <br />
                  <div class="form-group d-flex justify-content-center">
                    <div class=" text-md-right">
                      <SignUpBtn onClick={() => navigate('/signup')}>
                        회원가입
                      </SignUpBtn>
                    </div>
                  </div>
                  <br />
                  <div class="form-group d-md-flex d-flex justify-content-center">
                    <div class=" text-md-left ">
                      <FindIdPw
                        onClick={() => {
                          navigate('/signin')
                        }}
                        style={{ color: '#f46a72' }}
                      >
                        아이디/비밀번호 찾기
                      </FindIdPw>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

const LoginBox = styled.div`
  // position: absolute;
  top: 50%;
  left: 50%;

  border: 1px solid; // 위치 확인용
  display: flex;
  flex-direction: column;
`

const H3 = styled.h3`
  text-align: center;
  color: #f46a72;
`

const Btn = styled.button`
  width: 140px;
  position: relative;
  left: 50%;
  transform: translate(-50%, 0%);
  background-color: #f46a72;
  color: white;
  border: none;
  border-radius: 2px;

  margin-top: 4%;
  width: 30%;
  height: 3.5vh;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`

const Name = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 700;
  width: 150px;
  height: 18px;
  margin-left: 4px;
`

const InputSquare = styled.input`
  font-family: Roboto;
  font-style: normal;
  font-weight: 700;
  margin-top: 5px;
  margin-left: 4px;
  margin-right: 4px;

  width: 374px;
  height: 36px;
  background-color: rgba(255, 255, 255, 1);
  border-width: 1px;
  border-color: rgba(220, 220, 220, 1);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  border-style: solid;
`

const SignUpBtn = styled.a`
  text-align: center;
  margin-top: 5%;
  color: #f46a72;
  font-family: Roboto;
`

const FindIdPw = styled.a`
  text-align: center;
  margin-top: 2%;
  font-family: Roboto;
`

export default Login
