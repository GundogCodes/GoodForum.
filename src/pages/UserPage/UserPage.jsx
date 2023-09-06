import styles from './UserPage.module.scss'
import UserAside from '../../components/UserAside/UserAside'
import UserPosts from '../../components/UserPosts/UserPosts'
import Footer from '../../components/Footer/Footer'

export default function UserPage(){
    return(
        <div className={styles.UserPage}>
            <UserAside/>
            <UserPosts/>
            <Footer />           
        </div>
)
}