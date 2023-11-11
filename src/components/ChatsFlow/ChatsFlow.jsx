 import styles from './ChatsFlow.module.scss'

export default function ChatsFlow(){
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