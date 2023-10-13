import styles from './UserPage.module.scss'
import UserAside from '../../components/UserAside/UserAside'
import UserPosts from '../../components/UserPosts/UserPosts'
import Footer from '../../components/Footer/Footer'
import * as usersService from '../../../utilities/users-service.cjs'
import {useState, useEffect } from 'react'



export default function UserPage({user,setUser}){
    const [showModal, setShowModal] = useState(false)
    useEffect(()=>{
        (async ()=>{
            try {
                const user = await usersService.getUser()
                console.log('user: ',user)
            } catch (error) {
                console.log(error)
            }
        })()
    },[])
    return(
        <div className={styles.UserPage}>
            {showModal?
           <></>
            :
            <></>
            }
            <UserAside user={user} setUser={setUser} showModal={showModal} setShowModal={setShowModal}/>
            <UserPosts user={user} setUser={setUser}/>
            <Footer />           
        </div>
)
}