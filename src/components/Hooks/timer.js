import React from 'react'
import { useState, useEffect } from 'react'

export default function Timer() {
  const [countdown, setCountDown] = useState (180)
  setInterval(()=> {
    setCountDown(countdown - 1)
  })  
  return (
    <div>
        <h1>{countdown}</h1>
    </div>
  )
}
