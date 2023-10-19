import { useParams } from 'react-router-dom'
import styles from './PostCard.module.scss'
import { useEffect, useState } from 'react'
import * as postAPIs from '../../../utilities/post-api.cjs'

export default function PostCard({postId, setShowPost}){
    const [postInfo, setPostInfo] = useState()
    console.log('postId in PostCard', postId)
useEffect(() => {
    (async () => {
        try {
            const postInfo = await postAPIs.getPost(postId);
            console.log('postinfo', postInfo);
            setPostInfo(postInfo);
        } catch (error) {
            console.error('Error fetching post info:', error);
        }
    })();
}, [postId]);
function handleX(){
    setShowPost(false)
}
    return(
        <div className={styles.PostCard}>
            {/* {postCardInfo?
            <div className={styles.card}>
            <p onClick={handleX}>x</p>
            <header>
            <div className={styles.titlesSection}>

                <h1>{postCardInfo.title}</h1>
                <h2>{postCardInfo.poster}</h2>
            </div>
            </header>
            <div className={styles.content}>
                    {postCardInfo.content}
                </div>
            <section>
               
             
                <aside>
                    <p>Like {postCardInfo.likes}</p>
                    <p>Dislike {postCardInfo.dislikes}</p>
                </aside>
                <div className={styles.comments}>
                    <h3>Comments</h3>

                    {postCardInfo.comments.length >0 ?
                    <ul>
                        {
                            postCardInfo.comments.map((comment)=>{

                                return <li>{comment}</li>
                            })
                        }
                    </ul>
                    :
                    <></>
                    }
                    <div className={styles.addComment}>
                    <input type='text'/>
                    <button>comment</button>
                    </div>
                </div>
            </section>
            </div>
                :
                <></>    
                }
                */}
        </div> 
    )
}