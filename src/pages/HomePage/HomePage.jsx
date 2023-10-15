import styles from './HomePage.module.scss'
import HomePosts from '../../components/HomePosts/HomePosts'
import Footer from '../../components/Footer/Footer'
import UserAside from '../../components/UserAside/UserAside'
import { Link } from 'react-router-dom'
import FormModal from '../../components/ForumModal/ForumModal'
import { useState, useEffect } from 'react'
import * as forumService from '../../../utilities/forum-api.cjs'
import { useNavigate } from 'react-router-dom'
export default function HomePage({ user, setUser }) {
    const [forums, setForums] = useState([])
    useEffect(() => {
        (async () => {
            try {
                const forums = await forumService.getAll()
                console.log('forums: ', forums)
                setForums(forums)
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
                <div className={styles.username}>{user ? `Hey! ${user.username}` : 'Login'}</div>
            </section>
            <HomePosts />

            <div className={styles.buttonDiv}>
                <h4>Explore Quarries</h4>
                <ul>
                    {
                        forums.map(forum => {
                            return <Link to={`/forum/${forum._id}`}><li>{forum.title}</li></Link>
                        })
                    }

                </ul>
                <h4 >Create a Quarry</h4>
                <button onClick={handleCreateClick} >+</button>
            </div>

            <Footer />
        </div>
    )
}