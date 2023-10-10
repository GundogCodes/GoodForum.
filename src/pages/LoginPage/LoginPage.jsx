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
            {clicked ?
                <div className={styles.about}>
                    <section id={styles.change} onClick={handleLoginClick}>{'<-'}</section>
                    <h1>About Etch: Sculpting Conversations</h1>
                    <p>Welcome to Etch, where the art of conversation meets the precision of marble sculpting. Our platform is not just a space for dialogue; it's a virtual sculpture studio where ideas are carved, refined, and celebrated.</p>
                    <h2>Chisel Your Conversations:</h2>
                    <p>Every message is a chisel stroke, shaping conversations into intricate works of art. Engage with others through our uniquely crafted messaging system, where each word contributes to the masterpiece.</p>
                    <h2>Quarries of Ideas:</h2>
                    <p>Join Quarries, our forums where ideas are mined and refined like precious stones. Participate in Artisan Assemblies and Stone Symposiums, shaping discussions into brilliant collaborative sculptures.</p>
                    <h2>Your Marble Slab:</h2>
                    <p>Create your own space within Etch with Marble Slabs. These are your posts, waiting to be sculpted into narratives, anecdotes, or profound expressions. The canvas is yours—chisel away and watch your thoughts come to life.</p>
                    <h2>Chisel Chronicles and Carve-ins:</h2>
                    <p>Messages take the form of Chisels, allowing you to delicately carve out your thoughts. Engage in Carve-ins, our unique comment section, where each comment is a chip adding intricate details to the conversation.</p>
                    <p>Etch is more than a platform; it's a community that understands the artistry in every word. Join us and be part of a virtual sculptor's haven, where conversations are elevated to an art form.</p>

            </div>
            :
            <>
            <section id={styles.change} onClick={handleLoginClick}>?</section>
        <div className={styles.title}>Etch</div>
        <h1><p className={styles.make}>Make </p><p className={styles.your}> Your </p><p className={styles.mark}>Mark</p></h1>

        <LoginForm user={user} setUser={setUser} />
    </>

}
        </div >
)
}