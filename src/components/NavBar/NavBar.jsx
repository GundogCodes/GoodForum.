import LogOut from '../Logout/Logout'
import styles from './NavBar.module.scss'
import {Link} from 'react-router-dom'
export default function NavBar(props){
    return(
        <nav className={styles.NavBarDiv}>
            
            <section>

            <Link to={'/user'}><p>You</p></Link>
            <Link to={'/home'}><p>Home</p></Link>
            <Link to={'/chats'}><p>Messages</p></Link>
            </section>
            <h1>Etch</h1>
            <LogOut/>

            
           
        </nav>
        )
}