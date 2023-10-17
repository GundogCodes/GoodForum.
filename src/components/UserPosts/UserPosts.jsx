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
        <div className={styles.UserPosts}>
            <ul>
                <li className={styles.yourPosts}>Your Posts</li>
                {
                    allUserPost.map((post)=>{
                     return   <li>
                        <h3>title: {post.title}</h3>
                        <h2>Forum: {post.forum.title}</h2>
                        <h1> Content: {post.content}</h1>
                        </li>
                    })
                }
            </ul>

        </div>
    )
}