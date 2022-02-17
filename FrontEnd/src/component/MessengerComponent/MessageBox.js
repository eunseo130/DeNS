import React, { useState, useEffect } from 'react'
import { store } from '../..'

export default function MessageBox(props) {

    return (
        <>
            <hr/>
            <p>{props.data.sender}</p>
            <p>{props.data.message}</p>
        </>


    )


}