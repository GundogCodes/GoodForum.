import styles from './Logout.module.scss'
import {logOut} from '../../../utilities/users-service.cjs'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function LogOut({user, setUser}){

    const navigate = useNavigate();

    function handleLogin(){
        navigate('/login')
    }

    function handleLogOut(){
    setUser(null)
    logOut()

    }
        return (
            <div className={styles.LogOut}>
                {user?
                <div onClick={handleLogOut}> Logout</div>            
                :
                <div onClick={handleLogin}> Login</div>            
            }
            </div>
        )
    }