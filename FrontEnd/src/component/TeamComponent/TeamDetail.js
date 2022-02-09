import React, { useEffect, useState } from 'react';
import { detail } from '../../api/team';
import styled from "styled-components";
import { useParams } from 'react-router-dom';
import TeamFeedIndex from './TeamFeedIndex';

export default function TeamDetail(props) {
    const [teamTitle, setTeamTitle] = useState('');

    const teamId = useParams().id;
    useEffect(() => {
        detail(teamId,
            (response) => {
                console.log(response)
                setTeamTitle(response.data.title);
            },             
            (error) => {
                console.log("오류가 됨.", (error));
            });
        },[]);
    console.log(teamTitle)

    return (

        <TeamDetails>
            <TeamFeedContainer>
                <TeamFeedTitle>팀 피드</TeamFeedTitle>
                <TeamFeedInput placeholder="작성할 피드를 입력해주세요"/>
                <TeamFeedIndex/>
            </TeamFeedContainer>

            <TeamInfoContainer>
                <TeamInfoTitle>팀 소개</TeamInfoTitle>
                <ImgBox>
                    <TeamMembersImg 
                    src="https://w.namu.la/s/38cf17d29ddeab5a69f6de682176bbd6b8f71285f5adc1d5465c910f8d7651e8f82db2bdba9e25f1d29affdedb9ddc04edeadc4e7f539ce975eaad093a2b8c68adc73e19b58ff0f4cce679d2f2bb15e273bdcaa5e3db26bd4464e1707b67c69a"
                    ></TeamMembersImg>
                    <TeamMembersImg 
                    src="https://w.namu.la/s/38cf17d29ddeab5a69f6de682176bbd6b8f71285f5adc1d5465c910f8d7651e8f82db2bdba9e25f1d29affdedb9ddc04edeadc4e7f539ce975eaad093a2b8c68adc73e19b58ff0f4cce679d2f2bb15e273bdcaa5e3db26bd4464e1707b67c69a"
                    ></TeamMembersImg>
                    <TeamMembersImg 
                    src="https://w.namu.la/s/38cf17d29ddeab5a69f6de682176bbd6b8f71285f5adc1d5465c910f8d7651e8f82db2bdba9e25f1d29affdedb9ddc04edeadc4e7f539ce975eaad093a2b8c68adc73e19b58ff0f4cce679d2f2bb15e273bdcaa5e3db26bd4464e1707b67c69a"
                    ></TeamMembersImg>
                    <TeamMembersImg 
                    src="https://w.namu.la/s/38cf17d29ddeab5a69f6de682176bbd6b8f71285f5adc1d5465c910f8d7651e8f82db2bdba9e25f1d29affdedb9ddc04edeadc4e7f539ce975eaad093a2b8c68adc73e19b58ff0f4cce679d2f2bb15e273bdcaa5e3db26bd4464e1707b67c69a"
                    ></TeamMembersImg>
                </ImgBox>
                <TeamInfoTextBox>
                    <TextBox>
                        github: github.com/kimhyeongjun95
                    </TextBox>
                    <TextBox>
                        notion: https://www.notion.so/2c635564feb0470a957a99d57a6991ad
                    </TextBox>
                    <div>
                        우리는 스파르탄입니다.
                    </div>
                    <div>
                        AI와 머신러닝을 기반으로 영화 추천 서비스를 개발합니다.
                    </div>
                </TeamInfoTextBox>
                <TeamInfoHashtag>
                    #자바스크립트 #프론트엔드 #자바
                </TeamInfoHashtag>
            </TeamInfoContainer>
        </TeamDetails>
    )
}

const TeamDetails = styled.div`
    position: absolute;
    top: 40%;
    left: 50%;
    transform:translate(-50%, -50%);
    display: grid;
    grid-template-columns: 45vw 20vw;
    // grid-template-rows: 70vh 40vh;
    grid-gap: 14%;
`

// 팀 피드
const TeamFeedContainer = styled.div`
    border: 1px solid;
    // text-align: center;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: start;
`
const TeamFeedTitle = styled.h3`
    position: relative;
    margin-top: 5%;
    left: 5%;
    font-weight: bold;
`
const TeamFeedInput = styled.input`
    position: relative;
    margin-top: 5%;
    width: 80%;
    left: 5%;
`

// 팀 소개
const TeamInfoContainer = styled.div`
    border: 1px solid;
    // text-align: center;
    border-radius: 5px;

    display: flex;
    flex-direction: column;
    align-items: start;
`
const TeamInfoTitle = styled.h3`
    position: relative;
    margin-top: 5%;
    left: 5%;
    font-weight: bold;
`
const TeamMembersImg = styled.img`
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