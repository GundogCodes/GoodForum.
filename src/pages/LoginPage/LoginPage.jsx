import styles from './LoginPage.module.scss'
import { useState } from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import Footer from '../../components/Footer/Footer'

export default function LoginPage({ user, setUser }) {
    const [clicked, setClicked] = useState(null)
    console.log('before click', clicked)

    function handleLoginClick() {
        setClicked(!clicked)
        console.log('after click', clicked)
    }

    return (
        <div className={styles.LoginPage}>

                <>

                    <div className={styles.title}>Etch</div>

                    <h1><p className={styles.make}>Make </p><p className={styles.your}> Your </p><p className={styles.mark}>Mark</p></h1>
                    <h2>
                        Etch is where every keystroke is a chisel,<br /> sculpting conversations into masterpieces.<br /> Join our virtual studio, where ideas are carved, refined, and celebrated.<br /> Elevate your dialogue, be part of the artistry <br /> Welcome to Etch, where every word is a stroke of brilliance.
                    </h2>


                    <LoginForm user={user} setUser={setUser} />
                </>

            
        </div >
    )
}