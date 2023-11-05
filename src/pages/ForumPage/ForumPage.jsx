import styles from './ForumPage.module.scss'
import Footer from '../../components/Footer/Footer'
import Post from '../../components/Post/Post'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import * as forumService from '../../../utilities/forum-api.cjs'
import * as postService from '../../../utilities/post-api.cjs'
import PostModal from '../../components/PostModal/PostModal'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../../components/SearchBar/SearchBar'
import axios from 'axios'
export default function ForumPage({ user, setUser }) {
    /******************************************** Variables ********************************************/
    const { id } = useParams()
    const navigate = useNavigate()
    /******************************************** States ********************************************/
    const [isMember, setIsMember] = useState()
    const [showPost, setShowPost] = useState(false)
    const [forumPage, setForumPage] = useState()
    const [showPostModal, setShowPostModal] = useState(false)
    const [postData, setPostData] = useState({
        title: "",
        text: "",
        image:""
    })
    /******************************************** Handling States ********************************************/


    function handleMakePostButton() {
        setShowPostModal(true)
        console.log(showPostModal)
    }

    function closeModal() {
        setShowPostModal(false)
    }

    function handleChange(e) {
        console.log(postData)
        setPostData({
            ...postData,
            [e.target.name]: e.target.value
        })
    }
    /******************************************** useEffects ********************************************/
    useEffect(() => {
        (async () => {
            try {
                const forum = await forumService.getForum(id)
                //console.log('forum: ', forum)
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
    },[user])
    /******************************************** API Calls ********************************************/
    async function handlePostSubmit(e) { //if there is a image in the post use Multer to handle that if there is only text in the post then do the regular stuff
        e.preventDefault()
        console.log(postData)
        try {
            const newPost = await forumService.postToForum(id, postData)
            console.log(newPost)
            setShowPostModal(false)
        } catch (error) {
            console.log({ error: error })
        }
    }
    async function handleLikeClick(poster) {
        try {
            const updatedPost = await postService.likePost()
            console.log(updatedPost)
        } catch (error) {
            console.log({ error: error })

        }
    }
    async function handleDislikeClick() {
        
    }
    function handlePostClick(e) {
        //console.log('postId in handlePostClick',e.currentTarget.getAttribute('postId'))
        const id = e.currentTarget.getAttribute('postId')
        navigate(`/post/${id}`)
    }
    async function handleIsMemberClick() {
        try {
            const updatedForum = await forumService.removeMember(id)
            setIsMember(false)
            console.log(updatedForum)
            setForumPage(updatedForum)
        } catch (error) {
            console.log({ error: error })
            
        }
    }
    async function handleisNotMemberClick() {
        try {
            const updatedForum = await forumService.addMember(id)
            setIsMember(true)
            setForumPage(updatedForum)
        } catch (error) {
            console.log({ error: error })
            
        }
    }


    return (
        <div className={styles.ForumPage}>
            <SearchBar />
            {forumPage ?
                <>
                    {showPostModal ?
                        <div className={styles.postToForum}>
                            <form onSubmit={handlePostSubmit}>
                                <p onClick={closeModal} >x</p>
                                <h1>Post to {forumPage.title}</h1>
                                <h2>Title</h2>
                                <input onChange={handleChange} name='title' type='text' required />
                                <h6 className={styles.line}> </h6>
                                <h2>Text</h2>
                                <input onChange={handleChange} name='text' type='text' />
                                <h1>Or</h1>
                                <h2>Image</h2>
                                <input type='file'/>
                                <button type='submit'>Post</button>
                            </form>
                        </div>
                        :
                        <></>
                    }
                    <header>
                        <h1>{forumPage.title}</h1>
                        <h2>{forumPage.description}</h2>
                        {forumPage.founder?
                        <h3>Created By: {forumPage.founder.username}</h3>
                        :
                        <h3>Created By: User Deleted</h3>
                    }
                        <h4>Members: {forumPage.numOfMembers}</h4>
                        <section>
                            {isMember ?
                                <button onClick={handleIsMemberClick}>Following</button>
                                :
                                <button onClick={handleisNotMemberClick}>Follow</button>
                            }
                            <button>Sort By</button>
                            <button onClick={handleMakePostButton} >Make a Post</button>
                        </section>
                    </header>
                    {forumPage.posts.length > 0 ?

                        <ul>
                            {forumPage.posts.map((post) => {
                                return <li onClick={handlePostClick} postId={post._id}>
                                    <section>
                                        <h2>{post.title} </h2>
                                        <h1>{post.sender.username} </h1>
                                    </section>
                                    {post.text?
                                    <h3 >{post.text}</h3>
                                    :
                                    <h3></h3>
                                }
                                {post.image?
                                <img src=''/>
                                :
                                <></>
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
                    <Footer />
                </>
                :
                <></>
            }

        </div>
    )
}
