import React from 'react'
import { TagCloud } from 'react-tagcloud'

export default function ProfileTagCloud({keywords}) {
  return (
    <>
      <TagCloud minSize={1} maxSize={100} tags={keywords} />
    </>
  )
}
