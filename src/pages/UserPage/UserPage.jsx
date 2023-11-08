import styles from './UserPage.module.scss'
import UserAside from '../../components/UserAside/UserAside'
import UserPosts from '../../components/UserPosts/UserPosts'
import Footer from '../../components/Footer/Footer'
import {useState, useEffect } from 'react'
import PostModal from '../../components/PostModal/PostModal'
import { useParams } from 'react-router-dom'
import * as usersAPIs from '../../../utilities/users-api.cjs'


export default function UserPage({user,setUser}){
    /********************************************** VARIABLES **********************************************/
    const {id} = useParams()
    const [showModal, setShowModal] = useState(false)
    useEffect(() => {
        (async () => {
            try {
                const user = await usersAPIs.getUser(id)
                setUser(user)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [id])
   
    return(
        <div className={styles.UserPage}>
            <h1 className={styles.heading} >Your Posts</h1>
            {showModal?
           <PostModal user={user} setUser={setUser} showModal={showModal} setShowModal={setShowModal} />
            :
            <></>
            }
            <UserAside user={user} setUser={setUser} showModal={showModal} setShowModal={setShowModal}/>
            <UserPosts user={user} setUser={setUser} />

        </div>
)
}