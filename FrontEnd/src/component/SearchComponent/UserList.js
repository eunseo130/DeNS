import React, { useEffect, useState } from 'react';
import UserCard from './UserCard';
import Modal from './Modal';
export default function UserList(props) {
    const [temp, setTemp] = useState([]);
    
    useEffect(() => {
        setTemp(props.userlist);
    });

    const [modalppen, setModalppen] = useState(false);

    const [modaltitle, setModaltitle] = useState("");
    const [modalcontent, setModalcontent] = useState("");
    const [modalprofilekeyword, setModalprofilekeyword] = useState([]);

    const openModal = (title,content,tags) => {
        setModalppen(true);
        setModaltitle(title);
        setModalcontent(content);
        // setModalprofilekeyword(tags);
        // console.log(tags[0].count);
        // console.log(tags[0].name);
        // console.log(tags[0].count);
        let test = [];
        setModalprofilekeyword([]);
        tags.map((data) => {
            test.push({
                value: data.name,
                count:data.count
            });
        })
        
        setModalprofilekeyword(test);

        
    }
    const closeModal = () => {
        setModalppen(false);
    }

    return (
        <>
            <>
                {modalppen ? <Modal open={modalppen} close={closeModal} profile_keyword={modalprofilekeyword} content={modalcontent} header={modaltitle}>{modaltitle}</Modal> : ``}
            </>
            <ul>
                {temp.map((data) => {return <UserCard  click={openModal} check= {data.profile_id} data={data}/>}) }
            </ul>
        </>
    )
}
