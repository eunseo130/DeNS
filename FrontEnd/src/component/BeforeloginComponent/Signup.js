import React, { useState, useEffect }from 'react';
import { profile, signup, test22,insertTeam, searchTeam ,searchUser, searchTeamkeyword, searchUserkeyword} from '../axios/api';
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
    
    const profilesearch = () => {
        profile("1", (response) => { console.log(response) }, (error) => { console.log(error) });
    }
    
    //유저프로필

    const check = () => {
        test22("", (response) => { console.log(response) }, (error) => { console.log(error) });
    }
    const Team = () => {
        insertTeam({title: "example2",content:"테스트용 컨텐트"}, (response) => { console.log(response) }, (error) => { console.log(error) });
    }


    //클라 -> 서버
    //요청하는 것 = 유저의 아이디
    //받는 것 = 랜덤한 팀 5개 정보(간략한 정보)

    //클라 -> 서버
    //요청하는 것 = 유저의 아이디
    //받는 것 = 랜덤한 사람 5명 정보(간략한 정보)
    const [teamList, setTeamList] = useState([]);
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        searchTeam({team_id:1}, (response) => { setTeamList(response.data) }, (error) => { console.log(error) });
        searchUser({team_id:1}, (response) => { setUserList(response.data) }, (error) => { console.log(error) });
    },[])
    const searchTeamKeywordf = (e) => {
        searchTeamkeyword(e.target.value, (response) => {
            setTeamList(response.data);
            console.log(response.data);
        }, (error) => { console.log(error) });
    }
    
    const searchUserKeywordf = (e) => {
        if (!e.target.value) {
            console.log("check");
        }

        searchUserkeyword(e.target.value, (response) => {
            setUserList(response.data);
            console.log(response.data);
        }, (error) => { console.log(error) });
    }
    

    return (
        <>
            <button onClick={check}>test확인하기</button>
            <input name='email' onChange={changeCheck}></input>
            <input name='password' onChange={changeCheck}></input>
            <input name='name' onChange={changeCheck}></input>
            <button onClick={profilesearch}>가입하기</button>
            <button onClick={Team}>팀만들기</button><br></br>
            팀 검색<input name='name' onChange={searchTeamKeywordf}></input><br></br>
            이름 검색<input onChange={searchUserKeywordf}></input><br></br>
            <input name='name' onChange={searchTeamKeywordf}></input><br></br>
            {/* <TeamList teamlist={ teamList}/>
            <UserList userlist={ userList}/> */}
        </>


)


}