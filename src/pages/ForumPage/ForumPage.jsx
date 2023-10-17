import styles from './ForumPage.module.scss'
import Footer from '../../components/Footer/Footer'
import Post from '../../components/Post/Post'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import * as forumService from '../../../utilities/forum-api.cjs'
import PostModal from '../../components/PostModal/PostModal'
export default function ForumPage({ user, setUser }) {
    const { id } = useParams()
    const [forumPage, setForumPage] = useState()
    const [showPostModal, setShowPostModal] = useState(false)

    const [postData, setPostData] = useState({
        title: "",
        content: ""
    })
    useEffect(() => {
        (async () => {
            try {
                const forum = await forumService.getForum(id)
                console.log('forum: ', forum)
                setForumPage(forum)
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
                    {forumPage.posts ?

                        <ul>
                            {forumPage.posts.map((post) => {
                                return <li><Post quarry={forumPage.title} postTitle={post.title} content={post.content} /></li>
                            })}
                        </ul>
                        :
                        <h1 className={styles.noPosts}>No Posts yet, Be the first!</h1>
                    }
                    <Footer />
                </>
                :
                <></>
            }

        </div>
    )
}
