import styles from "./UserPage.module.scss";
import UserAside from "../../components/UserAside/UserAside";
//import UserPosts from "../../components/UserPosts/UserPosts";
import Footer from "../../components/Footer/Footer";
import { useState, useEffect } from "react";
import PostModal from "../../components/PostModal/PostModal";
import { Link, useParams } from "react-router-dom";
import * as usersAPIs from "../../../utilities/users-api.cjs";
import Post from "../../components/Post/Post";
import { useNavigate } from "react-router-dom";
import { ChevronRightIcon, CloseIcon, PlusSquareIcon } from "@chakra-ui/icons";
import * as forumService from "../../../utilities/forum-api.cjs";
import axios from "axios";

export default function UserPage({ user, setUser }) {
  /********************************************** VARIABLES **********************************************/
  const { id } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [allUserPost, setAllUserPosts] = useState([]);
  const [userFoundedForums, setUserFoundedForums] = useState([]);

  /********************************************** USE EFFECTS **********************************************/
  useEffect(() => {
    (async () => {
      try {
        const userPosts = await usersAPIs.getUsersPosts();
        if (userPosts === "no posts") {
          setAllUserPosts([]);
        } else {
          const reversedPosts = userPosts.reverse();
          setAllUserPosts(reversedPosts);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  console.log("USER: ", user);

  /******************************************** STATES ********************************************/
  const [file, setFile] = useState();
  const [showUploadForm, setShowUploadForm] = useState(false);

  /******************************************** HANDLE STATES ********************************************/
  function showForm() {
    setShowUploadForm(!showUploadForm);
  }

  /******************************************** CONTROL PANEL FUNCTIONS ********************************************/
  function handleControlPanel(e) {
    if (!user) {
      alert("Login to Continue");
      return;
    }
    const button = e.target.name;
    if (user && button === "friends") {
      navigate("/friends");
    } else if (user && button === "settings") {
      navigate("/settings");
    }
  }

  function setShow() {
    if (!user) {
      alert("Login to Continue");
      navigate("/login");
    }
    setShowModal(true);
    console.log(showUploadForm);
  }

  /******************************************** UPLOADING PROFILE IMAGES ********************************************/
  async function submit(e) {
    e.preventDefault();
    console.log("file", file.name);
    const formData = new FormData();
    formData.append("profilePic", file);
    try {
      const result = await axios.post("/api/profilePic", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(result.data);
      const updatedUser = await usersAPIs.updateUserInfo(user._id, {
        profileImage: file.name,
      });
      console.log("updatedUser", updatedUser);
      setUser(updatedUser);
    } catch (error) {
      console.log({ error: error });
    }
  }

  return (
    <div className={styles.UserPage}>
      {showModal && (
        <PostModal
          user={user}
          setUser={setUser}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
      <div className={styles.userForums}>
        <h1 className={styles.pageTitle}>{user ? user.username : "User"}</h1>
        <h2>Followed Forums</h2>
        {user ? (
          user.followedForums.map((forum) => (
            <p key={forum._id}>
              <Link to={`/forum/${forum._id}`}>
                <ChevronRightIcon /> {forum.title}
              </Link>
            </p>
          ))
        ) : (
          <></>
        )}
        <h2>Founded Forums</h2>
        {user && user.foundedForums ? (
          user.foundedForums.map((eachForum) => (
            <p key={eachForum._id}>
              <Link to={`/forum/${eachForum._id}`}>
                <ChevronRightIcon /> {eachForum.title}
              </Link>
            </p>
          ))
        ) : (
          <></>
        )}
        <h2>Friends</h2>
        {user && user.friends ? (
          user.friends.map((friend) => {
            return (
              <p className={styles.userFriend} key={friend._id}>
                <Link to={`/user/${friend._id}`}>
                  <ChevronRightIcon /> {friend.username}
                </Link>
              </p>
            );
          })
        ) : (
          <></>
        )}
      </div>
      <div className={styles.userPageBody}>
        <div className={styles.userAside}>
          <div className={styles.userAsideTop}>
            <div className={styles.userAsideTopLeft}>
              <div className={styles.userPic}>
                {user && user.profileImage ? (
                  <img
                    id={styles.profilePic}
                    src={`/profilePics/${user.profileImage}`}
                    alt="Profile"
                  />
                ) : (
                  <img
                    id={styles.profilePic}
                    src={`/src/assets/userFunc/profileImage.png`}
                    alt="Profile"
                  />
                )}
                <p
                  onClick={() => {
                    setShowUploadForm(true);
                  }}
                  className={styles.uploadPic}
                >
                  <PlusSquareIcon className={styles.addPic} color={"white"} />
                </p>
                {showUploadForm && (
                  <form className={styles.submitForm} onSubmit={submit}>
                    <div
                      className={styles.closeIcon}
                      onClick={() => {
                        setShowUploadForm(false);
                      }}
                    >
                      <CloseIcon />
                    </div>
                    <input
                      className={styles.cf}
                      onChange={(e) => setFile(e.target.files[0])}
                      type="file"
                      accept="image/*"
                    />
                    <button type="submit">Upload!</button>
                  </form>
                )}
              </div>
              <h1 className={styles.username}>
                {user ? (
                  user.username
                ) : (
                  <Link to={"/login"}>Login/Sign up</Link>
                )}
              </h1>
            </div>
            <div className={styles.userAsideTopRight}>
              <div className={styles.bio}>
                <h2>{user ? user.bio : "Add Your Bio ..."}</h2>
              </div>
            </div>
          </div>

          <div className={styles.functions}>
            <h4
              className={styles.createPost}
              onClick={() => setShowModal(true)}
            >
              Create Post
            </h4>
            <Link to="/friends" className={styles.createPost}>
              Friends
            </Link>
            <Link to="/settings" className={styles.createPost}>
              Settings
            </Link>
          </div>
        </div>
        <div className={styles.userPosts}>
          {allUserPost.length > 0 ? (
            allUserPost.map((post) => (
              <Post
                key={post._id}
                id={post._id}
                title={post.title}
                forum={post.forum.title}
                sender={post.sender.username}
                text={post.text}
                image={post.image}
                comments={post.comments}
                likes={post.likes}
                dislikes={post.dislikes}
                user={user}
                setUser={setUser}
              />
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className={styles.stats}>
        <h1>User Stats</h1>
        {user && (
          <>
            <h3>Friends: {user.friends.length}</h3>
            <h3>Posts: {user.posts.length}</h3>
            <h3>Liked Posts: {user.likedPosts.length}</h3>
            <h3>Disliked Posts: {user.dislikedPosts.length}</h3>
          </>
        )}
      </div>
    </div>
  );
}
