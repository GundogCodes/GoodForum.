 import { useEffect, useState } from 'react';
import styles from './ChatsFlow.module.scss'
import io from 'socket.io-client'
const ENDPOINT = 'http://localhost:8004'
var socket, selectedChatCompare;

 export default function ChatsFlow({user,setUser}){
/*********************************************** STATES ***********************************************/
const [socketConnected, setSocketConnected] = useState(false)

/*********************************************** USE EFFECTS ***********************************************/
    useEffect(()=>{
        socket = io(ENDPOINT)
        socket.emit('setup', user)
        socket.on('connection', ()=> setSocketConnected(true))
    },[])
    //socket.emit('join chat', '')
    return(
        <div className={styles.ChatsFlow}>
            <div className={styles.messages}>
            Messages here
            </div>
            <section>
                <input type='text'/>
                <button type='submit'>Send</button>
            </section>
        </div>

    )
    }