import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/manageMember';

export default function Signin() {

    const [input,setInput] = useState([]);
    let navigate = useNavigate();
    const changeCheck = (e) => {
        const { name, value } = e.target;
        setInput({
            ...input,
            [name]: value,
        }); 
        console.log(input);
    }
    const goAfter =()=>{
        navigate('/afterlogin/dashboard');
    }
    const loginbtn = () => {
        console.log(input);
        login(input,
            (response)=>{
                if(response.data.message === 'success'){
                    goAfter();
                }
        }, (error)=>{ console.log(error)});
    }
    return (
        <>
            <h3>Signin 페이지입니다.</h3>
            <input name='email' onKeyUp={changeCheck}></input>
            <input name='password' onChange={changeCheck}></input>
            <button onClick={loginbtn}>로그인버튼</button>
        </>
    )
}