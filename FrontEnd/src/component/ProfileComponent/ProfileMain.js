import React, { useState, useEffect } from 'react'
import { Outlet, useParams } from 'react-router-dom'
// import ProfileInfo from './ProfileInfo'
// import ProfileKeyword from './ProfileKeyword.js'
import { TagCloud } from 'react-tagcloud'
import { profileTest, profileUpdate, putKeyword } from '../../api/test'

export default function ProfileMain() {
  const [inputs, setInputs] = useState({
    image: '',
    namecosn: '',
    position: '',
    stack: ' ',
    email: '',
    keyword: '',
    edit: false,
  })
  const { image, name, position, stack, email, edit, keyword } = inputs
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
        const keywordObj = {
          value: res.data.keyword,
          count: res.data.count,
        }
        setKeywords(keywords.concat(keywordObj))
      },
      (error) => console.log(error)
    )
  }

  return (
    <div>
      <h3>프로필 메인페이지입니다</h3>
      <TagCloud minSize={1} maxSize={100} tags={keywords} />
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
      </div>
      키워드를 입력해 주세요.
      <br />
      <input name="keyword" value={keyword} onChange={onSave}></input>
      <button onClick={putKeywords}>전송</button>
      <Outlet />
    </div>
  )
}
