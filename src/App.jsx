import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './components/NavBar/NavBar'
import routes from './router/routes'
import {Routes,Route} from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import LoginPage from './pages/LoginPage/LoginPage'
import UserPage from './pages/UserPage/UserPage'
import ChatsPage from './pages/ChatsPage/ChatsPage'

function App() {
  const [user, setUser] = useState(false)

  


  return (
    <div >
      {user?
      <>
      <NavBar routes={routes}/>
      <Routes>
      <Route path="/" element={<HomePage />}/>
       <Route path="/user/:id" element={<UserPage />}/>
       <Route path="/chats" element={<ChatsPage />}/>
      </Routes>
      </>
      :
      <>
      <LoginPage setUser={setUser} />
      </>
      }
     
    </div>
  )
}

export default App
