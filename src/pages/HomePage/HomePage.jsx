import styles from './HomePage.module.scss'
import HomePosts from '../../components/HomePosts/HomePosts'
import Footer from '../../components/Footer/Footer'
import UserAside from '../../components/UserAside/UserAside'
import { Link } from 'react-router-dom'
import FormModal from '../../components/ForumModal/ForumModal'
import { useState, useEffect } from 'react'
import * as forumService from '../../../utilities/forum-api.cjs'
import * as postAPI from '../../../utilities/post-api.cjs'
import { useNavigate } from 'react-router-dom'
export default function HomePage({ user, setUser }) {
    const [forums, setForums] = useState([])
    const [allPosts, setAllPosts] = useState([])
    useEffect(() => {
        (async () => {
            try {
                const forums = await forumService.getAll()
                const posts = await postAPI.allPosts()
                setForums(forums)
                console.log('allforums', forums)
                setAllPosts(posts)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [])
    const [showModal, setShowModal] = useState(false)

    function handleCreateClick() {
        console.log('showModal', showModal)
        setShowModal(!showModal)
    }
    return (
        <div className={styles.HomePage}>
                  <h1 className={styles.Name}>Etch</h1>
            {showModal ?
                <FormModal title={'Create a New Quarry'}
                    showModal={showModal}
                    setShowModal={setShowModal}
                    headings={['Title', 'Topic', 'Brief Description']}
                />
                :
                <></>

            }
            <section className={styles.userInfo}>
                <div className={styles.userPic}>UserPic</div>
                {user?
                <div className={styles.username}>{user ? `Hey! ${user.username}` : 'Login'}</div>
                :
                <></>
            }
            </section>
            <HomePosts allPosts={allPosts} />

            <div className={styles.buttonDiv}>
                <h4>Explore Quarries</h4>
                <ul>
                    {
                    forums.map((forum)=>{
                        return <li>{forum.title}</li>
                    })                        
                    }
                </ul>
                <button onClick={handleCreateClick} >+</button>
            </div>


        </div>
    )
}