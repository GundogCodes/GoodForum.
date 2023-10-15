import styles from './Logout.module.scss'
import {logOut} from '../../../utilities/users-service.cjs'
import { useNavigate } from 'react-router-dom';

export default function LogOut({user, setUser}){
     
    const navigate = useNavigate();
    function handleLogOut(){
    logOut()
    setUser(null)
    navigate('/login');
    }
        return (
            <div className={styles.LogOut}>
                <div onClick={handleLogOut}> Logout</div>

            
            </div>
        )
    }