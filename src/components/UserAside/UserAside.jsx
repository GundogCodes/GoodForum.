import styles from './UserAside.module.scss'
import Logout from '../Logout/Logout'
export default function UserAside({user,setUser}){
    return(
        <div  className={styles.UserAside}>
            <header className={styles.userPic}>
                UserPic
            </header>
            <h1>{user.username}</h1>
            <section className={styles.controlPanel}>
                <p className={styles.setting}>S</p>           
                <p className={styles.friends}>Fr</p>           
                <p className={styles.edit}>Fo</p> {/*Your Forums*/}
                <p className={styles.create}>+</p> {/*Create a Forums*/}
            </section>
            <Logout user={user} setUser={setUser}/>
        </div>
    )
}