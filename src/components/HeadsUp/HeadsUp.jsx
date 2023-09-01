import styles from './HeadsUp.module.scss'
export default function HeadsUp({user}){
    return(
        <div className={styles.HeadsUp}>
            <img src="https://media.licdn.com/dms/image/C5603AQFNmu3yr1y-cg/profile-displayphoto-shrink_800_800/0/1642555123507?e=2147483647&v=beta&t=E60o5pHmT4alNnA0XqlZnLGqQYqb9dLrslLv1f-4pvo"
             className={styles.userImage}/>

            <h1 className={styles.username}>Username</h1>
            <h1 className={styles.friends}>Friends</h1>
            <h1 className={styles.settings}>Settings</h1>
        </div>
    )
}