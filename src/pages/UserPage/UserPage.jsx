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
import { ChevronRightIcon, PlusSquareIcon, SunIcon } from "@chakra-ui/icons";
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
  /********************************************** USE EFFECTS **********************************************/

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
  console.log(user);
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
      <div className={styles.userForums}>
        <h2> Followed Forums</h2>
        {user ? (
          user.followedForums.map((forum) => {
            return (
              <p>
                <Link to={`/forum/${forum._id}`}>
                  <ChevronRightIcon /> {forum.title}
                </Link>
              </p>
            );
          })
        ) : (
          <></>
        )}
        <h2> Founded Forums</h2>
        {user && user.foundedForums ? (
          user.foundedForums.map((forum) => {
            return (
              <p>
                <Link to={`/forum/${forum._id}`}>
                  <ChevronRightIcon /> {forum.title}
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
                    <PlusSquareIcon className={styles.addPic} color={"white"} />
                  </p>
                ) : (
                  <p onClick={showForm} className={styles.uploadPic}>
                    <PlusSquareIcon className={styles.addPic} color={"white"} />
                  </p>
                )}
                {showUploadForm ? (
                  <form className={styles.submitForm} onSubmit={submit}>
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
              </div>
              {user ? (
                <h1 className={styles.username}>{user.username}</h1>
              ) : (
                <h1
                  className={styles.username}
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  <Link to={"/login"}> Login/Sign up</Link>
                </h1>
              )}
            </div>
            <div className={styles.userAsideTopRight}>
              {user ? (
                <div className={styles.bio}>
                  <h2>{user.bio}</h2>
                </div>
              ) : (
                <div className={styles.bio}>
                  <h2>Add Your Bio ...</h2>
                </div>
              )}
            </div>
          </div>
          <div className={styles.functions}>
            <h4
              className={styles.createPost}
              onClick={() => {
                setShowModal(true);
              }}
            >
              Create Post
            </h4>
            <Link to="/friends" className={styles.createPost}>
              Friends
              {/* <img
                src="/src/assets/userFunc/friends.png"
              /> */}
            </Link>
            <Link to="/settings" className={styles.createPost}>
              {/* <img
                src="/src/assets/userFunc/settings.png"
              /> */}
              Settings
            </Link>
          </div>
        </div>
        <div className={styles.userPosts}>
          {/* <h1 id={styles.posts}>Your Posts</h1> */}
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
      <div className={styles.stats}>
        <h1>Stats</h1>
        {user ? (
          <>
            <h3>Friends: {user.friends.length}</h3>
            <h3>Posts: {user.posts.length}</h3>
            <h3>Liked Posts: {user.likedPosts.length}</h3>
            <h3>Disliked Posts: {user.dislikedPosts.length}</h3>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
