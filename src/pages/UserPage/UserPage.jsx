import styles from './UserPage.module.scss'
import UserAside from '../../components/UserAside/UserAside'
import UserPosts from '../../components/UserPosts/UserPosts'
import Footer from '../../components/Footer/Footer'

export default function UserPage({user,setUser}){
    return(
        <div className={styles.UserPage}>
            <UserAside user={user} setUser={setUser}/>
            <UserPosts user={user} setUser={setUser}/>
            <Footer />           
        </div>
)
}