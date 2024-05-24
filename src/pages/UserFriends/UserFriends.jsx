import styles from "./UserFriends.module.scss";
import { useNavigate } from "react-router-dom";
import * as userService from "../../../utilities/users-api.cjs";
import { useState } from "react";
export default function UserFriends({ user, setUser }) {
  /********************************* VARIABLES *********************************/
  const navigate = useNavigate();
  const [isFriend, setIsFriend] = useState(true);
  /********************************* FUNCTIONS *********************************/
  function goToUserPage(e) {
    console.log(e.target.id);
    navigate(`/user/${e.target.id}`);
  }
  function goToMessages() {
    navigate("/chats");
  }
  /********************************* API CALLS *********************************/
  async function handleFriend(e) {
    const removingFriend = e.target.id;
    try {
      const updatedUser = await userService.removeFriend(removingFriend);
      setUser(updatedUser);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className={styles.UserFriends}>
      <h1 className={styles.title}>Your Friends</h1>
      <div className={styles.friendsList}>
        {user.friends.map((friend) => {
          return (
            <div className={styles.friendCard}>
              {friend.profileImage ? (
                <img
                  id={`${friend._id}`}
                  src={`/profilePics/${friend.profileImage}`}
                  onClick={goToUserPage}
                />
              ) : (
                <img
                  id={`${friend._id}`}
                  src={`/src/assets/userFunc/profileImage.png`}
                  onClick={goToUserPage}
                />
              )}
              <h1 className={styles.friendName}>{friend.username}</h1>
              <button id={`${friend._id}`} onClick={goToMessages}>
                Message
              </button>
              <button id={`${friend._id}`} onClick={handleFriend}>
                Remove Friend
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
