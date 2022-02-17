import React, { useRef, useState } from 'react';
import { certiPWD, password } from '../../api/test';



export default function Password() {
    const ema = useRef();
    const sendEmail = () => {
        password(ema.current.value, (res) => { console.log(res) }, (err) => { console.log(err) });
    }
    return (
        <>
            <h3>Password 페이지입니다.</h3>
            <input ref={ema}></input>
            <button onClick={sendEmail}>전송하기</button>
            {/* <button onClick={changeTest}>전송하기</button> */}
        </>

    )


}