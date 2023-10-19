import styles from './UserPosts.module.scss'
import Post from '../Post/Post'
import { useState, useEffect } from 'react'
import * as usersAPI from '../../../utilities/users-api.cjs'
import { useNavigate } from 'react-router-dom'
export default function UserPosts({user, setUser}){
    const navigate = useNavigate()
    const [allUserPost, setAllUserPosts] = useState([])

    useEffect(()=>{
        (async ()=>{
            try {
                const userPosts = await usersAPI.getUsersPosts()
                if(userPosts === 'no posts'){
                    setAllUserPosts()
                }else{

                    setAllUserPosts(userPosts)
                    console.log(userPosts)
                }
            } catch (error) {
                console.log(error)
            }
        })()
    },[])

    function handlePostClick(e){
        const id  = e.target.id
        navigate(`/post/${id}`)

    }

    return(
            
            <ul className={styles.UserPosts}>
                {allUserPost?
                <>
                <li className={styles.yourPosts}>No More Posts</li>
                { 
                    allUserPost.map((post)=>{
                        return   <li id={`${post._id}`} onClick={handlePostClick}>
                            <section id={`${post._id}`} onClick={handlePostClick}>
                                        <h4>{post.forum.title} </h4>
                                        <h2>{post.title} </h2>

                                    </section>
                                    <h3 id={`${post._id}`} onClick={handlePostClick} >{post.content} </h3>
                                    <aside id={`${post._id}`} onClick={handlePostClick}>
                                        <p className={styles.like}>{post.likes} Likes</p>
                                        <p className={styles.dislike}>{post.dislikes} Dislikes</p>
                                        <p className={styles.comment}>Comments {post.comments.length}</p>
                                    </aside>
                        </li>
                    })
                }
                </>
                :
                <h1 className={styles.noPosts}>No Posts Yet</h1>
            }
            </ul>

    )
}