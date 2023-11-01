import { useState } from 'react'
import styles from './UserAside.module.scss'
import { useNavigate } from 'react-router-dom'
import * as userService from '../../../utilities/users-api.cjs'
import axios from 'axios'
export default function UserAside({user,setUser, showModal, setShowModal}){
    const navigate = useNavigate()
    
    /******************************************** States ********************************************/
    const[userPic, setUserPic] = useState()

    /******************************************** Control Panel Functions ********************************************/
    function handleControlPanel(e){
        if(!user){
            alert('Login to Continue')
        }
        const button = e.target.name
        if(user && button === 'friends'){
            
            navigate('/friends')
        } else if(user && button === 'settings'){
            navigate('/settings')
        }
    }
    function setShow(){
        setShowModal(true)
    }
    /******************************************** Uploading Profile Images Async Functions ********************************************/
    
       const handleSubmit= async (e)=> {
            e.preventDefault() //prevent page from reloading
           // addUserImage(user._id,userPic)
           const formData = new FormData()
           formData.append('profileImage', userPic)
    
           const result = await axios.post(
            "http://localhost/5173/upload-image",
            formData,
            {
                headers:{'Content-Type': "multipart/form-data"}
            }
           )
           console.log(result)
        }

    const addUserImage  = async (userId,newImage)=>{
        try {
            const userImage = await userService.updateUserInfo(userId,newImage)
            console.log('userIMage from api call',userImage)
            setUserPic(userImage)
        } catch (error) {
            console.log(error)
        }
    }
    async function handleUserPicUpload(e){
        console.log(e.target.files[0])
        setUserPic(e.target.files[0])
        console.log('userPic', userPic)
    }
    return(
        <div  className={styles.UserAside}>
            
            <header className={styles.userPic}>
                <form onSubmit={handleSubmit}>
                    {/* <label htmlFor='fileUpload' className={styles.customFileUpload} >
                        <img src={userPic || 'src/assets/userFunc/profileImage.png'}/>
                        </label>
                        <input type='file'
                        accept='image/*'
                        id='fileUpload'
                        onChange={handleUserPicUpload}
                        />
                    <button>Add Pic</button> */}
                </form>
            </header>
                    <input type='file' />
                    <button>Upload</button>
            {user?
            <h1>{user.username}</h1>
            :
            <></>
        }
            <section className={styles.controlPanel}>
                <button  className={styles.setting} ><img name={'settings'} onClick={handleControlPanel} src='src/assets/userFunc/settings.png'/></button>           
                <button  className={styles.friends}  ><img name={'friends'} onClick={handleControlPanel}  src='src/assets/userFunc/friends.png'/></button>           

                <button onClick={setShow} className={styles.create}>+</button> {/*Create a Forums*/}
            </section>

        </div>
    )
}

//convert images to base64 to save it in MongoDB
function convertToBase64(file){
    return new Promise((resolve,reject)=>{
        const fileReader = new FileReader()
        fileReader.readAsDataURL(file)
        fileReader.onload = ()=>{
            resolve(fileReader.result)
        }
        fileReader.onerror = (error)=>{
            reject(error)
        }
        
    })
}