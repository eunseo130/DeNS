import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { teamFeed, editTeamFeed, deleteTeamFeed } from "../../api/team";
import { useParams } from 'react-router-dom';

export default function TeamFeedIndex() {

	const teamId = useParams().id;
	const [feedIndex, setFeedIndex] = useState([]);
	const [showInput, setShowInput] = useState(false);
	const [showEdit, setShowEdit] = useState(false);
	const [editContent, setEditContent] = useState('');
  const [img, setImg] = useState([]);
  const [file, setFile] = useState([]);
	const [imgName, setImgName] = useState('');
	const [fileName, setFileName] = useState('');
	const [inputs, setInputs] = useState({
    images: null,
    files: null,
  });

	// const [theImgs, setTheImgs] = useState('');

	
  // 피드 정보 가져오기
  useEffect(() => {
    teamFeed(teamId,
      (response) => {
				setFeedIndex(response.data);
				// const url = window.URL.createObjectURL(
        //   new Blob([res.data], { type: res.headers['content-type'] })
        // )
        // setTheImgs(url) 
      },
      (error) => {
          console.log("오류가 됨.", (error));
      }); 
  }, []);
  
	// 피드 수정 input
	const changeContent = (e) => {
		setEditContent(e.target.value);
	}
	// 피드 수정 image, file
	const setTheImg = (e) => {
    setImg(e.target.files[0])
  }
  const setTheFile = (e) => {
    setFile(e.target.files[0])
  }
	// 피드 수정 image, file 이름 표시
	const handleInput = (e) => {
    const { name, value } = e.target;
    setInputs({
        ...inputs,
        [name]: value,
    });
  }
	// 피드 수정 시 이미지/파일 이름 표기 용
	useEffect(() => {
    setImgName(inputs.images);
    setFileName(inputs.files);
  })

	// 피드 수정 완료 button
	const submitContent = ({teamFeedId, formData}) => {
		editTeamFeed(
			[teamFeedId, 1, formData],
			(response) => {
				console.log(response);
				console.log([teamFeedId, 1, formData]);
			},
			(error) => {
				console.log(error);
				console.log([teamFeedId, 1, formData]);
			}
		)
	}

	// 피드 삭제
	const feedDelete = (teamFeedId) => {
		deleteTeamFeed(
			teamFeedId, 1,
			(response) => {
				console.log(response);
			},
			(error) => {
				console.log(error);
			}
		)
	}
	
	{/* { `${feedIndex[i].teamFeedFiles[0].originalFileName}` } */}
	// Index 렌더링
	const membersInfo = () => {
		const result = [];
		for (let i=0; i < feedIndex.length; i++) {
			const teamFeedId = feedIndex[i].teamfeed_id;
			const formData = new FormData();
			formData.append("content", editContent);
			formData.append("imageFiles", img);
			formData.append("generalFiles", file);

			// 자신이 작성한 글 edit/delete 할 수 있도록
			// if (feedIndex[i].writer === "seol") {
			// 	setShowEdit(!showEdit)
			// }
			// if (feedIndex[i].writer === "seol") {
			// 	setShowEdit(!showEdit)
			// }
			const WriterBtn = styled.div`
				${(  ) => {
					return feedIndex[i].writer === "seol" ? 'display: flex' : 'display: none';
				}}
			`

			result.push(
				 <Feed key={i}>
					 <FeedContent>
						<div>
							{ `${feedIndex[i].content}` }
							{/* {`${feedIndex[i].teamFeedFiles[0]}`} */}
						</div>
						
						<div>
							{showInput && 
								<EditBox>
									<input onChange={changeContent} />
									<ImgInputLabel onChange={handleInput} htmlFor="img-edit-input">
										<img src="https://img.icons8.com/ios/50/000000/image.png" width="20vw" height="20vh"/>
										<FeedImgUpload onChange={setTheImg} name="images" id="img-edit-input" type="file" hidden />
									</ImgInputLabel>
									<ImgInputLabel onChange={handleInput} htmlFor="file-edit-input">
										<img src="https://img.icons8.com/material-outlined/96/000000/add-file.png" width="20vw" height="20vh" />
										<FeedImgUpload onChange={setTheFile} name="files" id="file-edit-input" type="file" hidden />
									</ImgInputLabel>
									<button onClick={() => {submitContent({teamFeedId, formData})}}>확인</button>
									<div>
										{imgName}
										{fileName}
									</div>
								</EditBox>
							}
						</div>
					 </FeedContent>

						<WriterBtn>
							<EditBtn onClick={() => {setShowInput(!showInput)}}>글 수정</EditBtn>
							<DeleteBtn onClick={() => {feedDelete(teamFeedId)}}>글 삭제</DeleteBtn>
						</WriterBtn>
					
				 </Feed>
			)
		}
		return result;
	};

    return (
        <IndexContainer>
					{membersInfo()}
        </IndexContainer>
    )
};

const IndexContainer = styled.div`
    position: relative;
    margin-top: 5%;
    left: 5%;
    width: 90%;
`
const Feed = styled.div`
		display: flex;
		justify-content: space-between;
    margin-top: 1vh;
    width: 100%;
    word-break:break-all;
		border-bottom: 1px solid #aaa;
`
const FeedContent = styled.div`
	display: flex;
	flex-direction: column;
`
const EditBtn = styled.button`
		position: relative;
`

const ImgInputLabel = styled.label`
  border: none;
  background-color: white;
  color: white;
  margin-left: 5%;
`
const FeedImgUpload = styled.input`
  border: none;
  background-color: white;
`
const EditBox = styled.div`
	display: flex;
`
const DeleteBtn = styled.button`
`
