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

export default function ForumPage({ user, setUser }) {
    /******************************************** Variables ********************************************/
    const { id } = useParams()
    const navigate = useNavigate()
    /******************************************** States ********************************************/
    const [isMember, setIsMember] = useState()
    const [showPost, setShowPost] = useState(false)
    const [forumPage, setForumPage] = useState()
    const [showPostModal, setShowPostModal] = useState(false)

    /******************************************** Handling States ********************************************/


    function handleMakePostButton() {
        setShowPostModal(true)

    }

    function closeModal() {
        setShowPostModal(false)
    }


    /******************************************** useEffects ********************************************/
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
    /******************************************** API Calls ********************************************/

    async function handleLikeClick(poster) {
        try {
            const updatedPost = await postService.likePost()

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
            {forumPage && forumPage.posts ?
                <>
                    {showPostModal ?
                        <PostModal user={user} setUser={setUser} showModal={showPostModal} setShowModal={setShowPostModal} page={forumPage} setForumPage={setForumPage} />
                        :
                        <></>
                    }
                    <header>
                        <h1>{forumPage.title}</h1>
                        <h2>{forumPage.description}</h2>
                        {forumPage.founder ?
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
                                    {post.image ?
                                        <img className={styles.postImage} src={`/profilePics/${post.image}`} />
                                        :
                                        <h3 >{post.text}</h3>
                                    }

                                    <aside>
                                        <div className={styles.pDiv}>
                                            <p onClick={handleLikeClick} className={styles.like}>Like {post.likes}</p>
                                            <p onClick={handleDislikeClick} className={styles.dislike}>Dislike {post.dislikes}</p>
                                            <p >Comments {post.comments.length}</p>
                                        </div>
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
