import React, { useEffect, useState } from 'react';
import TeamCard from './TeamCard';
import Modal from './Modal';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';
export default function TeamList( props) {
    const [temp, setTemp] = useState([]);

    useEffect(() => {
       // console.log("tsettestset");
       // console.log(props.teamlist);
        setTemp(props.teamlist);
    });
    
    
    const [modalppen, setModalppen] = useState(false);
    
    const [modaltitle, setModaltitle] = useState("");
    const [modalcontent, setModalcontent] = useState("");
    const [leaderID, setleaderID] = useState("");
    
    const openModal = (title,content) => {
        setModalppen(true);
        setModaltitle(title);
        setModalcontent(content);
        console.log(props);
    }
    const closeModal = () => {
        setModalppen(false);
    }
    
    const gomessanger = (messanger) => {
        setleaderID(messanger);
        Navigate(`/afterlogin/messager/${leaderID}`);
    }

    return (
        <div className='searchSmall'>
            <>
                {/* <Modal open={modalppen}close={closeModal} content={modalcontent} gomessanger={gomessanger} header={modaltitle }>{ modaltitle}</Modal> */}
            </>
        <ul>
            {
                    temp.map((data) => { return <TeamCard click={ openModal} check={data.team_id} data= {data}/>})
            }
            </ul>
        </div>

    )
}
