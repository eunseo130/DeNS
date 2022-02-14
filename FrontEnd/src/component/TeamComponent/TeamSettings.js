import React, { useState } from 'react';
import axios from 'axios';
import { titleChange, teamBreakup, detail, dischargeMembers } from '../../api/team';
import { useEffect } from 'react';
import styled from "styled-components";

export default function TeamSettings() {
		const [title, setTitle] = useState('');
		const [membersName, setMemberName] = useState('');
		const [email, setMembersEmail] = useState('');

		const changeName = (e) => {
			setTitle(e.target.value);
		}

		const toChangeTitle = (e) => {
			e.preventDefault();
			const formData = new FormData();
			formData.append("title", JSON.stringify(title));
			
			setTitle(''); // 초기화
			titleChange(
			1, 5, title,
			(response) => {
				console.log(response);
			},
			(error) => {
				console.log('오류', error);
			})
		}


		const TeamDelete = (e) => {
			teamBreakup(
				5,
				(response) => {
					console.log(response);
				},
				(error) => {
					console.log("오류", error);
				}
			)
		}	

		const outMembers = (e) => {
			dischargeMembers(
				5, email,
				(response) => {
					console.log(response);
				},
				(error) => {
					console.log(error);
				}
			)
		}

		useEffect(() => {
			detail(
				5,
				(response) => {
					// console.log(response.data[5][0].team.team_member);
					// console.log(response.data[5][0].team.team_member[1].user.name);
					// setMemberName(response.data[5][0].team.team_member[1].user.name);
					setMemberName(response.data[5][0].team.team_member[1].user.name);
					setMembersEmail(response.data[5][0].team.team_member[1].user.email);
				},
				(error) => {
					console.log(error);
				}
		)}, [])


		

    return (
				<Container>
					<h3>팀 관리 페이지</h3>

					<hr />

					<div>
						<h3>팀 이름 변경</h3>
						<input type="text" onChange={changeName}/>						
					</div>
					<button onClick={toChangeTitle}>보내기</button>
					
					<hr />

					<h3>팀 멤버 관리</h3>
					{membersName}, {email} 
					<button onClick={outMembers}>팀원 방출하기</button>
					{/* {membersName ? membersName.map((el, key) => {
						return (
							<div>
								<SettingsMembers
									key={key+1}
									name={el}
								/>
							</div>
						)
					}): null} */}
					<hr />
					<button onClick={TeamDelete}>팀 삭제하기</button>

        </Container>
    )
}
const Container = styled.div`
	position: absolute;
	width: 60%;
	height: 60%;

	top: 35%;
	left: 50%;
	transform:translate(-50%, -50%);
`

const SettingsMembers = styled.div`
`