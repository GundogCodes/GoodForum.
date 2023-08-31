import styles from './HeadsUp.module.scss'
export default function HeadsUp({user}){
    return(
        <div className={styles.HeadsUp}>
            <h1 className={styles.userImage}></h1>
        </div>
    )
}