import styles from './HomePosts.module.scss'
import Post from '../Post/Post'
import * as postAPIs from '../../../utilities/post-api.cjs'
import { useNavigate } from 'react-router-dom'
export default function HomePosts({ allPosts }) {
    /********************************* VARIABLES *********************************/
    const navigate = useNavigate()
    
    /********************************* FUNCTIONS *********************************/
    function handlePostClick(e){
        const id = e.target.id
        navigate(`/post/${id}`)
    }
    function handleForumClick(e){    
        const id = e.target.id
        navigate(`/forum/${id}`)
    }
    function userClick(e){
        const id = e.target.id
        navigate(`/user/${id}`)

    }
console.log(allPosts)
    return (
        <ul className={styles.HomePosts}>

            {
                allPosts.map((post) => {
                    return <li onClick={handlePostClick} id={`${post._id}`} >
                        <section onClick={handlePostClick} id={`${post._id}`} >
                            <h4 onClick={handlePostClick} id={`${post._id}`}  >{post.forum.title} </h4>
                            <h2 >{post.title} </h2>
                            {post.sender ?
                            <h1  >{post.sender.username} </h1>
                            :
                            <h1>Deleted User</h1>
                        }
                        </section>
                        {post.image?
                        <h3  ><img onClick={handlePostClick} id={`${post._id}`}className={styles.postImage} src={`/profilePics/${post.image}`}/> </h3>
                        :
                        <h3 onClick={handlePostClick} id={`${post._id}`} >{post.text} </h3>
                        }
                        <aside onClick={handlePostClick} id={`${post._id}`} >
                            <div className={styles.pDiv}>

                            <p id={`${post._id}`} onClick={handlePostClick}  className={styles.likes} >Likes {post.likes}</p>
                            <p id={`${post._id}`} onClick={handlePostClick} className={styles.dislikes}  >Dislikes {post.dislikes}</p>
                            <p id={`${post._id}`} onClick={handlePostClick} className={styles.comment}>Comments {post.comments.length}</p>
                            </div>
                        {post.comments.length > 0?
                        <footer>{post.comments[0].text}</footer>
                        :
                        <></>
                    }
                        </aside>
                    </li>

                })
            }
        </ul>


    )
}