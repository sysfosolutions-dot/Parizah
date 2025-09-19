import { useState } from 'react'
import './App.css'
import APP_Routes from './Routes'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <APP_Routes/>
    </>
  )
}

export default App
