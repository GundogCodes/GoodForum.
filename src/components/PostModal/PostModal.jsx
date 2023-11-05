import styles from './PostModal.module.scss'
import { useParams } from 'react-router-dom'
export default function PostModal({user, setUser, showModal,setShowModal}){
    function handlePlusClick(){
        setShowModal(false)
    }
    //console.log('userFolllowedForums', user.followedForums)
    const params = useParams()
    console.log('ID: ',params)
    function handleClick(e){
        console.log(e.target.innerText)
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
                    
                    // user.followedForums.map((forum)=>{
                    //     return <h4 onClick={handleClick}>{forum.title}</h4>
                    // })
                    
                        
                    }
                </div>
            <h3>Title</h3>
            <input type='text'/>
            </aside>
            <aside>
            <h3 >Text</h3>
            <input id={styles.textField} type='text'/>
            <input type='file'/>

            <button>Post</button>
            </aside>
          </section>
            </div>
        </div>
    )
}