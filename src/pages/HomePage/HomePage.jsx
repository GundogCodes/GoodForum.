import styles from "./HomePage.module.scss";
import HomePosts from "../../components/HomePosts/HomePosts";
import Footer from "../../components/Footer/Footer";
import UserAside from "../../components/UserAside/UserAside";
import { Link } from "react-router-dom";
import FormModal from "../../components/ForumModal/ForumModal";
import { useState, useEffect } from "react";
import * as forumService from "../../../utilities/forum-api.cjs";
import * as postAPI from "../../../utilities/post-api.cjs";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";
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
        console.log("allforums", forums);
        setAllPosts(posts);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  /******************************************** FUNCTIONS ********************************************/

  function handleCreateClick() {
    console.log("showModal", showModal);
    setShowModal(!showModal);
  }
  return (
    <div className={styles.HomePage}>
      {forums ? <SearchBar forums={forums} /> : <></>}
      {showModal ? (
        <FormModal
          title={"Create a New Quarry"}
          showModal={showModal}
          setShowModal={setShowModal}
          headings={["Title", "Topic", "Brief Description"]}
        />
      ) : (
        <></>
      )}
      <section className={styles.userInfo}>
        <div className={styles.userPic}>
          {user && user.profileImage ? (
            <img
              onClick={() => {
                navigate("/user");
              }}
              src={`profilePics/${user.profileImage}`}
            />
          ) : (
            <img
              onClick={() => {
                navigate("/user");
              }}
              src="src/assets/userFunc/profileImage.png"
            />
          )}
        </div>
        {user ? (
          <>
            <div className={styles.username}>
              {user ? `Hey, ${user.username}` : "Login"}
            </div>
            <ul className={styles.userForums}>
              <h4>Your Quarries</h4>
              {user.followedForums.length > 0 ? (
                user.followedForums.map((forum) => {
                  return (
                    <li
                      onClick={() => {
                        navigate(`/forum/${forum._id}`);
                      }}
                      className={styles.forumTitles}
                    >
                      {forum.title}
                    </li>
                  );
                })
              ) : (
                <></>
              )}
            </ul>
          </>
        ) : (
          <></>
        )}
      </section>

      <HomePosts allPosts={allPosts} />

      <ul className={styles.buttonDiv}>
        <h4>Explore Quarries</h4>
        {forums.map((forum) => {
          return (
            <Link to={`forum/${forum._id}`}>
              <li>{forum.title}</li>
            </Link>
          );
        })}
        <button onClick={handleCreateClick}>+</button>
      </ul>
    </div>
  );
}
