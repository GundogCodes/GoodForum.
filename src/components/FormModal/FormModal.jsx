import styles from './FormModal.module.scss'
import * as forumService from '../../../utilities/forum-api.cjs'
import { useState } from 'react'
export default function FormModal({ title, showModal, setShowModal }) {

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

                    <h3>Title</h3>
                    <input name='title' type='text' onChange={handleChange} />

                    <h3>Topic</h3>
                    <input name='topic' type='text' onChange={handleChange} />

                    <h3 >Brief Description</h3>
                    <input name='description' id={styles.description} type='text' onChange={handleChange} />

                    <button type='submit' onClick={handleCreateForum} >Create</button>
                </div>

            </section>

        </div>
    )
}