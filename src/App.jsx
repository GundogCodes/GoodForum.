import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import styles from './App.module.scss'
import NavBar from './components/NavBar/NavBar'
import routes from './router/routes'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import LoginPage from './pages/LoginPage/LoginPage'
import UserPage from './pages/UserPage/UserPage'
import ChatsPage from './pages/ChatsPage/ChatsPage'
import ForumPage from './pages/ForumPage/ForumPage'
import { getUser } from '../utilities/users-service.cjs'
import LogOut from './components/Logout/Logout'
function App() {
  const [user, setUser] = useState(getUser())
  console.log('user in AppJSX', user)
  console.log('user: ', user)



  return (
    <div className={styles.app}>
      {user ?
        <>

          <NavBar routes={routes} />
          <Routes>

            <Route path="/home" element={<HomePage user={user} setUser={setUser} />} />
            <Route path="/user" element={<UserPage user={user} setUser={setUser} />} />
            <Route path="/chats" element={<ChatsPage user={user} setUser={setUser} />} />
            <Route path="/forum/:id" element={<ForumPage user={user} setUser={setUser} />} />

          </Routes>
        </>
        :
        <>
          <Routes>
            <Route path="/login" element={<LoginPage user={user} setUser={setUser} />} />
          </Routes>
        </>
      }



    </div>
  )
}

export default App
