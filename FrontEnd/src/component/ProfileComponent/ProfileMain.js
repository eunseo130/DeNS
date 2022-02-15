import { store } from '../..'
import { API_BASE_URL } from '../../config'
import React, { useState, useEffect } from 'react'
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
import axios from 'axios'
import { useCookies } from 'react-cookie'
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
  const userId = store.getState().user.profileid
  const [cookies] = useCookies(['token'])
  const authAxios = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      Authorization: `Bearer "${cookies.token}"`,
      withCredentials: true,
    },
  })
  useEffect(() => {
    authAxios
      .get(`/profile/${id}`)
      .then((res) => {
        setInputs({
          ...inputs,
          name: res.data.name,
          position: res.data.position,
          stack: res.data.stack,
          email: res.data.email,
          git: !git,
          gitId: res.data.git_id,
        })
      })
      .catch((error) => console.log(error))
  }, [])
  useEffect(() => {
    getKeywords()
  }, [position, stack])

  function getKeywords() {
    authAxios
      .get(`/profile/keyword/${id}`)
      .then((res) => {
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
      })
      .catch((error) => console.log(error))
  }

  function update() {
    authAxios
      .put(`/profile/${id}`, {
        position: position,
        stack: stack,
        git_id: gitId,
      })
      .then((res) => {
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
      })
      .catch((error) => console.log(error))

    getKeywords()
  }

  function putKeywords() {
    authAxios
      .post(`/profile/keyword/${id}`, null, { params: { content: keyword } })
      .then((res) => {
        setKeywords([])
        getKeywords()
        console.log(keywords)
        setInputs({ ...inputs, keyword: '' })
      })
      .catch((error) => console.log(error))
  }

  function ImageUpload(e) {
    const formData = new FormData()
    formData.append('file', files[0])
    authAxios
      .post(`/profile/update/image/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        setImage(res.data)
        setFiles('')
        window.location.replace(`/auth/profile/${id}`)
      })
      .catch((error) => console.log(error))
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
  function onLoad(e) {
    setFiles(e.target.files)
    setFileImage(URL.createObjectURL(e.target.files[0]))
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
              authAxios={authAxios}
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
              gitId={gitId}
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
