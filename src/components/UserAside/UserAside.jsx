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
    async function handleFileChange(e){
        const uploadedFile = e.target.files[0]
        console.log('file: ', uploadedFile)
        const base64 = await convertToBase64(uploadedFile)
        console.log('base64: ', base64)
        setFile(base64)
        // try {
        //     const updatedUser = await userService.updateUserInfo(user._id,{profileImage:base64})
        //     console.log('returned User', updatedUser)
        // } catch (error) {
        //     console.log({error:error})
        // }
    }

    async function submit(e){
        e.preventDefault()
        console.log('file',file)
        const formData = new FormData()
        formData.append('profilePic',file)
        const result = await axios.post('/api/profilePic', formData, { headers: {'Content-Type': 'multipart/form-data'}})
        console.log(result.data)
    }

    return(
        <div  className={styles.UserAside}>
            <header className={styles.userPic}>
                <form  onSubmit={submit} > {/*encType tells html this form accepsts different type of data, file in this case*/}
                <img src={'src/assets/userFunc/profileImage.png'}/>
                <input 
                filename={file}
                onChange={e=>setFile(e.target.files[0])}
                type='file'
                accept='image/*'
                />
                <button type='submit'>Upload</button>
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