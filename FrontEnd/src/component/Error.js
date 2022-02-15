import React from 'react'
import { certi } from '../api/test'

export default function Error() {
    const sendEmail = () => {
        certi(``, (response) => { console.log(response) }, (error) => { console.log(error) });

    }

    return (
        <>
            <h2>로그인 후 이용해주세요</h2>

            <button>이메일 확인</button>
        </>

    )


}