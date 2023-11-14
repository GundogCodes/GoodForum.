import styles from "./UserFriends.module.scss";

export default function UserFriends({ user }) {
  return (
    <div className={styles.UserFriends}>
      <h1>Your Friends</h1>
      <ul>
        {user.friends.map((friend) => {
          return <li>{friend.username}</li>;
        })}
      </ul>
    </div>
  );
}
