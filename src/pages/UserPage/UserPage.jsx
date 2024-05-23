import styles from "./UserPage.module.scss";
import UserAside from "../../components/UserAside/UserAside";
//import UserPosts from "../../components/UserPosts/UserPosts";
import Footer from "../../components/Footer/Footer";
import { useState, useEffect } from "react";
import PostModal from "../../components/PostModal/PostModal";
import { useParams } from "react-router-dom";
import * as usersAPIs from "../../../utilities/users-api.cjs";
import Post from "../../components/Post/Post";

export default function UserPage({ user, setUser }) {
  /********************************************** VARIABLES **********************************************/
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  //   useEffect(() => {
  //     (async () => {
  //       try {
  //         const user = await usersAPIs.getUser(id);
  //         setUser(user);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     })();
  //   }, [id]);
  const [allUserPost, setAllUserPosts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const userPosts = await usersAPIs.getUsersPosts();
        if (userPosts === "no posts") {
          setAllUserPosts();
        } else {
          const reversedPosts = userPosts.reverse();
          setAllUserPosts(reversedPosts);
          console.log(userPosts);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  console.log(allUserPost);
  return (
    <div className={styles.UserPage}>
      {showModal ? (
        <PostModal
          user={user}
          setUser={setUser}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      ) : (
        <></>
      )}
      <div className={styles.userAside}>
        <h1>{user.username}</h1>
        {user ? (
          <img
            id={styles.profilePic}
            src={`/profilePics/${user.profileImage}`}
          />
        ) : (
          <img
            id={styles.profilePic}
            src={`/src/assets/userFunc/profileImage.png`}
          />
        )}

        <h2>Edit</h2>
        {user ? (
          <div className={styles.bio}>
            <h2>{user.bio}</h2>
          </div>
        ) : (
          <div className={styles.bio}>
            <h2>About</h2>
          </div>
        )}
        <div className={styles.functions}>
          <h3>friends</h3>
          <h3>settings</h3>
          <h3>+</h3>
        </div>
      </div>
      <div className={styles.userPosts}>
        <h1 id={styles.posts}>Your Posts</h1>
        {allUserPost ? (
          allUserPost.map((post) => {
            return (
              <Post
                id={post._id}
                title={post.title}
                forum={post.forum.title}
                sender={post.sender.username}
                text={post.text}
                image={post.image}
                comments={post.comments}
                likes={post.likes}
                dislikes={post.dislikes}
              ></Post>
            );
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
