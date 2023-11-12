import styles from './ChatsPage.module.scss'
import ChatsAside from '../../components/ChatsAside/ChatsAside'
import ChatsFlow from '../../components/ChatsFlow/ChatsFlow'
import Footer from '../../components/Footer/Footer'
export default function ChatsPage({user,setUser}){
    return(
        <div className={styles.ChatsPage}>
            {user?
            <>
        <ChatsAside user={user} setUser={setUser}/>
        <h3>Your Messages</h3>
        <ChatsFlow user={user} setUser={setUser} />
        <Footer />
            </>
        :
        <>Not LoggedIn </>
    }
        </div>
)
}