import {  useState } from 'react'
import LogOut from '../Logout/Logout'
import styles from './NavBar.module.scss'
import { Link, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export default function NavBar({ user, setUser }) {
  /******************************************** VARIABLES ********************************************/
  const navigate = useNavigate()
  const params = useParams()
  console.log('PARAMS IN NAV BAR',params)
  /******************************************** STATES ********************************************/
  const [youClicked, setYouClicked] = useState(false)
  const [homeClicked, setHomeClicked] = useState(false)
  const [messagesClicked, setMessagesClicked] = useState(false)
  /******************************************** USE EFFECTS ********************************************/

//   useEffect(() => {
//     (async () => {
//         try {
//         } catch (error) {
//             console.log(error)
//         }
//     })()
// }, [])
  
  /******************************************** FUNCTIONS ********************************************/
  function handleClick(e) {
    const butt = e.target.innerText
    console.log(e.target.innerText)
    if (butt === '') {
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
              <Link to={`/user`}><p onClick={handleClick} className={styles.clicked} >
                {user.profileImage?
                <img className={styles.profilePic} src={`/profilePics/${user.profileImage}`}/>
                :
                <img className={styles.profilePic} src={`/src/assets/userFunc/profileImage.png`}/>
                }
                </p>
                </Link>
              :
              <Link to={`/user`}><p onClick={handleClick} className={styles.unclicked}>
                {user.profileImage?
                <img className={styles.profilePic} src={`/profilePics/${user.profileImage}`}/>
                :
                <img className={styles.profilePic} src={`/src/assets/userFunc/profileImage.png`}/>
                }
                </p>
                </Link>
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