import styles from "./OtherUserPage.module.scss";
import * as userAPIs from "../../../utilities/users-api.cjs";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Post from "../../components/Post/Post";
import * as forumService from "../../../utilities/forum-api.cjs";
import { ChevronRightIcon } from "@chakra-ui/icons";

export default function OtherUserPage({ user, setUser }) {
  /********************************************** VARIABLES **********************************************/
  const { id } = useParams();
  const navigate = useNavigate();
  /********************************************** STATES **********************************************/
  const [isFriend, setIsFriend] = useState(false);
  const [userPage, setUserPage] = useState(null);
  const [allForums, setAllForums] = useState([]);
  /********************************************** FUNCTIONS **********************************************/
  function handlePostClick(e) {
    console.log(e.target.id);
    navigate(`/post/${e.target.id}`);
  }
  /********************************************** USE EFFECTS **********************************************/

  useEffect(() => {
    (async () => {
      try {
        const allUserPosts = await forumService.getAll();
        setAllForums(allUserPosts);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  useEffect(() => {
    if (user) {
      for (let friend of user.friends) {
        console.log("FRIEND ID", friend._id);
        if (friend._id === id) {
          setIsFriend(true);
          console.log(`USER IS FRIEND: ${isFriend}`);
        }
      }
    } else {
      setIsFriend(false);
    }
    (async () => {
      try {
        const viewingUser = await userAPIs.getUser(id);
        console.log("user is ", viewingUser);
        setUserPage(viewingUser);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  /********************************************** API CALLS **********************************************/

  async function handleMessageClicked() {
    if (isFriend !== true) {
      try {
        setIsFriend(true);
        const updatedUser = await userAPIs.addFriend(id);
        console.log("UPDATED USER", updatedUser);
        setUser(updatedUser);
        console.log(updatedUser);
        navigate("/chats");
      } catch (error) {
        console.log(error);
      }
    } else if (isFriend) {
      navigate("/chats");
    }
  }
  async function handleFriend() {
    console.log("USER", user);
    if (isFriend === true) {
      try {
        const updatedUser = await userAPIs.removeFriend(id);
        console.log("API RETURN", updatedUser);
        setIsFriend(false);
        setUser(updatedUser.user);
        setUserPage(updatedUser.friend);
        console.log("API RETURN", updatedUser);
      } catch (error) {
        console.log(error);
      }
    } else if (isFriend === false) {
      try {
        const updatedUser = await userAPIs.addFriend(id);
        setIsFriend(true);
        setUser(updatedUser.user);
        setUserPage(updatedUser.friend);
        console.log("API RETURN", updatedUser);
        //navigate('/chats')
      } catch (error) {
        console.log(error);
      }
    }
  }
  return (
    <div className={styles.OtherUserPage}>
      <div className={styles.allForumsAside}>
        <h1>Forums</h1>
        {allForums ? (
          allForums.map((forum) => {
            return (
              <Link className={styles.allTheForums} to={`/forum/${forum._id}`}>
                <ChevronRightIcon /> {forum.title}
              </Link>
            );
          })
        ) : (
          <></>
        )}
      </div>
      {userPage ? (
        <section>
          <header>
            {userPage.profileImage ? (
              <img
                className={styles.profilePic}
                src={`/profilePics/${userPage.profileImage}`}
              />
            ) : (
              <img
                className={styles.profilePic}
                src={`/src/assets/userFunc/profileImage.png`}
              />
            )}
            <h1>{userPage.username}</h1>
            <h6>{userPage.bio}</h6>
          </header>
          <div className={styles.otherUserPostList}>
            {userPage.posts.map((post) => {
              return (
                <Post
                  id={post._id}
                  title={post.title}
                  forum={post.forum}
                  sender={post.sender.username}
                  text={post.text}
                  image={post.image}
                  comments={post.comments}
                  likes={post.likes}
                  dislikes={post.dislikes}
                ></Post>
              );
            })}
          </div>
        </section>
      ) : (
        <div className={styles.wrong}>wrong</div>
      )}
      <div className={styles.otherUserStats}>
        <h1>Stats</h1>
        <aside>
          {userPage ? (
            <>
              <p>Friends: {userPage.friends.length}</p>
              <p>Quarries: {userPage.followedForums.length}</p>
              <p>Posts: {userPage.posts.length}</p>
            </>
          ) : (
            <></>
          )}
        </aside>
        {user && id === user._id ? (
          <></>
        ) : (
          <div className={styles.interactions}>
            <p onClick={handleMessageClicked}>Message</p>
            {isFriend ? (
              <p onClick={handleFriend}>Remove Friend</p>
            ) : (
              <p onClick={handleFriend}>Add Friend</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
