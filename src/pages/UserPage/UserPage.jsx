import styles from './UserPage.module.scss'
import HeadsUp from '../../components/HeadsUp/HeadsUp'
export default function UserPage(){
    return(

        <div className={styles.UserPage}>
        User Profile Here
        <HeadsUp />
        </div>
)
}