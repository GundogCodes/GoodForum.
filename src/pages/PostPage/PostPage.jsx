import styles from './PostPage.module.scss'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import * as postAPIs from '../../../utilities/post-api.cjs'
export default function PostPage(){
    const {id} = useParams()
    const [post,setPost] = useState(null)
    console.log('VIEW POST: ',post)
    const [comment, setComment] = useState('')
    useEffect(() => {
        (async () => {
            try {
                const postInfo = await postAPIs.getPost(id)
                setPost(postInfo)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [id])
    function handleChange(e){
        console.log(comment)
        setComment({text:e.target.value})
    }
    function handleLike(){
        
    }
    function handleDislike(){
        
    }
    async function handleButtonClick(e){
        e.preventDefault()
        console.log(comment)
        try {
            const commentedPost = await postAPIs.commentOnPost(comment, id)
            setPost(commentedPost)
        } catch (error) {
            console.log(error)
            
        }

    }
    return(
        <div className={styles.PostPage}>
            <h1>ETCH</h1>
            {post?
            <div className={styles.postCard}>
                <header>
                    <h2>{post.sender.username}</h2>
                    <h1>{post.title}</h1>
                    <h2>{post.forum.title}</h2>
                </header>
                <section>
                    {post.content}
                </section>
                <aside>
                    <h4>Likes {post.likes}</h4>
                    <h4>Dislikes {post.dislikes}</h4>
                </aside>
                <footer>
                    <h3>Comments</h3>

                        {post.comments.length > 0?
                        <ul className={styles.commentSection}>
                            {
                                post.comments.map((comment)=>{
                                    return <p className={styles.comment}>{comment.text}</p>
                                })
                            }
                        </ul>
                        :
                        <></>
                    }


                </footer>
                <div className={styles.inputDiv}>
                    <input name='comment' onChange={handleChange} type='text'/>
                    <button onClick={handleButtonClick}>Comment</button>
                </div>
            </div>
            :
            <></>
            }
        </div>
    )
}