import styles from './UserAside.module.scss'

export default function UserAside({user,setUser, showModal, setShowModal}){
    function setShow(){
        setShowModal(true)
    }

    return(
        <div  className={styles.UserAside}>
            
            <header className={styles.userPic}>
                UserPic
            </header>
            {user?
            <h1>{user.username}</h1>
            :
            <></>
        }
            <section className={styles.controlPanel}>
                <button className={styles.setting}>S</button>           
                <button className={styles.friends}>Fr</button>           

                <button onClick={setShow} className={styles.create}>+</button> {/*Create a Forums*/}
            </section>

        </div>
    )
}

