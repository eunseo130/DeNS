import React, { useState, useEffect } from 'react'
import { Outlet, useParams, Link } from 'react-router-dom'
import {
  profileTest,
  profileUpdate,
  putKeyword,
  ImgUpload,
} from '../../api/profile'
import { TagCloud } from 'react-tagcloud'
import { Container, Row, Button, Stack, Image } from 'react-bootstrap'
import ProfileGit from './ProfileGit'
import ProfileTagCloud from './ProfileTagCloud'
import ProfileImage from './ProfileImage'
import ProfileInfo from './ProfileInfo'
import ProfileKeyword from './ProfileKeyword'
export default function ProfileMain() {
  const [inputs, setInputs] = useState({
    image: '',
    namecosn: '',
    position: ' ',
    stack: '',
    email: '',
    keyword: '',
    edit: false,
    gitId: 'sss',
    git: true,
  })
  const { image, name, position, stack, email, edit, keyword, gitId, git } =
    inputs
  const [keywords, setKeywords] = useState([])
  const { id } = useParams()
  const [files, setFiles] = useState('')
  useEffect(
    () =>
      profileTest(
        id,
        (res) => {
          setInputs({
            ...inputs,
            image: res.data.image,
            name: res.data.name,
            position: res.data.position,
            stack: res.data.stack,
            email: res.data.email,
            git: !git,
            gitId: res.data.git_id,
          })
          let words = [
            { value: res.data.position, count: 10000 },
            { value: res.data.stack, count: 10000 },
          ]
          const keywordObjs = res.data.profile_keyword
          keywordObjs.forEach((keywordObj) => {
            const word = {
              value: keywordObj.name,
              count: keywordObj.count,
            }
            words.push(word)
          })
          setKeywords(words)
        },
        (error) => console.log(error)
      ),
    []
  )

  function update() {
    console.log('업데이트 클릭시', gitId, inputs)
    profileUpdate(
      [id, position, stack, gitId],
      (res) => {
        console.log('반환시', res.data.git_id, res.data)
        setInputs({
          ...inputs,
          image: res.data.image,
          name: res.data.name,
          position: res.data.position,
          stack: res.data.stack,
          email: res.data.email,
          gitId: res.data.git_id,
          git: !git,
          edit: !edit,
        })
        setKeywords([
          { value: position, count: 10000 },
          { value: stack, count: 10000 },
        ])
      },
      (error) => console.log(error)
    )
  }

  function onEdit() {
    setInputs({
      ...inputs,
      edit: !edit,
    })
  }
  function onSave(e) {
    const { value, name } = e.target
    setInputs({
      ...inputs,
      [name]: value,
    })
    console.log(gitId)
  }

  function putKeywords() {
    putKeyword(
      [id, keyword],
      (res) => {
        const keywordObjs = res.data
        setKeywords([])
        let words = [
          { value: position, count: 10000 },
          { value: stack, count: 10000 },
        ]
        keywordObjs.map((keywordObj) => {
          const word = {
            value: keywordObj.name,
            count: keywordObj.count,
          }
          words.push(word)
        })
        setKeywords(words)
        setInputs({ ...inputs, keyword: '' })
      },
      (error) => console.log(error)
    )
  }

  function onLoad(e) {
    setFiles(e.target.files)
    setFileImage(URL.createObjectURL(e.target.files[0]))
  }
  useEffect(() => {}, [files])

  function ImageUpload(e) {
    const formData = new FormData()
    formData.append('file', files[0])
    console.log(files[0])
    for (var pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1])
    }

    ImgUpload(
      [id, formData],
      (res) => {
        setInputs({ ...inputs, image: res.data })
        setFiles('')
      },
      (error) => console.log(error)
    )
  }

  const [fileImage, setFileImage] = useState('')

  return (
    <div>
      <Container fluid>
        <Row className="justify-content-md-center">
          <ProfileTagCloud keywords={keywords} />
        </Row>
        <Stack gap={3}>
          <ProfileImage
            id={id}
            image={image}
            fileImage={fileImage}
            onLoad={onLoad}
            ImageUpload={ImageUpload}
          />

          <ProfileInfo
            id={id}
            name={name}
            edit={edit}
            position={position}
            stack={stack}
            email={email}
            onSave={onSave}
            update={update}
            onEdit={onEdit}
          />
          <div className="vr" />
          <ProfileGit edit={edit} gitId={gitId} onSave={onSave} />
        </Stack>

        <Row>
          <ProfileKeyword
            keyword={keyword}
            onSave={onSave}
            putKeywords={putKeywords}
          />
        </Row>
        <Outlet />
      </Container>
    </div>
  )
}
