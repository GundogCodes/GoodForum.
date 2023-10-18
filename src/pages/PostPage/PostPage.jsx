import { useParams } from 'react-router-dom'
import styles from './PostPage.module.scss'
import { useEffect, useState } from 'react'
import * as postAPIs from '../../../utilities/post-api.cjs'

export default function PostPage(){
    const { id } = useParams()
    const [postInfo, setPostInfo] =useState()
    console.log('postId: ',id)
    console.log('type of postid',typeof(id))
    console.log(postInfo)
useEffect(() => {
    (async () => {
        try {
            const {postInfo} = await postAPIs.allPosts();
            console.log('postinfo', postInfo);
            setPostInfo(postInfo);
        } catch (error) {
            console.error('Error fetching post info:', error);
        }
    })();
}, [id]);
    return(
        <div className={styles.PostPage}>
            <header>

                <h2>Poster</h2>
                <h1>Title</h1>
                <h2>Forum</h2>
            </header>
            <section>
               
                <div className={styles.content}>
                    Content
                </div>
                <aside>
                    <p>Likes</p>
                    <p>Dislikes</p>
                </aside>
                <div className={styles.comments}>
                    Comments
                </div>
            </section>
        </div>
    )
}