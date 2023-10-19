import styles from './HomePosts.module.scss'
import Post from '../Post/Post'
import * as postAPIs from '../../../utilities/post-api.cjs'
export default function HomePosts({allPosts}){
    async function handleLike(){
        try {
            const likeComment = await postAPIs.likePost(id)
            console.log(likeComment)
            setPost(likeComment)

        } catch (error) {
             console.log(error)
        }
        
    }
    async function handleDislike(){
        try {
            const dislikeComment = await postAPIs.dislikePost(id)
            console.log(dislikeComment)
            setPost(dislikeComment)
        } catch (error) {
             console.log(error)
        }
        
    }
    return(
                <ul className={styles.HomePosts}>
                    {
                        allPosts.map((post)=>{
                            return <li>
                                <section>
                                        <h4>{post.forum.title} </h4>
                                        <h2>{post.title} </h2>
                                        <h1>{post.sender.username} </h1>
                                    </section>
                                    <h3>{post.content} </h3>
                                    <aside>
                                    <p onClick={handleLike}>Likes {post.likes}</p>
                    <p onClick={handleDislike}>Dislikes {post.dislikes}</p>
                                        <p className={styles.comment}>Comments</p>
                                    </aside>
                                </li>

                        })
                    }
                </ul>



    )
}