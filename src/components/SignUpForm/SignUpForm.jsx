import styles from './SignUpForm.module.scss'
import {useState} from 'react'
import * as usersService from '../../../utilities/users-service.cjs'
import { useNavigate } from 'react-router-dom'
export default function SignUpForm({user,setUser}){
    const [newUser, setNewUser] = useState()
    const navigate = useNavigate()
    function handleClick(){
        navigate('/')
    }
    const [credentials,setCredentials] = useState({
        username:'',
        email:'',
        password:''
    })
    const [error,setError] = useState('')

    function handleChange(evt){
        setCredentials({...credentials,[evt.target.name]:evt.target.value})
        setError('')
    }
    async function handleSubmit(e){
        e.preventDefault()
        try {
            console.log('credentials: ',credentials)
            const createdUser = await usersService.signUp(credentials)
            setUser(createdUser)    
            setNewUser(createdUser)    
        } catch (error) {
            setError('Log In Failed - Try Again')
        }

            navigate('/')
    }
    return(
        <div className={styles.signUpFormDiv}>

            <form className={styles.signUpForm} onSubmit={handleSubmit}>

                <p className={styles.text}>Username </p><input type='text' name="username" value={credentials.name} className={styles.inputText}  onChange={handleChange} required/>
                <p className={styles.text}>Email </p><input type='text' name="email" value={credentials.email} className={styles.inputText}  onChange={handleChange} required/>
                <p className={styles.text}>Password </p><input type='password' name="password" value={credentials.password} onChange={handleChange} className={styles.inputText} required />
                <button type='submit'className={styles.submit} >SIGN UP</button>
            </form>
        </div>
    )
}