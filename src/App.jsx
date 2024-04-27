import { useState, useEffect } from 'react'
import { useRoutes } from 'react-router-dom'
import './App.css'
import Sidebar from './components/Sidebar'
import Default from './components/Default'
import Create from './components/Create'
import Post from './components/Post'
import Edit from './components/Edit'

function App() {
  let element = useRoutes([
    {
      path: "/",
      element:<Default />
    },
    {
      path:"/post/:id",
      element: <Post />
    },
    {
      path:"/edit/:id",
      element: <Edit />
    },
    {
      path:"/create",
      element: <Create />
    }
  ]);

  return (
    <div className='whole-page'>
      <Sidebar />
      {element}
    </div>
  )
}

export default App
