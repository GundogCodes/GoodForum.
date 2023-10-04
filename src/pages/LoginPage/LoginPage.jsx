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
            <h4>?</h4>
            <div className={styles.title}>Etch</div>
            <h1><p className={styles.make}>Make </p><p className={styles.your}> Your </p><p className={styles.mark}>Mark</p></h1>

            <LoginForm setUser={setUser}/>
        </div>
)
}