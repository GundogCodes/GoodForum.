import styles from './HomePosts.module.scss'
import Post from '../Post/Post'
export default function HomePosts({allPosts}){
    return(
        <div className={styles.HomePosts}>

                <ul>
                    {
                        allPosts.map((post)=>{
                                <div>  hellow</div>
                            return <li>
                                <section>
                                        <h4>{post.forum.title} </h4>
                                        <h2>{post.title} </h2>
                                        <h1>{post.sender.username} </h1>
                                    </section>
                                    <h3>{post.content} </h3>
                                    <aside>
                                        <p className={styles.like}>{post.likes} Likes</p>
                                        <p className={styles.dislike}>{post.dislikes} Dislikes</p>
                                        <p className={styles.comment}>Comments</p>
                                    </aside>
                                </li>

                        })
                    }
                </ul>


        </div>
    )
}