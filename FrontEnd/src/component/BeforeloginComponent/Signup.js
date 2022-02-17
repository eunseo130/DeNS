import React, { useState, useEffect }from 'react';
import { useCookies } from 'react-cookie';
import {signup,verify } from '../../api/test';
// import TeamList from './TeamList';
// import UserList from './UserList';

export default function Signup() {
    const [certiText, setCertiText] = useCookies(["certi"]);
    const [input, setInput] = useState({
        email: '',
        name: '',
        password: '',
    });
    // useEffect(() => { console.log(input) }, [input]);

  const join = () => {
    signup(
      input,
      (response) => {
        console.log(response)
        navigate('/signup')
      },
      (error) => {
        console.log(error)
      }
    )
  }
    const join = () => {
        // signup(input, (response) => { console.log(response) }, (error) => { console.log(error) });
        console.log("verify test 11111");
        console.log(input.email);
        verify({ "email": input.email },
            (response) => {
                console.log("verify test33333333");
                console.log(response)
                setCertiText('certi', response.data);

            },
            (error) => {
                console.log("verify test 43444444");
                console.log(error)
            });
        // signin(input,
        //     (response) => { console.log(response) },    //success
        //     (error) => { console.log(error) });         //fail
    }
  return (
    <div>
      <section class="ftco-section">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-6 text-center mb-5">
              <h2 class="heading-section" style={{ color: '#f46a72' }}>
                Sing Up
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
                  해당 정보를 입력해 주세요.
                </h3>
                <form action="#" class="login-form">
                  <br />
                  <div class="form-group d-flex justify-content-center">
                    <input
                      placeholder="이메일"
                      name="email"
                      onChange={changeCheck}
                    />
                  </div>
                  <br />
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

                  <hr />
                  <div class="form-group d-flex justify-content-center">
                    <button
                      onClick={join}
                      class="btn rounded submit p-2 px-5"
                      style={{
                        backgroundColor: '#f46a72',
                        textAlign: 'center',
                      }}
                    >
                      가입하기
                    </button>
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
