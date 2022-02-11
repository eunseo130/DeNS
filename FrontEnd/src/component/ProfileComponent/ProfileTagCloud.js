import React from 'react'
import { TagCloud } from 'react-tagcloud'

export default function ProfileTagCloud({ keywords }) {
  const options = {
    luminosity: 'bright',
    hue: 'pink',
  }
  return (
    <>
      <TagCloud
        minSize={10}
        maxSize={40}
        tags={keywords}
        style={{ width: 600, textAlign: 'center' }}
        colorOptions={options}
      />
    </>
  )
}
