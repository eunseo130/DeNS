import React, { useState, useEffect, useCallback } from 'react'
import { Outlet, useParams, useNavigate } from 'react-router-dom'
import {
  profileTest,
  profileUpdate,
  putKeyword,
  ImgUpload,
  getKeyword,
} from '../../api/profile'
import { Container, Row, Stack } from 'react-bootstrap'
import ProfileGit from './ProfileGit'
import ProfileTagCloud from './ProfileTagCloud'
import ProfileImage from './ProfileImage'
import ProfileInfo from './ProfileInfo'
import ProfileKeyword from './ProfileKeyword'

export default function ProfileMain() {
  const [inputs, setInputs] = useState({
    name: '',
    position: ' ',
    stack: '',
    email: '',
    keyword: '',
    edit: false,
    gitId: '',
    git: true,
  })
  const { name, position, stack, email, edit, keyword, gitId, git } = inputs
  const [keywords, setKeywords] = useState([])
  const { id } = useParams()
  const [files, setFiles] = useState('')
  const [fileImage, setFileImage] = useState('')
  const [image, setImage] = useState('')
  const [keywordObjs, setKeywordObjs] = useState('')
  // const [localId, setLocalId] = useState('')
  // setLocalId(localStorage.getItem(id))
  // console.log(localId)
  useEffect(() => {
    profileTest(
      id,
      (res) => {
        setInputs({
          ...inputs,
          name: res.data.name,
          position: res.data.position,
          stack: res.data.stack,
          email: res.data.email,
          git: !git,
          gitId: res.data.git_id,
        })
      },
      (error) => console.log(error)
    )
  }, [])
  useEffect(() => {
    getKeywords()
  }, [position,stack])

  function update() {
    profileUpdate(
      [id, position, stack, gitId],
      (res) => {
        console.log('반환시', res.data.git_id, res.data)
        setInputs({
          ...inputs,
          name: res.data.name,
          position: res.data.position,
          stack: res.data.stack,
          email: res.data.email,
          gitId: res.data.git_id,
          git: !git,
          edit: !edit,
        })
      },
      (error) => console.log(error)
    )
    getKeywords()
  }
  function getKeywords() {
    getKeyword(
      id,
      (res) => {
        let words = []
        const keywordObjs = res.data
        keywordObjs.forEach((keywordObj) => {
          const word = {
            value: keywordObj.name,
            count: keywordObj.count,
          }
          words.push(word)
        })
        const value = keywordObjs.reduce(
          (max, p) => (p.count > max ? p.count : max),
          0
        )
        const c = 1 + value
        words.push({ value: position, count: c }, { value: stack, count: c })
        setKeywords(words)
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
  }

  function putKeywords() {
    putKeyword(
      [id, keyword],
      (res) => {
        setKeywords([])
        getKeywords()
        console.log(keywords)
        setInputs({ ...inputs, keyword: '' })
      },
      (error) => console.log(error)
    )
  }

  function onLoad(e) {
    setFiles(e.target.files)
    setFileImage(URL.createObjectURL(e.target.files[0]))
  }

  function ImageUpload(e) {
    const formData = new FormData()
    formData.append('file', files[0])

    ImgUpload(
      [id, formData],
      (res) => {
        setImage(res.data)
        setFiles('')
        window.location.replace(`/auth/profile/${id}`)
      },
      (error) => console.log(error)
    )
  }

  return (
    <div>
      <Container fluid>
        <Row className="justify-content-md-center">
          <ProfileTagCloud keywords={keywords} />
        </Row>
        <Stack gap={3}>
          <Row>
            <ProfileImage
              id={id}
              fileImage={fileImage}
              onLoad={onLoad}
              ImageUpload={ImageUpload}
            />
          </Row>
          <Row className="justify-content-md-center">
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
            <ProfileGit edit={edit} gitId={gitId} onSave={onSave} />
          </Row>
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
