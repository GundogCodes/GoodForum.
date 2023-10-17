import styles from './UserPosts.module.scss'
import Post from '../Post/Post'
import { useState, useEffect } from 'react'
import * as usersAPI from '../../../utilities/users-api.cjs'

export default function UserPosts({user, setUser}){
     
    const [allUserPost, setAllUserPosts] = useState([])
    console.log(allUserPost)

    useEffect(()=>{
        (async ()=>{
            try {
                const userPosts = await usersAPI.getUsersPosts()
                setAllUserPosts(userPosts)
            } catch (error) {
                console.log(error)
            }
        })()
    },[])

    return(
            
            <ul className={styles.UserPosts}>
                <li className={styles.yourPosts}>No More Posts</li>
                {
                    allUserPost.map((post)=>{
                     return   <li>
                            <section>
                                        <h4>{post.forum.title} </h4>
                                        <h2>{post.title} </h2>

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

    )
}