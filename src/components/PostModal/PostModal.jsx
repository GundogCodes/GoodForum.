import styles from './PostModal.module.scss'

export default function PostModal({user, setUser, showModal,setShowModal}){
    function handlePlusClick(){
        setShowModal(false)
    }
    
    return(
        <div className={styles.PostModal}>
            <div className={styles.form}>
          <section>
            <div className={styles.heading}>
            <p onClick={handlePlusClick}>x</p>

            <h1>Make A Post</h1>
            </div>
            <aside>
            <h2>Title</h2>
            <input type='text'/>
            </aside>
            <aside>
            <h2 >Content</h2>
            <input id={styles.content} type='text'/>
            </aside>
          </section>
            </div>
        </div>
    )
}