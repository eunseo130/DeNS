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
  const options = {
    luminosity: 'bright',
    hue: 'pink',
  }
  const [fileImage, setFileImage] = useState('')

  return (
    <div>
      <Container fluid>
        <Row className="justify-content-md-center">
          <TagCloud
            minSize={10}
            maxSize={40}
            tags={keywords}
            style={{ width: 600, textAlign: 'center' }}
            colorOptions={options}
          />
        </Row>
        <Stack direction="horizontal" gap={3}>
          <div>
            <Stack gap={2}>
              <div>
                <Image
                  width={180}
                  height={180}
                  src={`http://3.36.131.59:2222/profile/image/${id}`}
                  roundedCircle
                />
                {fileImage && (
                  <Image
                    alt="sample"
                    src={fileImage}
                    style={{ margin: 'auto' }}
                    thumbnail
                  />
                )}
                <div className="img-box"></div>
                <form>
                  <input
                    id="imgInput"
                    name="image"
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={onLoad}
                  ></input>
                  <label name="ImgBtn" htmlFor="imgInput">
                    프로필 사진 등록
                  </label>
                </form>
                <button onClick={ImageUpload}>저장하기</button>
              </div>
              <div>이름:&nbsp; {name}</div>
              <div>
                직무 : &nbsp;
                {edit ? (
                  <input
                    onChange={onSave}
                    name="position"
                    value={position}
                  ></input>
                ) : (
                  position
                )}
              </div>
              <div>
                스택 : &nbsp;
                {edit ? (
                  <input onChange={onSave} name="stack" value={stack}></input>
                ) : (
                  stack
                )}
              </div>
              <div>이메일:&nbsp; {email}</div>
              <div>
                {edit ? (
                  <Button onClick={update} size="sm" variant="secondary">
                    확인
                  </Button>
                ) : (
                  <Button onClick={onEdit} size="sm" variant="secondary">
                    편집
                  </Button>
                )}
              </div>
              <div>
                <Button variant="link">
                  <Link to={`/afterlogin/messenger/${id}`}>메세지</Link>
                </Button>
              </div>
            </Stack>
          </div>
          <div className="vr" />
          <div>
            {!edit ? (
              <img src={`https://ghchart.rshah.org/${gitId} `} />
            ) : (
              <input name="gitId" value={gitId} onChange={onSave}></input>
            )}
          </div>
        </Stack>

        <Row>
          <Stack direction="horizontal" gap={3}>
            <input name="keyword" value={keyword} onChange={onSave}></input>
            <Button onClick={putKeywords} variant="secondary">
              전송
            </Button>
          </Stack>
        </Row>
        <Outlet />
      </Container>
    </div>
  )
}
