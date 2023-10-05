import styles from './HomePage.module.scss'
import HomePosts from '../../components/HomePosts/HomePosts'
import Footer from '../../components/Footer/Footer'
import UserAside from '../../components/UserAside/UserAside'
import { Link } from 'react-router-dom'
export default function HomePage({user,setUser}){


    return(
        <div className={styles.HomePage}>
      <h1 className={styles.hidden} id={styles.name}>Etch</h1>
      <section className={styles.userInfo}>
        <div className={styles.userPic}>UserPic</div>
        <div className={styles.username}>{user?`${user.username}`:'login!'}</div>
      </section>
            <HomePosts/>

            <div className={styles.buttonDiv}>
                <h4>Your Forums</h4>
                    <ul>
                        <li><Link style={{color:'black'}} to='/forum'>forum</Link></li>
                        <li><Link style={{color:'black'}} to='/forum'>forum</Link></li>
                        <li><Link style={{color:'black'}} to='/forum'>forum</Link></li>
                        <li><Link style={{color:'black'}} to='/forum'>forum</Link></li>
                        <li><Link style={{color:'black'}} to='/forum'>forum</Link></li>
                        <li><Link style={{color:'black'}} to='/forum'>forum</Link></li>
                        <li><Link style={{color:'black'}} to='/forum'>forum</Link></li>
                        <li><Link style={{color:'black'}} to='/forum'>forum</Link></li>
                        <li><Link style={{color:'black'}} to='/forum'>forum</Link></li>
                        <li><Link style={{color:'black'}} to='/forum'>forum</Link></li>
                        <li><Link style={{color:'black'}} to='/forum'>forum</Link></li>
                        <li><Link style={{color:'black'}} to='/forum'>forum</Link></li>
                        <li><Link style={{color:'black'}} to='/forum'>forum</Link></li>
                        <li><Link style={{color:'black'}} to='/forum'>forum</Link></li>
                        <li><Link style={{color:'black'}} to='/forum'>forum</Link></li>
                      
                    </ul>
                    <h4>Create a Forum</h4>
            <button>+</button>
            </div>

            <Footer/>
        </div>
)
}