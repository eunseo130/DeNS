import React from 'react'
import { TagCloud } from 'react-tagcloud'
import { Container, Row, Button, Stack, Image } from 'react-bootstrap'
export default function ProfileKeyword({ keyword, onSave, putKeywords }) {
  return (
    <div class="card mb-3">
      <div class="card-body">
        <Stack direction="horizontal" gap={3}>
          <input className="keyword" value={keyword} onChange={onSave}></input>
          <Button
            onClick={putKeywords}
            variant="secondary"
            style={{ width: '20%' }}
          >
            전송
          </Button>
        </Stack>
      </div>
    </div>
  )
}
