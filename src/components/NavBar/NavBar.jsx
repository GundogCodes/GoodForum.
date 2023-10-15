import { useState } from 'react'
import LogOut from '../Logout/Logout'
import styles from './NavBar.module.scss'
import { Link } from 'react-router-dom'
export default function NavBar(props) {
  const [youClicked, setYouClicked] = useState(false)
  const [homeClicked, setHomeClicked] = useState(false)
  const [messagesClicked, setMessagesClicked] = useState(false)

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


  return (
    <nav className={styles.NavBarDiv}>

      <section>

        {youClicked ?
          <Link to={'/user'}><p onClick={handleClick} className={styles.clicked} >You</p></Link>
          :
          <Link to={'/user'}><p onClick={handleClick} className={styles.unclicked}>You</p></Link>
        }
        {homeClicked ?
          <Link to={'/home'}><p onClick={handleClick} className={styles.clicked} >Home</p></Link>
          :
          <Link to={'/home'}><p onClick={handleClick} className={styles.unclicked}>Home</p></Link>
        }
        {messagesClicked ?
          <Link to={'/chats'}><p onClick={handleClick} className={styles.clicked} >Messages</p></Link>
          :
          <Link to={'/chats'}><p onClick={handleClick} className={styles.unclicked}>Messages</p></Link>
        }
      </section>
      <h1>Etch</h1>
      <LogOut />



    </nav>
  )
}