import styles from './UserAside.module.scss'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as userService from '../../../utilities/users-api.cjs'
import axios from 'axios'
export default function UserAside({user,setUser, showModal, setShowModal}){
    const navigate = useNavigate()
    
    /******************************************** States ********************************************/
    const[file, setFile] = useState()

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


    return(
        <div  className={styles.UserAside}>
            
            <header className={styles.userPic}>
                <form >
                    <label htmlFor='fileUpload' className={styles.customFileUpload} >
                    <img src={ 'src/assets/userFunc/profileImage.png'}/>
                    </label>
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