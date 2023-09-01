import styles from './SignUpForm.module.scss'
import {useState} from 'react'
export default function SignUpForm({setUser}){
    const [credentials,setCredentials] = useState({
        email:'',
        password:''
    })
    const [error,setError] = useState('')

    function handleChange(evt){
        setCredentials({...credentials,[evt.target.name]:evt.target.value})
        setError('')
    }/*
    async function handleSubmit(evt){
        evt.preventDefault()
        try {
            const user = await usersService.login(credentials)

            setUser(user)
           
        } catch (error) {
            setError('Log In Failed - Try Again')
        }
    }*/
    return(
        <div className={styles.signUpFormDiv}>

            <form className={styles.signUpForm} /*onSubmit={handleSubmit}*/>
                <p className={styles.text}>Username </p><input type='text' name="username" value={credentials.email} className={styles.inputText}  onChange={handleChange} required/>
                <p className={styles.text}>Email </p><input type='text' name="email" value={credentials.email} className={styles.inputText}  onChange={handleChange} required/>
                <p className={styles.text}>Password </p><input type='password' name="password" value={credentials.password} onChange={handleChange} className={styles.inputText} required />
                <button type='submit'className={styles.submit} >SIGN UP</button>
            </form>
        </div>
    )
}