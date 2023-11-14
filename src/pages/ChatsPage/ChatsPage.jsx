import styles from './ChatsPage.module.scss'
import Footer from '../../components/Footer/Footer'
import { useNavigate } from 'react-router-dom'

import { useEffect, useState } from 'react';

import io from 'socket.io-client'
import * as chatAPI from '../../../utilities/chat-api.cjs'
import * as messageAPI from '../../../utilities/messages-api.cjs'
const ENDPOINT = 'http://localhost:8004'
var socket, selectedChatCompare;

export default function ChatsPage({user,setUser}){
    console.log("USER IN CHATS PAGE", user)
    console.log('USER FRIENDS: ', user.friends)
    const navigate = useNavigate()
    function goToUserPage(e){
        const id = e.target.id
        navigate(`/user/${id}`)
    }
    /*********************************************** STATES ***********************************************/
const [socketConnected, setSocketConnected] = useState(false)

/*********************************************** USE EFFECTS ***********************************************/
useEffect(()=>{
    socket = io(ENDPOINT)
    socket.emit('setup', user)
    socket.on('connection', ()=> setSocketConnected(true))
},[])
//socket.emit('join chat', '')
/*********************************************** API CALLS ***********************************************/

    return(
        <div className={styles.ChatsPage}>
            {user?
            <>
        <div className={styles.ChatsAside}>
            {user?
            <>
            {user.friends.map((friend)=>{
                return <h1>
                    {friend.profileImage?
                    <img  src={`/profilePics/${friend.profileImage}`}/>
                    :
                    <img src={`/src/assets/userFunc/profileImage.png`}/>
                }
                <p  onClick={goToUserPage} id={`${friend._id}`} >{friend.username}</p>
                    </h1>
            })}
            </>
            :
            <>Login to make friends and start chatting!</>
        }
        </div>
         <div className={styles.ChatsFlow}>
            <div className={styles.messages}>
            Messages here
            </div>
            <section>
                <input type='text'/>
                <button type='submit'>Send</button>
            </section>
        </div>

        <Footer />
            </>
        :
        <>Not LoggedIn </>
    }
        </div>
)
}