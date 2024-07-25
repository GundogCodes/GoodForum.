import styles from "./HomePage.module.scss";
import Footer from "../../components/Footer/Footer";
import UserAside from "../../components/UserAside/UserAside";
import { Link } from "react-router-dom";
import FormModal from "../../components/ForumModal/ForumModal";
import { useState, useEffect } from "react";
import * as forumService from "../../../utilities/forum-api.cjs";
import * as postAPI from "../../../utilities/post-api.cjs";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";
import Post from "../../components/Post/Post";
import { ChevronRightIcon, SunIcon } from "@chakra-ui/icons";
export default function HomePage({ user, setUser }) {
  /******************************************** VARIABLES ********************************************/
  const navigate = useNavigate();
  /******************************************** STATES ********************************************/
  const [showModal, setShowModal] = useState(false);
  const [forums, setForums] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  /******************************************** USE EFFECTS ********************************************/
  useEffect(() => {
    (async () => {
      try {
        const forums = await forumService.getAll();
        const posts = await postAPI.allPosts();
        setForums(forums);
        // console.log("allforums", forums);
        setAllPosts(posts);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  /******************************************** FUNCTIONS ********************************************/

  function handleCreateClick() {
    setShowModal(!showModal);
  }
  return (
    <div className={styles.HomePage}>
      {showModal ? (
        <FormModal
          user={user}
          setUser={setUser}
          title={"Create a New Forum"}
          showModal={showModal}
          setShowModal={setShowModal}
          headings={["Title", "Topic", "Brief Description"]}
        />
      ) : (
        <></>
      )}
      <div className={styles.mainBody}>
        {forums ? <SearchBar forums={forums} allPosts={allPosts} /> : <></>}
        {user ? (
          <div className={styles.userInfo}>
            <h1> Hey, {user.username}</h1>
            <Link to={`/user`}>
              {user.profileImage ? (
                <img
                  className={styles.profilePic}
                  src={`/profilePics/${user.profileImage}`}
                />
              ) : (
                <img
                  className={styles.profilePic}
                  src={`/src/assets/userFunc/profileImage.png`}
                />
              )}
            </Link>
            <div className={styles.userForums}>
              <h2>Your Forums</h2>
              {user.followedForums ? (
                <>
                  {user.followedForums.map((forum) => {
                    return (
                      <Link
                        key={`${forum._id}`}
                        className={styles.userForum}
                        to={`/forum/${forum._id}`}
                      >
                        <ChevronRightIcon /> {forum.title}
                      </Link>
                    );
                  })}
                </>
              ) : (
                <></>
              )}
              <h2>Friends</h2>
              {user.friends ? (
                <>
                  {user.friends.map((friend) => {
                    return (
                      <Link
                        className={styles.userForum}
                        key={`${friend._id}`}
                        to={`/user/${user._id}`}
                      >
                        <ChevronRightIcon /> {friend.username}
                      </Link>
                    );
                  })}
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        ) : (
          <div className={styles.userInfo}>
            <h1 className={styles.pageTitle}>Home</h1>
            <h1>Login</h1>
            <img
              className={styles.profilePic}
              src={`/src/assets/userFunc/profileImage.png`}
            />
          </div>
        )}
        <div className={styles.homePosts}>
          {allPosts ? (
            <div className={styles.postList}>
              {allPosts.map((post) => {
                return (
                  <Post
                    key={`${post._id}`}
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
                  ></Post>
                );
              })}
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className={styles.explore}>
          <div className={styles.exploreHeading}>
            <h1>
              Explore <SunIcon boxSize={4} color={"white"} height={"15px"} />
            </h1>
          </div>
          <div className={styles.forumListDiv}>
            {forums ? (
              <div className={styles.forumList}>
                {forums.map((forum) => {
                  return (
                    <Link key={`${forum._id}`} to={`forum/${forum._id}`}>
                      <p>{forum.title}</p>
                    </Link>
                  );
                })}
                {user ? (
                  <button
                    className={styles.createPost}
                    onClick={handleCreateClick}
                  >
                    +
                  </button>
                ) : (
                  <></>
                )}
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.theFooter}>
          <div className={styles.upperSection}>
            <div className={styles.footerSection1}>
              <h3 id={styles.headings}>Contact Us</h3>
              <div className={styles.contactSection}>
                <div className={styles.contactSection1}>
                  <div className={styles.infoSection}>
                    <a
                      className={styles.email}
                      href="mailto:innovationsoftwareservices@gmail.com"
                    >
                      innovationsoftwareservices@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.footerSection2}>
              <h3 id={styles.headings}>Industries</h3>
              <div className={styles.industriesDiv}>
                <h4>Delivery & Logistics</h4> <h4>E-Commerce/Medicine</h4>{" "}
                {/* Changed from h5 to h4 */}
                <h4>Child Care & Daycare</h4> {/* Changed from h5 to h4 */}
                <h4>General Software Development</h4>{" "}
                {/* Changed from h5 to h4 */}
              </div>
            </div>
            <div className={styles.footerSection3}>
              <h3 id={styles.headings}>Follow Us</h3>
              <div className={styles.linksDiv}>
                <a href="https://linkedin.com">
                  <img
                    id={styles.links}
                    src="https://www.tforcelogistics.com/wp-content/uploads/2020/06/linkedin-1.png"
                  />
                </a>
                <a href="https://facebook.com">
                  <img
                    id={styles.links}
                    src="https://www.tforcelogistics.com/wp-content/uploads/2020/06/facebook.png"
                  />
                </a>
                <a href="https://x.com">
                  <img
                    id={styles.links}
                    src="https://www.tforcelogistics.com/wp-content/uploads/2023/10/icons8-twitterx-24.png"
                  />
                </a>
              </div>
            </div>
          </div>
          <div className={styles.lowerSection}>
            <h4> &#169; 2024 Innovation Software. All Rights Reserved.</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
