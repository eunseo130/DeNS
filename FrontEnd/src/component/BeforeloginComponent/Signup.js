import React, { useState, useEffect }from 'react';
import {signup } from '../../api/test';
// import TeamList from './TeamList';
// import UserList from './UserList';

export default function Signup() {
    const [input, setInput] = useState({
        email: '',
        name: '',
        password: '',
    });
    useEffect(() => { console.log(input) }, [input]);

    const changeCheck = (e) => {
        const { name, value } = e.target;
        setInput({
            ...input,
            [name]: value,
        });
    }

    const join = () => {
        signup(input, (response) => { console.log(response) }, (error) => { console.log(error) });
    }


    return (
        <>
            <input name='email' onChange={changeCheck}></input>
            <input name='password' onChange={changeCheck}></input>
            <input name='name' onChange={changeCheck}></input>
            <button onClick={join}>가입하기</button>
        </>


)


}
