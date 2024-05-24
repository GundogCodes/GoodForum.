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
//import * as userService from "../../../utilities/users-api.cjs";
import axios from "axios";
export default function UserPage({ user, setUser }) {
  /********************************************** VARIABLES **********************************************/
  const { id } = useParams();
  const navigate = useNavigate();
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
  /******************************************** States ********************************************/
  const [file, setFile] = useState();
  const [showUploadForm, setShowUploadForm] = useState(false);

  /******************************************** Handle States ********************************************/
  function showForm() {
    setShowUploadForm(!showUploadForm);
  }
  /******************************************** Control Panel Functions ********************************************/
  function handleControlPanel(e) {
    if (!user) {
      alert("Login to Continue");
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

  /******************************************** Uploading Profile Images Async Functions ********************************************/

  async function submit(e) {
    e.preventDefault();
    console.log("file", file.name);
    const formData = new FormData();
    formData.append("profilePic", file);
    const result = await axios.post("/api/profilePic", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log(result.data);
    try {
      const updatedUser = await userService.updateUserInfo(user._id, {
        profileImage: file.name,
      });
      console.log("updatedUser", updatedUser);
      setUser(updatedUser);
    } catch (error) {
      console.log({ error: error });
    }
  }
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
        {user ? (
          <h1>{user.username}</h1>
        ) : (
          <h1
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </h1>
        )}
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
        {user && user.profileImage ? (
          <p onClick={showForm} className={styles.uploadPic}>
            Update Profile Pic
          </p>
        ) : (
          <p onClick={showForm} className={styles.uploadPic}>
            Upload Profile Pic
          </p>
        )}
        {showUploadForm ? (
          <form onSubmit={submit}>
            <input
              onChange={(e) => setFile(e.target.files[0])}
              type="file"
              accept="image/*"
            />
            <button type="submit">Upload!</button>
          </form>
        ) : (
          <></>
        )}
        {/* <h2
          onClick={() => {
            setShowUploadForm(true);
          }}
        >
          Edit
        </h2> */}
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
          <Link to="/friends">
            <img
              className={styles.userFuncs}
              src="/src/assets/userFunc/friends.png"
            />
          </Link>
          <Link to="/settings">
            <img
              className={styles.userFuncs}
              src="/src/assets/userFunc/settings.png"
            />
          </Link>
          <h4
            className={styles.userFuncs}
            onClick={() => {
              setShowModal(true);
            }}
          >
            +
          </h4>
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
