import styles from './HomePage.module.scss'
import HomePosts from '../../components/HomePosts/HomePosts'
import Footer from '../../components/Footer/Footer'
import UserAside from '../../components/UserAside/UserAside'

export default function HomePage({user,setUser}){


    return(
        <div className={styles.HomePage}>
      <h1 className={styles.hidden} id={styles.name}>Etch</h1>
      <section className={styles.userInfo}>
        <div className={styles.userPic}>Userpic</div>
        <div className={styles.username}>Username</div>
        <div className={styles.userForums}>UserFollowedForms</div>
      </section>
            <HomePosts/>
            <button>+</button>
            <Footer/>
        </div>
)
}