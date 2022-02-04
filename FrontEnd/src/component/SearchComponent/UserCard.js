import React from "react";
import styled from "styled-components";
import { searchprofileID } from "../../api/search";

export default function UserCard(props){
    console.log(props.data);
    
    const check = () => {
        // console.log(props.check);
        searchprofileID(props.check,(response) => {console.log(response.data)}, (error)=> {console.log(error)});
    }


    return(
        <UserCarddg onClick={check}>
            <p>{props.data.email}</p>
            <p>{props.data.name}</p>
            <p>{props.data.position}</p>
            <p>{props.data.stack}</p>
            <hr/>
        </UserCarddg>



    )


}
const UserCarddg = styled.div`
    &:hover{
        background: black;
    }
`