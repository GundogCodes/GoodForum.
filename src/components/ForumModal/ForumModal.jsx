import styles from './ForumModal.module.scss'
import * as forumService from '../../../utilities/forum-api.cjs'
import { useState } from 'react'
export default function FormModal({ title, showModal, setShowModal ,headings }) {
    console.log('headings: ',headings)
    const [isForum,setIsForum] = useState(false)
    const [newForumInfo, setNewForumInfo] = useState({
        title:'',
        topic:'',
        description:''

    })

    function handleChange(e){
        console.log(newForumInfo)
        setNewForumInfo({
            ...newForumInfo,
            [e.target.name]:e.target.value
        })
    }
    
    async function handleCreateForum(e){
        e.preventDefault()
        try {
            const newForum = await forumService.createForum(newForumInfo)
            console.log('newForum', newForum)
            if(newForum){
                setIsForum(true)
            }
        } catch (error) {
            console.log('error: ',error)
        }
        
    }
    function handleOffModalClick() {
        setShowModal(false)
    }

    return (
        <div className={styles.FormModal}>
            <section  >
                <p onClick={handleOffModalClick} >x</p>
                <h1>{title}</h1>
                <div className={styles.inputField}>

                    <h3>{headings[0]}</h3>
                    <input name='title' type='text' onChange={handleChange} />
                    {headings[2]?
                    <>
                    <h3>{headings[1]}</h3>
                    <input name='topic' type='text' onChange={handleChange} />
                    </>
                    :
                    <></>
                    }

                    <h3 >{headings[2]}</h3>
                    <input name='description' id={styles.description} type='text' onChange={handleChange} />

                    <button type='submit' onClick={handleCreateForum} >Create</button>
                </div>
                {isForum?
                <h2>
                    Quarry Built!
                </h2>    
                :
                <></>
            }
            </section>

        </div>
    )
}