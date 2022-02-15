import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { titleChange, teamBreakup, detail, dischargeMembers } from '../../api/team';
import styled from "styled-components";
import { useParams } from 'react-router-dom';

export default function TeamSettings() {

		// profile_id, team_id 불러오기 필요

		const [title, setTitle] = useState('');
		const [membersName, setMemberName] = useState('');
		const [membersEmail, setMembersEmail] = useState('');
		const [members, setMembers] = useState('');

		const teamId = useParams().id;

		const changeName = (e) => {
			setTitle(e.target.value);
		}

		const toChangeTitle = (e) => {
			e.preventDefault();
			const formData = new FormData();
			formData.append("title", JSON.stringify(title));
			
			setTitle(''); // 초기화
			titleChange(
			1, teamId, title,
			(response) => {
				console.log(response);
			},
			(error) => {
				console.log('오류', error);
			})
		}

		// 팀 삭제하기
		const TeamDelete = (e) => {
			teamBreakup(
				teamId,
				(response) => {
					console.log(response);
				},
				(error) => {
					console.log("오류", error);
				}
			)
		}	

		
		// 팀원 멤버 정보 가져오기
		useEffect(() => {
			detail(
				teamId,
				(response) => {
					// console.log(response.data[5][0].team.team_member);
					// console.log(response.data[5][0].team.team_member[1].user.name);
					setMemberName(response.data[5][0].team.team_member[1].user.name);
					setMembersEmail(response.data[5][0].team.team_member[1].user.email);
					// console.log(response.data[teamId][0].team.team_member)
					setMembers(response.data[teamId][0].team.team_member);
				},
				(error) => {
					console.log('에러', error);
				}
				)}, [])
		
		// 팀원 멤버 정보 가져오기
		const membersInfo = () => {
			// 팀원 방출하기
			const outMembers = (email) => {
				dischargeMembers(
					teamId, email,
					(response) => {
						console.log(response);
						console.log(email, "성공")
					},
					(error) => {
						console.log('오류', error);
						console.log(email, "실패")
					}
				)
			}
			const result = [];
			for (let i=1; i < members.length; i++) {
				const email = members[i].user.email
				result.push(
				 <div key={i}>
					 { `${members[i].user.name}` }
					 { `${members[i].user.email}` }
					 <button onClick={() => outMembers(email)}>방출하기</button>
				 </div> 
				)
				
			}
			return result;
		};

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
					{/* {membersName}, {email} */}
					{membersInfo()}
					{/* {console.log(membersInfo)} */}

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