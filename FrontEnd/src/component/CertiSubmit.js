import { useNavigate, useParams } from 'react-router-dom'

export default function CertiSubmit() {
    const navigate = useNavigate();
    const param = useParams();
    const goHome = () => {
        navigate(`/signin`);
    }
    
    return (
        <>
            { param}
            <div>인증절차의 마지막 절차입니다.</div>
            {/* <button onClick={goHome}>인증완료하기</button> */}
            {/* <div>인증절차가 완료되었습니다.</div> */}
            <button onClick={goHome}>홈으로</button>
        </>
    )
}

//회원가입 해.
//이후에 컴포넌트 이동 데이터이동은 상관없음.
//이메일로 감. 1. verifi

//이메일로 2. 