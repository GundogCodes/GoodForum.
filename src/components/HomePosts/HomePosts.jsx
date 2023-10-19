import styles from './HomePosts.module.scss'
import Post from '../Post/Post'
import * as postAPIs from '../../../utilities/post-api.cjs'
import { useNavigate } from 'react-router-dom'
export default function HomePosts({ allPosts }) {
    const navigate = useNavigate()
    function handlePostClick(e){
        const id = e.target.id
        navigate(`/post/${id}`)
    }
    return (
        <ul className={styles.HomePosts}>
            {
                allPosts.map((post) => {
                    return <li onClick={handlePostClick} id={`${post._id}`} >
                        <section onClick={handlePostClick} id={`${post._id}`} >
                            <h4>{post.forum.title} </h4>
                            <h2>{post.title} </h2>
                            <h1>{post.sender.username} </h1>
                        </section>
                        <h3 onClick={handlePostClick} id={`${post._id}`} >{post.content} </h3>
                        <aside onClick={handlePostClick} id={`${post._id}`} >
                            <p >Likes {post.likes}</p>
                            <p >Dislikes {post.dislikes}</p>
                            <p className={styles.comment}>Comments {post.comments.length}</p>
                        </aside>
                    </li>

                })
            }
        </ul>



    )
}