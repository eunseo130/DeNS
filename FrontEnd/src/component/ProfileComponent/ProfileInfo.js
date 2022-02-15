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
  gitId,
}) {
  return (
    <>
      <div>
        <Stack gap={2}>
          <div>Name:&nbsp; {name}</div>
          <div>E-mail:&nbsp; {email}</div>
          <div>
            Position : &nbsp;
            {edit ? (
              <input onChange={onSave} name="position" value={position}></input>
            ) : (
              position
            )}
          </div>
          <div>
            Stack : &nbsp;
            {edit ? (
              <input onChange={onSave} name="stack" value={stack}></input>
            ) : (
              stack
            )}
          </div>
          <div>Git ID:&nbsp;{gitId}</div>
          {edit ? (
            <>
              <input name="gitId" value={gitId} onChange={onSave}></input>
            </>
          ) : (
            <></>
          )}
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
