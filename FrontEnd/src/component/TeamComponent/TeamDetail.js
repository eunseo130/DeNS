import React, { useEffect, useState } from 'react';
import { detail, bringTeamMembers, checkLeader } from '../../api/team';
import styled from "styled-components";
import { useParams } from 'react-router-dom';
import TeamFeedContainer from './TeamFeedContainer';
import TeamMemberInfo from './TeamMemberInfo'
import MembersImg from './MembersImg';
import { Link } from "react-router-dom";

export default function TeamDetail(props) {
    const [teamTitle, setTeamTitle] = useState('');
    const [teamContent, setTeamContent] = useState('');
    const [teamMembers, setTeamMembers] = useState('');
		const [email, setEmail] = useState('');

    const teamId = useParams().id;
    // 팀 명 및 팀 소개
    useEffect(() => {
        detail(teamId,
            (response) => {
								console.log(response)
                setTeamTitle(response.data[teamId][0].team.content);
                setTeamContent(response.data[teamId][0].team.title);
            },
            (error) => {
                console.log("오류가 됨.", (error));
            });
        },[]);
        
    // 팀원 정보 가져오기
    useEffect(() => {
        bringTeamMembers(teamId,
            (response) => {
                setTeamMembers(response.data);
								setEmail("ssafy3@naver.com") // formData 전송 용
            },
            (error) => {
                console.log("오류가 됨.", (error));
            });
        },[]);
		
		// 리더 확인
		useEffect(() => {
			// const formData = new FormData();
			// formData.append('email', email);
			// console.log(email);
			checkLeader(
				teamId, "ssafy3@naver.com",
				(response) => {
					console.log("리더 확인", response);
				},
				(error) => {
					console.log("리더 확인", error);
				}
			)
		}, [])	
    return (

    <TeamDetailBox>
        <TeamDetailHeaders>
					<Link to={{pathname:`/auth/team/${teamId}/settings`}}>
							<button>팀 설정</button>
					</Link>
					{/* 팀 Title */}
					<TheTeamTitle>
							{teamTitle}
					</TheTeamTitle>
        </TeamDetailHeaders>
        <TeamDetailGrid>
            {/* 팀 피드 */}
            <TeamFeedContainer>
            </TeamFeedContainer>

            {/* 팀 소개 */}
            <TeamInfoContainer>
                <TeamInfoTitle>팀 소개</TeamInfoTitle>
                {/* 팀장/팀원 이미지 */}
                <ImgBox>
                    {teamMembers ? teamMembers.map((el, key) => {
                        return (
                            <TeamMemberInfo name={el.name} email={el.email} key={key}/>
                        )
                    }) : null}
                    <BringTeamMembersImg 
                    src="https://w.namu.la/s/38cf17d29ddeab5a69f6de682176bbd6b8f71285f5adc1d5465c910f8d7651e8f82db2bdba9e25f1d29affdedb9ddc04edeadc4e7f539ce975eaad093a2b8c68adc73e19b58ff0f4cce679d2f2bb15e273bdcaa5e3db26bd4464e1707b67c69a"
                    ></BringTeamMembersImg>
                    <BringTeamMembersImg 
                    src="https://w.namu.la/s/38cf17d29ddeab5a69f6de682176bbd6b8f71285f5adc1d5465c910f8d7651e8f82db2bdba9e25f1d29affdedb9ddc04edeadc4e7f539ce975eaad093a2b8c68adc73e19b58ff0f4cce679d2f2bb15e273bdcaa5e3db26bd4464e1707b67c69a"
                    ></BringTeamMembersImg>
                    <BringTeamMembersImg 
                    src="https://w.namu.la/s/38cf17d29ddeab5a69f6de682176bbd6b8f71285f5adc1d5465c910f8d7651e8f82db2bdba9e25f1d29affdedb9ddc04edeadc4e7f539ce975eaad093a2b8c68adc73e19b58ff0f4cce679d2f2bb15e273bdcaa5e3db26bd4464e1707b67c69a"
                    ></BringTeamMembersImg>
                    <BringTeamMembersImg 
                    src="https://w.namu.la/s/38cf17d29ddeab5a69f6de682176bbd6b8f71285f5adc1d5465c910f8d7651e8f82db2bdba9e25f1d29affdedb9ddc04edeadc4e7f539ce975eaad093a2b8c68adc73e19b58ff0f4cce679d2f2bb15e273bdcaa5e3db26bd4464e1707b67c69a"
                    ></BringTeamMembersImg>
                </ImgBox>
                {/* 팀 Content */}
                <TeamInfoTextBox>
                    <TextBox>
                        {teamContent}
                    </TextBox>
                </TeamInfoTextBox>
                {/* 팀 소개 해쉬태그 */}
                <TeamInfoHashtag>
                    #자바스크립트 #프론트엔드 #자바
                </TeamInfoHashtag>
            </TeamInfoContainer>
        </TeamDetailGrid>
    </TeamDetailBox>

    )
}
const TeamDetailHeaders = styled.div`
	display: flex;
`
const TeamDetailBox = styled.div`
`
const TheTeamTitle = styled.h3`
    position: relative;
    margin-top: 2%;
    left: 5%;
`
const TeamDetailGrid = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform:translate(-50%, -50%);
    display: flex;
    grid-gap: 14%;
    justify-content: center;
    align-items: flex-start;
    height: 60vh;
    width: 80vw;

    // grid-template-columns: 45vw 20vw;
    // grid-template-rows: 70vh 40vh;
`

// 팀 소개
const TeamInfoContainer = styled.div`
    border: 1px solid;
    // text-align: center;
    border-radius: 5px;

    display: flex;
    flex-direction: column;
    height: 40vh;
    width: 20vw;
    overflow: scroll;

`
const TeamInfoTitle = styled.h3`
    position: relative;
    margin-top: 5%;
    left: 5%;
    font-weight: bold;
`
const BringTeamMembersImg = styled.img`
    width: 50px;
    height: 50px;
`
const ImgBox = styled.div`
    position: relative;
    left: 5%;
    margin-top: 5%;
    width:90%;
`
const TeamInfoTextBox = styled.div`
    position: relative;
    margin-top: 5%;
    left: 5%;
    width: 90%;
    word-break:break-all;
`
const TextBox = styled.div`
`
const TeamInfoHashtag = styled.div`
    position: relative;
    margin-top: 5%;
    left: 5%;
    width: 90%;
    word-break:break-all;
`