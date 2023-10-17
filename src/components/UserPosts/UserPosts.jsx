import styles from './UserPosts.module.scss'
import Post from '../Post/Post'
export default function UserPosts({user, setUser}){
    return(
        <div className={styles.UserPosts}>
            <ul>
                <li className={styles.yourPosts}>Your Slabs</li>
                {user.posts.map((post)=>{
                    return <li>{post}</li>
                })}
            </ul>

        </div>
    )
}