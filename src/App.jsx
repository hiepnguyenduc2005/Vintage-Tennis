import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const location = {
    'lat': '37.7749',
    'lon': '-122.4194'
  }

  useEffect(() => {
    const fetchData = async () => {
      try{
        console.log(import.meta.env.VITE_JOKE_API)
        const response = await fetch(
          `https://api.openweathermap.org/data/3.0/onecall?lat=${location.lat}&lon=${location.lon}&appid=${import.meta.env.VITE_JOKE_API}`)
        const data = await response.json()
        console.log(data)
      }
      catch(error){
        console.log(error)
      }
    }
    fetchData()
  }, [])

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
