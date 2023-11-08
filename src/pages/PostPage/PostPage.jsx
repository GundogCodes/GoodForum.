import styles from './PostPage.module.scss'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import * as postAPIs from '../../../utilities/post-api.cjs'
export default function PostPage(){
    /********************************************** VARIABLES **********************************************/
    const {id} =  useParams()
    /********************************************** STATES **********************************************/
    const [post,setPost] = useState()
    console.log(post)
    /********************************************** USEEFFECT **********************************************/
    useEffect(()=>{
        (async ()=>{
            try {
                const post = await postAPIs.getPost(id)
                setPost(post)
            } catch (error) {
                console.log(error)
            }
        })()
    },[])  
    return(
        <div className={styles.PostPage}>
            {post?
            <section>
                <header>
                    <h3>{post.sender.username}</h3>
                    <h1>{post.title}</h1>
                    <h3>{post.forum.title}</h3>
                </header>
                <aside>
                    {post.image?
                    <img src={`profilePics/${post.image}`} />
                    :
                    <p>{post.text}</p>
                    }
                </aside>
                <div className={styles.interactions}>
                    <h4>Like</h4>
                    <h4>Dislike</h4>
                </div>
                <ul className={styles.commentSection}>
                    <li>Comment</li>
                    <li>Comment</li>
                    <li>Comment</li>
                    <li>Comment</li>
                    <li>Comment</li>
                    <li>Comment</li>
                </ul>
                <div className={styles.inputDiv}>

                <input type='text'/>
                <button>Comment</button>
                </div>
            </section>
            :
            <></>
                }
            </div>
    )
}