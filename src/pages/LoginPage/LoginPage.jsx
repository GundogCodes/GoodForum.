import styles from './LoginPage.module.scss'
import {useState} from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import Footer from '../../components/Footer/Footer'

export default function LoginPage({setUser}){
    const [clicked, setClicked] = useState(false)
    console.log('before click',clicked)

    function handleLoginClick(){
        setClicked(!clicked)
        console.log('after click',clicked)
    }

    return(
        <div className={styles.LoginPage}>
            
            {clicked?<LoginForm setUser={setUser}/>
            :
        <h1 onClick={handleLoginClick}>ENTER</h1>
    }
        
        </div>
)
}