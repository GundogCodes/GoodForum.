import styles from './UserAside.module.scss'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as userService from '../../../utilities/users-api.cjs'
import axios from 'axios'
export default function UserAside({ user, setUser, showModal, setShowModal }) {
    const navigate = useNavigate()

    /******************************************** States ********************************************/
    const [file, setFile] = useState()
    const [showUploadForm, setShowUploadForm] = useState(false)

    /******************************************** Handle States ********************************************/
    function showForm() {
        setShowUploadForm(!showUploadForm)
    }
    /******************************************** Control Panel Functions ********************************************/
    function handleControlPanel(e) {
        if (!user) {
            alert('Login to Continue')
        }
        const button = e.target.name
        if (user && button === 'friends') {

            navigate('/friends')
        } else if (user && button === 'settings') {
            navigate('/settings')
        }
    }
    function setShow() {
        setShowModal(true)
        console.log(showUploadForm)
    }

    /******************************************** Uploading Profile Images Async Functions ********************************************/

    async function submit(e) {
        e.preventDefault()
        console.log('file', file.name)
        const formData = new FormData()
        formData.append('profilePic', file)
        const result = await axios.post('/api/profilePic', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        console.log(result.data)
        try {
            const updatedUser = await userService.updateUserInfo(user._id, { profileImage: file.name })
            console.log('updatedUser', updatedUser)
            setUser(updatedUser)
        } catch (error) {
            console.log({ error: error })
        }
    }
    console.log(showUploadForm)
    return (
        <div className={styles.UserAside}>
             {user ?
                <h1>{user.username}</h1>
                :
                <></>
            }
            <header className={styles.userPic}>
                {user && user.profileImage ?
                    <img src={`profilePics/${user.profileImage}`} />
                    :

                    <img src='src/assets/userFunc/profileImage.png' />
                }
            </header>
            {user && user.profileImage ?

                <p onClick={showForm} className={styles.uploadPic}>Update Profile Pic</p>
                :
                <p onClick={showForm} className={styles.uploadPic}>Upload Profile Pic</p>
            }
            {showUploadForm ?
                <form onSubmit={submit} > {/*encType tells html this form accepsts different type of data, file in this case*/}
                    <input
                        filename={file}
                        onChange={e => setFile(e.target.files[0])}
                        type='file'
                        accept='image/*'
                    />
                    <button type='submit'>Upload!</button>
                </form>
                :
                <></>
            }
           
            <div className={styles.bio}>
                {user ?
                    <p>{user.bio}</p>
                    :
                    <p>Login or Create an Account to join the conversation!</p>
                }
            </div>
            <div className={styles.userInfo}>
                <h7>Friends Forums Posts</h7>
                <div className={styles.pDiv}>

                    <p>{user.friends.length}</p>
                    <p>{user.foundedForums.length}</p>
                    <p>{user.posts.length}</p>
                </div>
            </div>

            <section className={styles.controlPanel}>
                <button className={styles.setting} ><img name={'settings'} onClick={handleControlPanel} src='src/assets/userFunc/settings.png' /></button>
                <button className={styles.friends}  ><img name={'friends'} onClick={handleControlPanel} src='src/assets/userFunc/friends.png' /></button>
                <button onClick={setShow} className={styles.create}>+</button> {/*Create a Forums*/}
            </section>
        </div>
    )
}

//convert images to base64 to save it in MongoDB
function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader()
        fileReader.readAsDataURL(file)
        fileReader.onload = () => {
            resolve(fileReader.result)
        }
        fileReader.onerror = (error) => {
            reject(error)
        }

    })
}