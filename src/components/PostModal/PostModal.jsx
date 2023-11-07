import styles from './PostModal.module.scss'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import * as forumService from '../../../utilities/forum-api.cjs'
import * as postService from '../../../utilities/post-api.cjs'

export default function PostModal({ user, setUser, showModal, setShowModal, page, setForumPage }) {

    /******************************************** Variables ********************************************/
    const { id } = useParams()
    /******************************************** States ********************************************/
    const [file, setFile] = useState(null)
    const [postData, setPostData] = useState({
        title: null,
        text: null,
        image: null
    })
     console.log('init file: ',file)
    /******************************************** Handling States ********************************************/

    function handleXClick() {
        setShowModal(false)
    }
    function handleChange(e) {
        console.log('postData: ',postData)
        setPostData({
            ...postData,
            [e.target.name]: e.target.value
        })
    }


    /******************************************** API Calls ********************************************/

    function uploadPic(e) { //if there is a image in the post use Multer to handle that if there is only text in the post then do the regular stuff
        e.preventDefault()
        console.log('fileName', file.name)
        console.log('init  postData is ',postData)
        setPostData({...postData, image:file.name})
        
        
    }
    
    async function handlePostToForum(e){
        e.preventDefault()
        console.log('Data in HandlePost',postData)
        if(postData.text !== null){
            try {
                const newForum = await forumService.postToForum(id,postData)
                console.log('updated Forum: ',newForum)
                setForumPage(newForum)
                setShowModal(false)
            } catch (error) {
                console.log({error:error})
                
            }
        }else{
            const formData = new FormData()
            formData.append('profilePic', file)
            const result = await axios.post('/api/profilePic', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
            console.log(result.data)
            try {
                const newForum = await forumService.postToForum(id,postData)
                console.log('updated Forum: ',newForum)
                setForumPage(newForum)
                setShowModal(false)
            } catch (error) {
                console.log({error:error})
                
            }
        }
    }

    async function handleMakeAPost(e) {
         e.preventDefault()

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
                        <section>
                        
                        <input type='file'
                        accept='image/*' 
                        onChange={e =>{setFile(e.target.files[0])}} 
                        />
                        <button className={styles.upload} onClick={uploadPic}>upload</button>
                        </section>
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
                                    user.followedForums.map((forum) => {
                                        return <h4 /*onClick={}*/>{forum.title}</h4>
                                    })
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