import styles from './HomePage.module.scss'
import HomePosts from '../../components/HomePosts/HomePosts'
import Footer from '../../components/Footer/Footer'
import UserAside from '../../components/UserAside/UserAside'
import { Link } from 'react-router-dom'
import FormModal from '../../components/ForumModal/ForumModal'
import { useState } from 'react'
export default function HomePage({user,setUser}){
    const [showModal,setShowModal] = useState(false)

    function handleCreateClick(){
        console.log('showModal', showModal)
        setShowModal(!showModal)
    }
    return(
        <div className={styles.HomePage}>
            {showModal?
            <FormModal title={'Create a Quarry'} 
            showModal={showModal} 
            setShowModal={setShowModal}
            headings={['Title', 'Topic', 'Brief Description']}
            />
            :
            <></>
            
        }
      <h1 className={styles.hidden} id={styles.name}>Etch</h1>
      <section className={styles.userInfo}>
        <div className={styles.userPic}>UserPic</div>
        <div className={styles.username}>{user?`Hey! ${user.username}`:'Login'}</div>
      </section>
            <HomePosts/>

            <div className={styles.buttonDiv}>
                <h4>Explore Quarries</h4>
                    <ul>
                        <li><Link style={{color:'black'}} to='/forum'>forum</Link></li>
                        <li><Link style={{color:'black'}} to='/forum'>forum</Link></li>
                        <li><Link style={{color:'black'}} to='/forum'>forum</Link></li>
                        <li><Link style={{color:'black'}} to='/forum'>forum</Link></li>
                        <li><Link style={{color:'black'}} to='/forum'>forum</Link></li>
                        <li><Link style={{color:'black'}} to='/forum'>forum</Link></li>
                        <li><Link style={{color:'black'}} to='/forum'>forum</Link></li>
                        <li><Link style={{color:'black'}} to='/forum'>forum</Link></li>
                        <li><Link style={{color:'black'}} to='/forum'>forum</Link></li>
                        <li><Link style={{color:'black'}} to='/forum'>forum</Link></li>
                        <li><Link style={{color:'black'}} to='/forum'>forum</Link></li>
                        <li><Link style={{color:'black'}} to='/forum'>forum</Link></li>
                        <li><Link style={{color:'black'}} to='/forum'>forum</Link></li>
                        <li><Link style={{color:'black'}} to='/forum'>forum</Link></li>
                        <li><Link style={{color:'black'}} to='/forum'>forum</Link></li>
                      
                    </ul>
                    <h4 >Create a Quarry</h4>
            <button onClick={handleCreateClick} >+</button>
            </div>

            <Footer/>
        </div>
)
}