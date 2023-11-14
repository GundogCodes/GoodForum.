import styles from './OtherUserPage.module.scss'
import * as userAPIs from '../../../utilities/users-api.cjs'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function OtherUserPage({ user, setUser }) {
    /********************************************** VARIABLES **********************************************/
    const { id } = useParams()
    const navigate = useNavigate()
    /********************************************** STATES **********************************************/
    const [isFriend, setIsFriend] = useState()
    const [userPage, setUserPage] = useState(null)
    /********************************************** FUNCTIONS **********************************************/
    function handlePostClick(e){
        console.log(e.target.id)
        navigate(`/post/${e.target.id}`)
    }
    /********************************************** USE EFFECTS **********************************************/
    
    useEffect(() => {
        for (let friend of user.friends) {
            console.log('friend', friend._id)
            if (friend._id === id) {
                setIsFriend(true)
            } else {
                setIsFriend(false)
            }
        }
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
    /********************************************** API CALLS **********************************************/
    
       async function handleMessageClicked() {
            if (isFriend) {
                try {
                    navigate('/chats')
    
                } catch (error) {
    
                    console.log(error)
                }
    
            } else if (!isFriend) {
                try {
                    setIsFriend(true)
                    const updatedUser = await userAPIs.addFriend(id)
                    setUser(updatedUser)
                    console.log(updatedUser)
                    navigate('/chats')
                } catch (error) {
    
                    console.log(error)
                }
            }
        }
    async function handleFriend() {
        if (isFriend) {
            try {
                setIsFriend(false)
                const updatedUser = await userAPIs.removeFriend(id)
                setUser(updatedUser)
                console.log(updatedUser)
            } catch (error) {

                console.log(error)
            }

        } else {
            try {
                setIsFriend(true)
                const updatedUser = await userAPIs.addFriend(id)
                setUser(updatedUser)
                console.log(updatedUser)
                //navigate('/chats')
            } catch (error) {

                console.log(error)
            }
        }
    }
    return (
        <div className={styles.OtherUserPage}>
            {userPage ?
                <section>
                    <header>
                        {userPage.profileImage ?
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
                            <p onClick={handleMessageClicked} >Message</p>
                            {isFriend ?
                                <p onClick={handleFriend}>Remove Friend</p>
                                :
                                <p onClick={handleFriend}>Add Friend</p>
                            }
                        </div>
                    </header>
                    <div>
                        {userPage.posts.map((post) => {
                            return <div className={styles.post} onClick={handlePostClick} id={`${post._id}`} >
                                <header onClick={handlePostClick} id={`${post._id}`}>
                                    {post.forum.title}
                                    {post.title}
                                </header>
                                {post.image ?
                                    <img 
                                    className={styles.postImage}
                                    src={`/profilePics/${post.image}`}  
                                    onClick={handlePostClick} 
                                    id={`${post._id}`}/>
                                    :
                                    <></>
                                }
                                {post.text ?
                                    <h5 onClick={handlePostClick} id={`${post._id}`}>
                                        {post.text}
                                    </h5>
                                    :
                                    <></>
                                }
                                <section onClick={handlePostClick} id={`${post._id}`} >
                                    <p 
                                    onClick={handlePostClick} 
                                    id={`${post._id}`} >Likes {post.likes}</p>
                                    <p 
                                    onClick={handlePostClick} 
                                    id={`${post._id}`} >Dislikes {post.dislikes}</p>
                                    <p 
                                    onClick={handlePostClick} 
                                    id={`${post._id}`} >Comments {post.comments.length}</p>
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