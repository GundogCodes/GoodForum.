import styles from './ForumPage.module.scss'
import Footer from '../../components/Footer/Footer'
import Post from '../../components/Post/Post'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import * as forumService from '../../../utilities/forum-api.cjs'
import * as postService from '../../../utilities/post-api.cjs'
import PostModal from '../../components/PostModal/PostModal'
import { useNavigate } from 'react-router-dom'
export default function ForumPage({ user, setUser }) {
    const { id } = useParams()
    const navigate = useNavigate()
    const [forumPage, setForumPage] = useState()
    const [forumPosts, setForumPosts] = useState()
    const [showPostModal, setShowPostModal] = useState(false)

    const [postData, setPostData] = useState({
        title: "",
        content: ""
    })
    useEffect(() => {
        (async () => {
            try {
                const { forum, forumPosts } = await forumService.getForum(id)
                console.log('forum: ', forum)
                setForumPage(forum)
                setForumPosts(forumPosts)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [id])

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
    function handlePostClick(e) {
        const id = e.target.id
        console.log(e.target.id)
        navigate(`/post/${id}`)
    }

    async function handlePostSubmit(e) {
        e.preventDefault()
        try {
            const newPost = await forumService.postToForum(id, postData)
            console.log(newPost)
            setShowPostModal(false)
        } catch (error) {
            console.log({ error: error })
        }
    }
    async function handleCommentClick() {
        
    }
    async function handleLikeClick() {
        try {
            const updatedPost = await postService.likePost()
            console.log(updatedPost)
        } catch (error) {
            console.log({ error: error })
            
        }
    }
    async function handleDislikeClick() {

    }

    return (
        <div className={styles.ForumPage}>
            {forumPage ?
                <>
                    {showPostModal ?
                        <div className={styles.postToForum}>
                            <form onSubmit={handlePostSubmit}>
                                <p onClick={closeModal} >x</p>
                                <h1>Post to {forumPage.title}</h1>
                                <h2>Title</h2>
                                <input onChange={handleChange} name='title' type='text' />
                                <h2>Content</h2>
                                <input onChange={handleChange} name='content' type='text' />
                                <button type='submit'>Post</button>
                            </form>
                        </div>
                        :
                        <></>
                    }
                    <header>
                        <h1>{forumPage.title}</h1>
                        <h2>{forumPage.description}</h2>
                        <h3>Created By: {forumPage.founder.username}</h3>
                        <h4>Members: {forumPage.numOfMembers}</h4>
                        <section>
                            <button>  +  </button>
                            <button>Sort By</button>
                            <button onClick={handleMakePostButton} >Make a Post</button>
                        </section>
                    </header>
                    {forumPage.posts.length > 0 ?

                        <ul>
                            {forumPosts.map((post) => {
                                return <li>
                                    <section>
                                        <h2>{post.title} </h2>
                                        <h1>{post.sender.username} </h1>
                                    </section>
                                    <h3 onClick={handlePostClick} id={`${post._id}`} >{post.content} </h3>
                                    <aside>
                                        <p onClick={handleLikeClick} className={styles.like}>Like</p>
                                        <p onClick={handleDislikeClick} className={styles.dislike}>Dislikes</p>
                                        <p onClick={handleCommentClick} className={styles.comment}>Comments</p>
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
