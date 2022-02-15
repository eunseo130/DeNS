import React, { useState } from 'react'
import { Container, Row, Button, Stack, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
export default function ProfileInfo({
  id,
  name,
  edit,
  onSave,
  position,
  stack,
  email,
  update,
  onEdit,
}) {
  return (
    <>
      <div>
        <Stack gap={2}>
          <div>이름:&nbsp; {name}</div>
          <div>
            직무 : &nbsp;
            {edit ? (
              <input onChange={onSave} name="position" value={position} ></input>
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
    </>
  )
}
