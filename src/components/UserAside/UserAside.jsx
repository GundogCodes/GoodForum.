import { useState } from 'react'
import styles from './UserAside.module.scss'
import { useNavigate } from 'react-router-dom'
import * as userService from '../../../utilities/users-api.cjs'
export default function UserAside({user,setUser, showModal, setShowModal}){
    const navigate = useNavigate()
    const[userPic, setUserPic] = useState({profileImage:''})

    const addUserImage  = async (userId,newImage)=>{
        try {
            const userImage = await userService.updateUserInfo(userId,newImage)
            console.log('userIMage from api call',userImage)
            setUserPic(userImage)
        } catch (error) {
            console.log(error)
        }
    }
    
    function setShow(){
        setShowModal(true)
    }
    
    function handleSubmit(e){
        e.preventDefault()
        addUserImage(user._id,userPic)
    }
    async function handleUserPicUpload(e){
        const file = e.target.files[0]
        console.log(file)
        const base64 = await convertToBase64(file)
        console.log(base64)
        setUserPic({...userPic,profileImage:base64 })
        
    }
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
    return(
        <div  className={styles.UserAside}>
            
            <header className={styles.userPic}>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='fileUpload' className={styles.customFileUpload} >
                        <img src={userPic.profileImage || 'src/assets/userFunc/profileImage.png'}/>
                    </label>
                    <input type='file'
                    label='Image'
                    name='myFile'
                    id='fileUpload'
                    accept='image/jpeg, image/png, image/jpg'
                    onChange={handleUserPicUpload}
                    />
                </form>
            </header>
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