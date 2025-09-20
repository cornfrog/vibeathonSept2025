import { useState } from 'react'
import './App.scss'

function App() {
  const [count, setCount] = useState(0)

  return (
<div>
  <h1 className="center-text">Tool Riddle</h1>
  <div className="riddle-container">
    <span className="riddle-text">riddle here</span>
  </div>
  <div className='lockbox-section'></div>
  <div className='choices-section'></div>
</div>
  )
}

export default App
