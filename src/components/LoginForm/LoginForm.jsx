import SignUpForm from '../SignupForm/SignUpForm'
import styles from './LoginForm.module.scss'
import {useState} from 'react'
export default function LoginForm({setUser}){
    const [signupClicked, setSignupClicked]= useState(false)
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
    function handleSignupClick(){
        setSignupClicked(!signupClicked)
    }
    return (
        <div className={styles.loginDiv}>
            <div className={styles.title}>
            ProDesics
            <p>Bend Perspectivies</p>
            </div>
            {signupClicked?
            <SignUpForm />
            :
            <form className={styles.loginForm} /*onSubmit={handleSubmit}*/>
    
              <p className={styles.text}>Email </p><input type='text' name="email" value={credentials.email} className={styles.inputText}  onChange={handleChange} required/>
              <p className={styles.text}>Password </p><input type='password' name="password" value={credentials.password} onChange={handleChange} className={styles.inputText} required />
              
              <button type='submit'className={styles.submit} >LOG IN</button>
            </form>
        }
            <p className='error-message'>&nbsp;{error}</p>
            <h3 className={styles.signupButton} onClick={handleSignupClick}>{signupClicked?'Login':'Sign Up Here'}</h3>
          </div>
        
      )
}

