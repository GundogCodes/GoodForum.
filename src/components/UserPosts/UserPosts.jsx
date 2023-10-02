import styles from './UserPosts.module.scss'

export default function UserPosts(){
    return(
        <div className={styles.UserPosts}>
            <ul>
                <li className={styles.yourPosts}>Your Posts</li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>

        </div>
    )
}