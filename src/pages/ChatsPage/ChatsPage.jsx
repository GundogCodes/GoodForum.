import styles from './ChatsPage.module.scss'
import ChatsAside from '../../components/ChatsAside/ChatsAside'
import ChatsFlow from '../../components/ChatsFlow/ChatsFlow'
export default function ChatsPage(){
    return(

        <div className={styles.ChatsPage}>
        <ChatsAside/>
        <ChatsFlow/>
        </div>
)
}