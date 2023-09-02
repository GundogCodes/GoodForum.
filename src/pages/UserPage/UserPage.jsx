import styles from './UserPage.module.scss'
import HeadsUp from '../../components/HeadsUp/HeadsUp'
import RecentPosts from '../../components/RecentPosts/RecentPosts'
export default function UserPage(){
    return(
        <div className={styles.UserPage}>
            <h1></h1>
        <HeadsUp />
        <RecentPosts />
        </div>
)
}