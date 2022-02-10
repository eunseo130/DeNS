import React, { useState } from 'react'
import { Outlet } from 'react-router-dom';


export default function ProfileInfo({onSave, name, value}) {

    return (
      <>
        <input onChange={onSave} name={name} value={value}></input>
      </>
    )

}