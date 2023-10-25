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
                <h3>Your Quarries </h3>
                <div className={styles.forumList} >
                    {
                    user.followedForums.map((forum)=>{
                        return <h4>forum title{forum.title}</h4>
                    })
                    
                        
                    }
                </div>
            <h3>Title</h3>
            <input type='text'/>
            </aside>
            <aside>
            <h3 >Content</h3>
            <input id={styles.textField} type='text'/>
            <input type='file'/>

            <button>Post</button>
            </aside>
          </section>
            </div>
        </div>
    )
}