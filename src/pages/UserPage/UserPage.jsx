import styles from './UserPage.module.scss'
import UserAside from '../../components/UserAside/UserAside'
import UserPosts from '../../components/UserPosts/UserPosts'
import Footer from '../../components/Footer/Footer'
import {useState, useEffect } from 'react'
import PostModal from '../../components/PostModal/PostModal'



export default function UserPage({user,setUser}){

    const [showModal, setShowModal] = useState(false)
   
    return(
        <div className={styles.UserPage}>
            <h1 className={styles.heading} >Your Posts</h1>
            {showModal?
           <PostModal showModal={showModal} setShowModal={setShowModal} />
            :
            <></>
            }
            <UserAside user={user} setUser={setUser} showModal={showModal} setShowModal={setShowModal}/>
            <UserPosts user={user} setUser={setUser} />
            <Footer />           
        </div>
)
}