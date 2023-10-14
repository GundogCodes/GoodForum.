import styles from './ForumPage.module.scss'
import Footer from '../../components/Footer/Footer'
import Post from '../../components/Post/Post'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import * as forumService from '../../../utilities/forum-api.cjs'
export default function ForumPage({ user, setUser }) {
    const { id } = useParams()
    const [forumPage, setForumPage] = useState()
    useEffect(() => {
        (async () => {
            try {
                const forum = await forumService.getForum(id)
                console.log('forum: ', forum)
                setForumPage(forum)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [id])
    return (
        <div className={styles.ForumPage}>
            {forumPage ?
                <>
                    <header>
                        <h1>{forumPage.title}</h1>
                        <h2>{forumPage.description}</h2>
                        <h3>Created By: {forumPage.founder.username}</h3>
                        <h4>Members: {forumPage.numOfMembers}</h4>
                        <section>
                            <button>Make a Post</button>
                            <button>Sort By</button>
                            <button>Follow Forum</button>
                        </section>
                    </header>


                    <ul>

                        <li><Post /></li>
                        <li><Post /></li>
                        <li><Post /></li>
                        <li><Post /></li>
                        <li><Post /></li>
                        <li><Post /></li>
                    </ul>
                    <Footer />
                </>
                :
                <></>
            }
        </div>
    )
}