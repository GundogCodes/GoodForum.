import styles from './UserPosts.module.scss'
import Post from '../Post/Post'
export default function UserPosts(){
    return(
        <div className={styles.UserPosts}>
            <ul>
                <li className={styles.yourPosts}>Your Slabs</li>
                <li><Post /></li>
                <li><Post /></li>
                <li><Post /></li>
                <li><Post /></li>
                <li><Post /></li>
                <li><Post /></li>
            </ul>

        </div>
    )
}