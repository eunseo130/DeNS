import React from 'react'
import { TagCloud } from 'react-tagcloud'
import { Container, Row, Button, Stack, Image } from 'react-bootstrap'
export default function ProfileKeyword({ keyword, onSave, putKeywords }) {
  return (
    <>
      <Stack direction="horizontal" gap={3}>
        <input name="keyword" value={keyword} onChange={onSave}></input>
        <Button onClick={putKeywords} variant="secondary">
          전송
        </Button>
      </Stack>
    </>
  )
}
