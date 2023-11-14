import { useNavigate } from 'react-router-dom'
import styles from './ChatsAside.module.scss'

export default function ChatsAside({user, setUser}){
    console.log("USER IN CHATS PAGE", user)
    console.log('USER FRIENDS: ', user.friends)
    const navigate = useNavigate()
    function goToUserPage(e){
        const id = e.target.id
        navigate(`/user/${id}`)
    }
    return(
        <div className={styles.ChatsAside}>
            {user?
            <>
            {user.friends.map((friend)=>{
                return <h1>
                    {friend.profileImage?
                    <img  src={`/profilePics/${friend.profileImage}`}/>
                    :
                    <img src={`/src/assets/userFunc/profileImage.png`}/>
                }
                <p  onClick={goToUserPage} id={`${friend._id}`} >{friend.username}</p>
                    </h1>
            })}
            </>
            :
            <>Login to make friends and start chatting!</>
        }
        </div>
    )
}