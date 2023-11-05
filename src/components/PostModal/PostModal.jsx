import styles from './PostModal.module.scss'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import * as forumService from '../../../utilities/forum-api.cjs'
import * as postService from '../../../utilities/post-api.cjs'

export default function PostModal({ user, setUser, showModal, setShowModal, page }) {

    /******************************************** Variables ********************************************/
    const { id } = useParams()
    /******************************************** States ********************************************/
    const [postData, setPostData] = useState({
        title: null,
        text: null,
        image: null
    })
    const [file,setFile] = useState()
    /******************************************** Handling States ********************************************/

    function handleXClick() {
        setShowModal(false)
    }
    function handleChange(e) {
        console.log(postData)
        setPostData({
            ...postData,
            [e.target.name]: e.target.value
        })
    }

    /******************************************** API Calls ********************************************/

    async function handlePostToForum(e) { //if there is a image in the post use Multer to handle that if there is only text in the post then do the regular stuff
        e.preventDefault()
        console.log('post Data', postData)
        if (postData.text && (postData.image === null || '')) {
            console.log('Yes There is Text Data') //works like regular! 
            try {
            const newPost = await forumService.postToForum(page._id, postData)
            console.log(newPost)
            setShowModal(false)
        } catch (error) {
            console.log({ error: error })
        }
        } else if (postData.image && (postData.text === null || '')) {
            console.log('There is image Data')
        }
    }

    async function handleMakeAPost(e) {

    }

    return (
        <div className={styles.PostModal}>
            <div className={styles.form}>
                {/* If User is on the Forum Page show this PostModal otherwise */}
                {page ?
                    <form onChange={handleChange} onSubmit={handlePostToForum} >
                        <p onClick={handleXClick} >x</p>
                        <h1>Post to {page.title}</h1>
                        <h2>Title</h2>
                        <input name='title' type='text' required />
                        <h6 className={styles.line}> </h6>
                        <h2>Text</h2>
                        <input name='text' type='text' />
                        <h1 className={styles.or}>Or</h1>
                        <h2>Image</h2>
                        <img src='none' />
                        <input type='file' />
                        <button type='submit'>Post</button>
                    </form>
                    :

                    <form>
                        {/* Show this one where user can decide on which Forum to Post to */}
                        <div className={styles.heading}>
                            <p onClick={handleXClick}>x</p>

                            <h1>Make A Post</h1>
                        </div>
                        <aside>
                            <h3>Your Quarries </h3>
                            <div className={styles.forumList} >
                                {
                                    // user.followedForums.map((forum)=>{
                                    //     return <h4 onClick={handleClick}>{forum.title}</h4>
                                    // })

                                }
                            </div>
                            <h3>Title</h3>
                            <input type='text' />
                        </aside>
                        <aside>
                            <h6 className={styles.line}> </h6>

                            <h3 >Text</h3>
                            <h1 className={styles.or}>Or</h1>
                            <input id={styles.textField} type='text' />
                            <img src='none' />
                            <input type='file' />
                            <button>Post</button>
                        </aside>
                    </form>
                }
            </div>
        </div>
    )
}