import {  useState } from 'react'
import LogOut from '../Logout/Logout'
import styles from './NavBar.module.scss'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
export default function NavBar({ user, setUser }) {
  const [youClicked, setYouClicked] = useState(false)
  const [homeClicked, setHomeClicked] = useState(false)
  const [messagesClicked, setMessagesClicked] = useState(false)

  const navigate = useNavigate()

  function handleClick(e) {
    const butt = e.target.innerText
    console.log(e.target.innerText)
    if (butt === 'You') {
      setYouClicked(true)
      setHomeClicked(false)
      setMessagesClicked(false)
    } else if (butt === 'Home') {
      setYouClicked(false)
      setHomeClicked(true)
      setMessagesClicked(false)
    } else if (butt === 'Messages') {
      setYouClicked(false)
      setHomeClicked(false)
      setMessagesClicked(true)
    }
  }

  function handleEtchClick(){
    navigate('/')
  }


  return (
    <nav className={styles.NavBarDiv}>
      {user ?
        <>
          <section>

            {youClicked ?
              <Link to={'/user'}><p onClick={handleClick} className={styles.clicked} >You</p></Link>
              :
              <Link to={'/user'}><p onClick={handleClick} className={styles.unclicked}>You</p></Link>
            }
            {homeClicked ?
              <Link to={'/'}><p onClick={handleClick} className={styles.clicked} >Home</p></Link>
              :
              <Link to={'/'}><p onClick={handleClick} className={styles.unclicked}>Home</p></Link>
            }
            {messagesClicked ?
              <Link to={'/chats'}><p onClick={handleClick} className={styles.clicked} >Messages</p></Link>
              :
              <Link to={'/chats'}><p onClick={handleClick} className={styles.unclicked}>Messages</p></Link>
            }
          </section>
          <h1 onClick={handleEtchClick} className={styles.Name}>Etch</h1>

          <LogOut user={user} setUser={setUser} />
        </>
        :
        <>
          <section>

            {youClicked ?
              <Link to={'/user'}><p onClick={handleClick} className={styles.clicked} >User</p></Link>
              :
              <Link to={'/user'}><p onClick={handleClick} className={styles.unclicked}>User</p></Link>
            }
            {homeClicked ?
              <Link to={'/'}><p onClick={handleClick} className={styles.clicked} >Home</p></Link>
              :
              <Link to={'/'}><p onClick={handleClick} className={styles.unclicked}>Home</p></Link>
            }
            {messagesClicked ?
              <Link to={'/chats'}><p onClick={handleClick} className={styles.clicked} >Messages</p></Link>
              :
              <Link to={'/chats'}><p onClick={handleClick} className={styles.unclicked}>Messages</p></Link>
            }
          </section>

          <LogOut user={user} setUser={setUser} />
        </>
      }
    </nav>
  )
}