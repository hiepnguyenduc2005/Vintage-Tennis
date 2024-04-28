import { useState, useEffect } from 'react'
import { useRoutes } from 'react-router-dom'
import './App.css'
import Sidebar from './components/Sidebar'
import Default from './components/Default'
import Create from './components/Create'
import Post from './components/Post'
import Edit from './components/Edit'
import { useRef } from 'react'

function App() {
  const navbarRef = useRef(null);
  const [navbarHeight, setNavbarHeight] = useState(0);

  useEffect(() => {
    // Ensure the navbar is rendered by placing this logic in the useEffect hook
    if (navbarRef.current) {
      setNavbarHeight(navbarRef.current.getBoundingClientRect().height);
    }
  }, []);

  const [bgColor, setBgColor] = useState('black'); // Add state to control background color
  let element = useRoutes([
    {
      path: "/",
      element:<Default color={bgColor}/>
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
  
  // This will be passed to Sidebar
  const changeBackground = (color) => {
    if (color === 'green')
      setBgColor('2ecc71');
    else if (color === 'orange')
      setBgColor('d35400');
    else if (color === 'blue')
      setBgColor('3498db');

    console.log(color);
  };
  

  return (
    <div className='whole-page' style={{ backgroundColor: `#${bgColor}` }}>
      <div>
        <Sidebar changeBackground={changeBackground} />
      </div>
      <div className='content' style={{ paddingTop: navbarHeight + 'px'}}>
        {element}
      </div>
    </div>
  )
}

export default App
