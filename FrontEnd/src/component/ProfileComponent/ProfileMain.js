import React, { useState, useEffect } from 'react'
import { Outlet, useParams, Link } from 'react-router-dom'
import { profileTest, profileUpdate, putKeyword } from '../../api/profile'
import { TagCloud } from 'react-tagcloud'
import { Container, Row, Col } from 'react-bootstrap'
export default function ProfileMain() {
  const [inputs, setInputs] = useState({
    image: '',
    namecosn: '',
    position: ' ',
    stack: '',
    email: '',
    keyword: '',
    edit: false,
    gitId: '',
    git: true,
  })
  const { image, name, position, stack, email, edit, keyword, gitId, git } =
    inputs
  const [keywords, setKeywords] = useState([])
  const { id } = useParams()
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
            gitId: res.data.gitId,
          })
          let words = [
            { value: res.data.position, count: 10000 },
            { value: res.data.stack, count: 10000 },
          ]
          const keywordObjs = res.data.profile_keyword
          console.log(keywordObjs)
          keywordObjs.map((keywordObj) => {
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
    profileUpdate(
      [id, position, stack],
      (res) => {
        setInputs({
          ...inputs,
          image: res.data.image,
          name: res.data.name,
          position: res.data.position,
          stack: res.data.stack,
          email: res.data.email,
          gitId: res.data.gitId,
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

  return (
    <div>
      <h3>프로필 메인페이지입니다</h3>
      <Container>
        <Row>
          <TagCloud
            minSize={1}
            maxSize={100}
            tags={keywords}
            key={keywords.profilekeyword_id}
          />
        </Row>
        <Row>
          <Col>
            <div>
              <img src={image} alt={name} />
              <p>이름:&nbsp; {name}</p>
              <p>
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
              </p>
              <p>
                스택 : &nbsp;
                {edit ? (
                  <input onChange={onSave} name="stack" value={stack}></input>
                ) : (
                  stack
                )}
              </p>
              <p>이메일:&nbsp; {email}</p>
              {edit ? (
                <button onClick={update}>확인</button>
              ) : (
                <button onClick={onEdit}>편집</button>
              )}

              <button>
                <Link to={`/afterlogin/messenger/${id}`}>메세지</Link>
              </button>
            </div>
          </Col>
          <Col>
            {git&&!edit ? (
              <img src={`https://ghchart.rshah.org/${gitId} `} />
            ) : (
              <input onChange={onSave} name="gitId" value={gitId}></input>
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            <input name="keyword" value={keyword} onChange={onSave}></input>
          </Col>
          <Col>
            <button onClick={putKeywords}>전송</button>
          </Col>
        </Row>
        <Outlet />
      </Container>
    </div>
  )
}
