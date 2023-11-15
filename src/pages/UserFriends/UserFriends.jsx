import styles from "./UserFriends.module.scss";

export default function UserFriends({ user }) {
  return (
    <div className={styles.UserFriends}>
      <h1>Your Friends</h1>
      <ul>
        {user.friends.map((friend) => {
          return (
            <li>
              {friend.profileImage ? (
                <img src={`/profilePics/${friend.profileImage}`} />
              ) : (
                <img src={`/src/assets/userFunc/profileImage.png`} />
              )}
              <h1 className={styles.friendName}>{friend.username}</h1>
              <p>{friend.bio}</p>
              <button>Remove Friend</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
