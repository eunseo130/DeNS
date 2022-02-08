import React from "react";
import styled from "styled-components";
import { searchprofileID } from "../../api/search";

export default function UserCard(props){
    const check = () => {
        props.click(props.data.name,props.data.email,props.data.profile_keyword);
        searchprofileID(props.check,(response) => {console.log(response.data)}, (error)=> {console.log(error)});
    }

    return(
        <UserCarddg onClick={check}>
            <p>{props.data.email}</p>
            <p>{props.data.name}</p>
            <p>{props.data.position}</p>
            <p>{props.data.stack}</p>
            {/* <p>{props.data.}</p> */}
        </UserCarddg>
    )
}
const UserCarddg = styled.div`
width: 500px;
border: 1px solid black;
    &:hover{
        background: black;
    }
`