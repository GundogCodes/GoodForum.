import styles from './NavBar.module.scss'
import {Link} from 'react-router-dom'
export default function NavBar(props){
    return(
        <nav className={styles.NavBarDiv}>
          {props.routes.map(({key,path})=>(
            
            <Link to={path} key={key} ><div className={styles.titles}>{key} </div></Link>
           
          ))}
        </nav>
        )
}