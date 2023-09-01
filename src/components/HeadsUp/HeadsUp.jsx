import styles from './HeadsUp.module.scss'
export default function HeadsUp({user}){
    return(
        <div className={styles.HeadsUp}>
            <h1 className={styles.userImage}></h1>

            <h1 className={styles.username}>Username</h1>
            <h1 className={styles.friends}>Friends</h1>
            <h1 className={styles.settings}>Settings</h1>
        </div>
    )
}