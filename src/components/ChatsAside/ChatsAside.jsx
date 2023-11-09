import styles from './ChatsAside.module.scss'

export default function ChatsAside({user, setUser}){
    return(
        <div className={styles.ChatsAside}>
            <h1>friend</h1>
            {user.friends.map((friend)=>{
                return <h1><img src={`/profilePics/${friend.profileImage}`}/></h1>
            })}
        </div>
    )
}