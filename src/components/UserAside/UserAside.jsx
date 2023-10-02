import styles from './UserAside.module.scss'
import Logout from '../Logout/Logout'
export default function UserAside(){
    return(
        <div  className={styles.UserAside}>
            <h1>Username</h1>
            <header className={styles.userPic}>
                UserPic
            </header>
            <section className={styles.controlPanel}>
                <p className={styles.setting}>S</p>           
                <p className={styles.friends}>F</p>           
                <p className={styles.edit}>E</p>           
            </section>
            <Logout/>
        </div>
    )
}