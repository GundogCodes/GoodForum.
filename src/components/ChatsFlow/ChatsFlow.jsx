 import { useEffect } from 'react';
import styles from './ChatsFlow.module.scss'
import io from 'socket.io-client'
const ENDPOINT = 'http://localhost:8004'
var socket, selectedChatCompare;

 export default function ChatsFlow(){

    useEffect(()=>{
        socket = io(ENDPOINT)
    },[])
    
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