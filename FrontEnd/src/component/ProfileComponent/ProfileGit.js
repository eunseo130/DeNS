import React from 'react';
import { TagCloud } from 'react-tagcloud'

export default function ProfileGit({edit,gitId,onSave}) {
    return (
      <div>
        {!edit ? (
          <img src={`https://ghchart.rshah.org/${gitId} `} />
        ) : (
          <input name="gitId" value={gitId} onChange={onSave}></input>
        )}
      </div>
    )

}