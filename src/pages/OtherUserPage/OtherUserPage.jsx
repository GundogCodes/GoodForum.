import styles from './OtherUserPage.module.scss'
import * as userAPIs from '../../../utilities/users-api.cjs'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function OtherUserPage({ user, setUser }) {
    /********************************************** VARIABLES **********************************************/
    const { id } = useParams()
    /********************************************** STATES **********************************************/

    const [userPage, setUserPage] = useState(null)
    /********************************************** USE EFFECTS **********************************************/

    useEffect(() => {
        (async () => {
            try {
                const user = await userAPIs.getUser(id)
                console.log('user is ', user)
                setUserPage(user)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [id])
    return (
        <div className={styles.OtherUserPage}>
            {userPage ?
                <section>
                    <header>
                        {userPage.profileImage?
                        <img className={styles.profilePic} src={`/profilePics/${userPage.profileImage}`} />
                        :
                        <img className={styles.profilePic} src={`/src/assets/userFunc/profileImage.png`} />
                        }
                        <h1>{userPage.username}</h1>
                        <h6>{userPage.bio}</h6>
                        <aside>
                            <p>Friends: {userPage.friends.length}</p>
                            <p>Quarries: {userPage.followedForums.length}</p>
                            <p>Posts: {userPage.posts.length}</p>
                        </aside>
                        <div className={styles.interactions}>
                            <p>Message</p>
                            <p>Add Friend</p>
                        </div>
                    </header>
                    <div>
                        {userPage.posts.map((post)=>{
                            return <div className={styles.post}>
                                <header>
                                {post.forum.title}
                                {post.title}
                                </header>
                                {post.image?
                                <img className={styles.postImage} src={`/profilePics/${post.image}`}/>
                                :
                                <></>
                                }
                                {post.text?
                                <h5>
                                    {post.text}
                                </h5>
                                :
                                <></>
                                }
                                <section>
                                    <p>Likes {post.likes}</p>
                                    <p>Dislikes {post.dislikes}</p>
                                    <p>Comments {post.comments.length}</p>
                                </section>
                                </div>
                        })}
                    </div>
                </section>
                :
                <></>
            }
        </div>
    )
}