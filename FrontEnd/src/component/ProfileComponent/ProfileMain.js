import React, { useState, useEffect } from 'react'
import { Outlet, useParams, Link } from 'react-router-dom'
import { profileTest, profileUpdate, putKeyword } from '../../api/profile'
import ProfileTagCloud from './ProfileTagCloud'

export default function ProfileMain() {
  function componentDidMount() {
    if (!document.getElementById('KakaoJSSDK')) {
      const scriptKakaoJS = document.createElement('script')
      scriptKakaoJS.src = '//developers.kakao.com/sdk/js/kakao.min.js'
      document.body.appendChild(scriptKakaoJS)
    }
  }

  const [inputs, setInputs] = useState({
    image: '',
    namecosn: '',
    position: '',
    stack: ' ',
    email: '',
    keyword: '',
    edit: false,
    gitId: '',
    git: true,
  })
  const { image, name, position, stack, email, edit, keyword, gitId, git } =
    inputs
  const [keywords, setKeywords] = useState([
    { value: position, count: 10000 },
    { value: stack, count: 10000 },
  ])

  const { id } = useParams()
  useEffect(
    () =>
      profileTest(
        id,
        (res) => {
          console.log('가져오기')
          console.log(res)
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
          setKeywords([
            { value: res.data.position, count: 10000 },
            { value: res.data.stack, count: 10000 },
          ])
        },
        (error) => console.log(error)
      ),
    []
  )

  function update() {
    profileUpdate(
      [id, position, stack],
      (res) => {
        console.log('업데이트')
        console.log(res)
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
    console.log('save')
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
        console.log(res.data)
        const keywordObjs = res.data
        keywordObjs.map((keywordObj) => {
          console.log(keywordObj.name, keywordObj.count)
          setKeywords(keywords.concat(keywordObj))
        })
        console.log(keywords)
      },

      (error) => console.log(error)
    )
  }

  return (
    <div>
      <h3>프로필 메인페이지입니다</h3>
      <ProfileTagCloud keywords={keywords} />
      {git ? (
        <img src={`https://ghchart.rshah.org/${gitId} `} />
      ) : (
        <input onChange={onSave} name="gitId" value={gitId}></input>
      )}
      <div>
        <img src={image} alt={name} />
        <p>이름:&nbsp; {name}</p>
        <p>
          직무 : &nbsp;
          {edit ? (
            <input onChange={onSave} name="position" value={position}></input>
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
      키워드를 입력해 주세요.
      <br />
      <input name="keyword" value={keyword} onChange={onSave}></input>
      <button onClick={putKeywords}>전송</button>
      <Outlet />
    </div>
  )
}
