import React, { useState, useEffect }from 'react';
//import { profile, signup, test22,insertTeam, searchTeam ,searchUser, searchTeamkeyword, searchUserkeyword} from '../../api/test';
// import TeamList from './TeamList';
// import UserList from './UserList';
import { searchTeamkeyword,searchUserkeyword, initTeamList } from '../../api/search';
export default function Signup() { 
//     const [input, setInput] = useState({
//         email: '',
//         name: '',
//         password: '',
//     });    
//     useEffect(() => { console.log(input) }, [input]);

//     const changeCheck = (e) => {
//         const { name, value } = e.target;
//         setInput({
//             ...input,
//             [name]: value,
//         }); 
//     }
//     const join = () => {
//         signup(input, (response) => { console.log(response) }, (error) => { console.log(error) });
//     }
    
    
    
//     const [teamList, setTeamList] = useState([]);
//     const [userList, setUserList] = useState([]);
   



//     const profilesearch = () => {
//         profile("1", (response) => { console.log(response) }, (error) => { console.log(error) });
//     }

//     useEffect(() => {
//         initTeamList({team_id:1}, (response) => { setTeamList(response.data) }, (error) => { console.log(error) });
//         initUserList({team_id:1}, (response) => { setUserList(response.data) }, (error) => { console.log(error) });
//     },[])

//     const searchTeamKeywordf = (e) => {
//         searchTeamkeyword(e.target.value, (response) => {
//             setTeamList(response.data);
//             console.log(response.data);
//         }, (error) => { console.log(error) });
//     }
    
//     const searchUserKeywordf = (e) => {
//         if (!e.target.value) {
//             console.log("check");
//         }
//         searchUserkeyword(e.target.value, (response) => {
//             setUserList(response.data);
//             console.log(response.data);
//         }, (error) => { console.log(error) });
//     }
    

    return (
        <>
            {/* <button onClick={check}>test확인하기</button>
            <input name='email' onChange={changeCheck}></input>
            <input name='password' onChange={changeCheck}></input>
            <input name='name' onChange={changeCheck}></input>
            <button onClick={profilesearch}>가입하기</button>
            <button onClick={Team}>팀만들기</button><br></br> */}
           
        </>


)


}