import { useState } from 'react'
import styles from './Post.module.scss'
export default function Post({ allPosts, page }) {
    /********************************************** VARIABLES **********************************************/
    const navigate = useNavigate()
    /********************************************** STATE VARIABLES **********************************************/
    const [homePage, setHomePage] = useState(false)
    const [forumPage, setForumPage] = useState(false)
    const [userPage, setUserPage] = useState(false)
    const [allUserPost, setAllUserPosts] = useState([])
    /********************************************** HANDLE STATES  **********************************************/
    if (page === 'UserPage') {
        setHomePage(false)
        setForumPage(false)
        setUserPage(true)
    } else if (page === 'HomePage') {
        setHomePage(true)
        setForumPage(false)
        setUserPage(false)
    } else if (page === 'ForumPage') {
        setHomePage(false)
        setForumPage(true)
        setUserPage(false)
        
    }
    
    /**********************************************  USEEFFCTS  **********************************************/
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

    useEffect(() => {
        (async () => {
            try {
                const forum = await forumService.getForum(id)
                console.log('All Forum Posts', forum.posts)
                setForumPage(forum)

            } catch (error) {
                console.log(error)
            }
        })()
    }, [id])

    useEffect(() => {
        if (!user) {
            return
        } else {
            if (user.followedForums.includes(id)) {
                setIsMember(true)
            } else {
                setIsMember(false)
            }
        }
    }, [user])
    /********************************************** FUNCTIONS  **********************************************/
    function handlePostClick(e){
        const id = e.target.id
        navigate(`/post/${id}`)
    }

    return (
        <div className={styles.Post}>
            {/*if Page === HomePage the Posts will look like this: */}

            {homePage ?
                <ul className={styles.HomePosts}>

                {
                    allPosts.map((post) => {
                        return <li onClick={handlePostClick} id={`${post._id}`} >
                            <section onClick={handlePostClick} id={`${post._id}`} >
                                <h4>{post.forum.title} </h4>
                                <h2>{post.title} </h2>
                                {post.sender ?
                                <h1>{post.sender.username} </h1>
                                :
                                <h1>Deleted User</h1>
                            }
                            </section>
                            {post.image?
                            <h3 onClick={handlePostClick} id={`${post._id}`} ><img className={styles.postImage} src={`/profilePics/${post.image}`}/> </h3>
                            :
                            <h3 onClick={handlePostClick} id={`${post._id}`} >{post.text} </h3>
                            }
                            <aside onClick={handlePostClick} id={`${post._id}`} >
                                <p id={`${post._id}`} onClick={handlePostClick}  className={styles.likes} >Likes {post.likes}</p>
                                <p id={`${post._id}`} onClick={handlePostClick} className={styles.dislikes}  >Dislikes {post.dislikes}</p>
                                <p id={`${post._id}`} onClick={handlePostClick} className={styles.comment}>Comments {post.comments.length}</p>
                            </aside>
                        </li>
    
                    })
                }
            </ul>
                :
                <></>
            }

            {/*if Page === UserPage the Posts will be the Users posts and look like this: */}


            {userPage ?
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
                                 {post.image?
                                 <h3 id={`${post._id}`} onClick={handlePostClick} ><img className={styles.postImage} src={`profilePics/${post.image}`}/> </h3>
                                 :
                                 <h3 id={`${post._id}`} onClick={handlePostClick} >{post.text} </h3>
                             }
                                 <aside id={`${post._id}`} onClick={handlePostClick}>
                                     <p id={`${post._id}`} onClick={handlePostClick} className={styles.like}>{post.likes} Likes</p>
                                     <p id={`${post._id}`} onClick={handlePostClick} className={styles.dislike}>{post.dislikes} Dislikes</p>
                                     <p id={`${post._id}`} onClick={handlePostClick} className={styles.comment}>Comments {post.comments.length}</p>
                                 </aside>
                     </li>
                 })
             }
             </>
             :
             <h1 className={styles.noPosts}>No Posts Yet</h1>
         }
         </ul>
                :
                <></>
            }

            {/*if Page === ForumPage the Posts will be the Forum posts and look like this: */}

            {forumPage ?
                <ul>
                {forumPage.posts.map((post) => {
                    return <li onClick={handlePostClick} postId={post._id}>
                        <section>
                            <h2>{post.title} </h2>
                            <h1>{post.sender.username} </h1>
                        </section>
                        {post.image ?
                            <img className={styles.postImage} src={`/profilePics/${post.image}`} />
                            :
                            <h3 >{post.text}</h3>
                        }

                        <aside>
                            <p onClick={handleLikeClick} className={styles.like}>Like {post.likes}</p>
                            <p onClick={handleDislikeClick} className={styles.dislike}>Dislike {post.dislikes}</p>
                            <p >Comments {post.comments.length}</p>
                        </aside>
                    </li>
                })}
            </ul>
                :
                <h1 className={styles.noPosts}>No Posts yet, be the first to start a conversation!</h1>
            }

            {
                /*
                get the code from each page and consolidate it into this page
                get he css from each page and apply it here
                */
            }
        </div>
    )
}

