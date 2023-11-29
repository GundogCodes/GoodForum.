import styles from "./HomePosts.module.scss";
import Post from "../Post/Post";
import * as postAPIs from "../../../utilities/post-api.cjs";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { PhoneIcon, ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";

export default function HomePosts({ allPosts }) {
  /********************************* VARIABLES *********************************/
  const navigate = useNavigate();
  const likeButton = useRef(null);
  const dislikeButton = useRef(null);
  const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  /********************************* FUNCTIONS *********************************/
  function handlePostClick(e) {
    const id = e.target.id;
    navigate(`/post/${id}`);
  }
  function handleForumClick(e) {
    const id = e.target.id;
    navigate(`/forum/${id}`);
  }
  function userClick(e) {
    const id = e.target.id;
    navigate(`/user/${id}`);
  }
  /********************************* USE EFFECTS *********************************/

  /********************************* API CALLS *********************************/

  async function handleLike(e) {
    const id = e.target.id;
    console.log(e.target.innerText);
    const numOfLikes = parseInt(e.target.innerText.slice(1, 3));
    console.log(numOfLikes);
    if (isDarkMode) {
      e.target.innerHTML = `&#8593; ${numOfLikes + 1}`;
      e.target.style.color = "white";
      e.target.style.backgroundColor = "#ff6410";
      e.target.style.borderRadius = "7px";
    } else {
      e.target.innerHTML = `&#8593; ${numOfLikes + 1}`;
      e.target.style.color = "white";
      e.target.style.backgroundColor = "rgb(180,217,247)";
      e.target.style.borderRadius = "7px";
    }

    try {
      const updatedPost = await postAPIs.likePost(id);
      console.log("updated post: ", updatedPost);
    } catch (error) {
      console.log({ error: error });
    }
  }
  async function handleDislike(e) {
    const id = e.target.id;
    console.log(e.target.innerText);
    const numOfDislikes = parseInt(e.target.innerText.slice(1, 3));
    console.log(numOfDislikes);
    if (isDarkMode) {
      e.target.innerHTML = `&#8595; ${numOfDislikes + 1}`;
      e.target.style.color = "white";
      e.target.style.backgroundColor = "#ff6410";
      e.target.style.borderRadius = "7px";
    } else {
      e.target.innerHTML = `&#8595; ${numOfDislikes + 1}`;
      e.target.style.color = "white";
      e.target.style.backgroundColor = "rgb(180,217,247)";
      e.target.style.borderRadius = "7px";
    }
    try {
      const updatedPost = await postAPIs.dislikePost(id);
      console.log("updated post: ", updatedPost);
    } catch (error) {
      console.log({ error: error });
    }
  }

  function doNothing() {
    return;
  }
  console.log(allPosts);
  return (
    <ul className={styles.HomePosts}>
      {allPosts.map((post) => {
        return (
          <li>
            <section>
              <h4
                className={styles.forumTitle}
                onClick={handleForumClick}
                id={`${post.forum._id}`}
              >
                {post.forum.title}{" "}
              </h4>
              <h2 onClick={handlePostClick} id={`${post._id}`}>
                {post.title}
              </h2>
              {post.sender ? (
                <h1 onClick={userClick} id={`${post.sender._id}`}>
                  {post.sender.username}
                </h1>
              ) : (
                <h1>Deleted User</h1>
              )}
            </section>
            {post.image ? (
              <h3 onClick={handlePostClick} id={`${post._id}`}>
                <img
                  onClick={handlePostClick}
                  id={`${post._id}`}
                  className={styles.postImage}
                  src={`/profilePics/${post.image}`}
                />
              </h3>
            ) : (
              <h3 onClick={handlePostClick} id={`${post._id}`}>
                {post.text}
              </h3>
            )}
            <div className={styles.bottomSection}>
              <div id={`${post._id}`} className={styles.pDiv}>
                <p
                  id={`${post._id}`}
                  onClick={handleLike}
                  className={styles.likes}
                >
                  &#8593; {post.likes}
                </p>
                <p
                  id={`${post._id}`}
                  onClick={handleDislike}
                  className={styles.dislikes}
                >
                  &#8595; {post.dislikes}
                </p>
                <p
                  id={`${post._id}`}
                  onClick={handlePostClick}
                  className={styles.comment}
                >
                  Comments {post.comments.length}
                </p>
                <p onClick={doNothing} className={styles.date}>
                  {post.createdAt.slice(0, 10)}
                </p>
              </div>
              {post.comments.length > 0 ? (
                <footer onClick={handlePostClick} id={`${post._id}`}>
                  {post.comments[0].text}
                </footer>
              ) : (
                <></>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
