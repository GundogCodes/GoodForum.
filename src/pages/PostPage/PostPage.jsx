import styles from "./PostPage.module.scss";
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as postAPIs from "../../../utilities/post-api.cjs";
import React from "react";
import { useMediaQuery } from "@react-hook/media-query";
import ImageModal from "../../components/ImageModal/ImageModal";
import * as forumService from "../../../utilities/forum-api.cjs";
import { Link } from "react-router-dom";
import {
  PhoneIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronUpIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  ChatIcon,
} from "@chakra-ui/icons";

export default function PostPage({ user }) {
  /********************************************** VARIABLES **********************************************/
  const { id } = useParams();
  const inputRef = useRef(null);
  const darkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const navigate = useNavigate();
  /********************************************** STATES **********************************************/
  const [newComment, setNewComment] = useState();
  const [commentInfo, setCommentInfo] = useState();
  const [post, setPost] = useState();
  const [likedClicked, setLikedClicked] = useState(false);
  const [dislikedClicked, setDislikedClicked] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [allForums, setAllForums] = useState([]);
  /********************************************** USEEFFECT **********************************************/
  useEffect(() => {
    (async () => {
      try {
        const post = await postAPIs.getPost(id);
        setPost(post);
        console.log("POST: ", post);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);
  useEffect(() => {
    (async () => {
      try {
        const forums = await forumService.getAll();
        setAllForums(forums);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  /********************************************** FUNCTIONS **********************************************/
  function handleChange(e) {
    setNewComment({ text: e.target.value });
    console.log(newComment);
  }
  /********************************************** API CALLS **********************************************/
  async function handleLike() {
    console.log("like");
    setLikedClicked(!likedClicked);
    if (likedClicked) {
      try {
        const updatedPost = await postAPIs.unlikePost(id);
        console.log("updated post: ", updatedPost);
        setPost(updatedPost);
      } catch (error) {
        console.log({ error: error });
      }
    } else {
      try {
        const updatedPost = await postAPIs.likePost(id);
        console.log("updated post: ", updatedPost);
        setPost(updatedPost);
      } catch (error) {
        console.log({ error: error });
      }
    }
  }
  async function handleDislike() {
    console.log("dislike");
    setDislikedClicked(!dislikedClicked);
    if (dislikedClicked) {
      try {
        const updatedPost = await postAPIs.undislikePost(id);
        console.log("updated post: ", updatedPost);
        setPost(updatedPost);
      } catch (error) {
        console.log({ error: error });
      }
    } else {
      try {
        const updatedPost = await postAPIs.dislikePost(id);
        console.log("updated post: ", updatedPost);
        setPost(updatedPost);
      } catch (error) {
        console.log({ error: error });
      }
    }
  }
  async function addComment(e) {
    e.preventDefault();
    console.log("new Comment is:", newComment);
    try {
      const updatedCommentWithPost = await postAPIs.commentOnPost(
        newComment,
        id
      );
      console.log(updatedCommentWithPost);
      setPost(updatedCommentWithPost.updatedPost);
      setCommentInfo(updatedCommentWithPost.senders);
    } catch (error) {
      console.log({ error: error });
    }
    inputRef.current.value = "";
  }
  console.log("POST:::", post);
  return (
    <div className={styles.PostPage}>
      {post ? (
        <>
          {showImageModal ? (
            <ImageModal
              setShowImageModal={setShowImageModal}
              image={post.image}
            />
          ) : (
            <></>
          )}
          <div className={styles.allForumsAside}>
            <h1 className={styles.pageTitle}>Post</h1>
            <h1>Forums</h1>
            {allForums ? (
              allForums.map((forum) => {
                return (
                  <Link
                    className={styles.allTheForums}
                    to={`/forum/${forum._id}`}
                  >
                    <ChevronRightIcon /> {forum.title}
                  </Link>
                );
              })
            ) : (
              <></>
            )}
          </div>
          {post ? (
            <section>
              <header>
                <h3
                  id={styles.postForum}
                  onClick={() => {
                    navigate(`/forum/${post.forum._id}`);
                  }}
                  className={styles.headerClickables}
                >
                  {post.forum.title}
                </h3>
                {post.sender ? (
                  <h3
                    id={styles.sender}
                    onClick={() => {
                      navigate(`/user/${post.sender._id}`);
                    }}
                    className={styles.headerClickables}
                  >
                    {post.sender.username}
                  </h3>
                ) : (
                  <h3>Deleted User</h3>
                )}
                <h3 id={styles.postTitle}>{post.title}</h3>
              </header>
              <aside>
                {post.image ? (
                  <img
                    onClick={() => {
                      setShowImageModal(true);
                    }}
                    className={styles.postImage}
                    src={`/profilePics/${post.image}`}
                  />
                ) : (
                  <p>{post.text}</p>
                )}
              </aside>
              <div className={styles.interactions}>
                {likedClicked ? (
                  darkMode ? (
                    <h4
                      style={{ color: "#FF6410" }}
                      className={styles.dislike}
                      onClick={handleLike}
                    >
                      <ChevronUpIcon /> {post.likes}
                    </h4>
                  ) : (
                    <h4
                      style={{ color: "rgb(180,217,247)" }}
                      className={styles.dislike}
                      onClick={handleLike}
                    >
                      <ChevronDownIcon /> {post.likes}
                    </h4>
                  )
                ) : (
                  <h4 className={styles.dislike} onClick={handleLike}>
                    <ChevronUpIcon /> {post.likes}
                  </h4>
                )}

                {dislikedClicked ? (
                  darkMode ? (
                    <h4
                      style={{ color: "#FF6410" }}
                      className={styles.dislike}
                      onClick={handleDislike}
                    >
                      <ChevronDownIcon /> {post.dislikes}
                    </h4>
                  ) : (
                    <h4
                      style={{ color: "rgb(180,217,247)" }}
                      className={styles.dislike}
                      onClick={handleDislike}
                    >
                      <ChevronDownIcon /> {post.dislikes}
                    </h4>
                  )
                ) : (
                  <h4 className={styles.dislike} onClick={handleDislike}>
                    <ChevronDownIcon /> {post.dislikes}
                  </h4>
                )}
                <h4>
                  <ChatIcon /> {post.comments.length}
                </h4>
                <h4 className={styles.date}>{post.createdAt.slice(0, 10)}</h4>
              </div>
              <div className={styles.commentDiv}>
                <div className={styles.commentSection}>
                  {post.comments ? (
                    post.comments.map((comment) => {
                      return (
                        <li className={styles.comment}> {comment.text}</li>
                      );
                    })
                  ) : (
                    <h4>Add Comment</h4>
                  )}
                </div>

                <div className={styles.inputDiv}>
                  {user ? (
                    <form onSubmit={addComment}>
                      <input
                        ref={inputRef}
                        onChange={handleChange}
                        type="text"
                      />
                      <button className={styles.commentButton} type="submit">
                        Comment
                      </button>
                    </form>
                  ) : (
                    <>
                      <h2>Login or sign up to comment</h2>
                    </>
                  )}
                </div>
              </div>
            </section>
          ) : (
            <img
              className={styles.loading}
              src={"../../src/assets/AppFunctions/ZKZg.gif"}
            />
          )}
        </>
      ) : (
        <div>Post Deleted</div>
      )}
      <div className={styles.posterInfo}>
        {post ? (
          <>
            <h1>OP</h1>
            {post.sender.profileImage && post ? (
              <Link to={`/user/${post.sender._id}`}>
                <img
                  id={styles.profilePic}
                  src={`/profilePics/${post.sender.profileImage}`}
                />
              </Link>
            ) : (
              <Link>
                <img
                  id={styles.profilePic}
                  src={`/src/assets/userFunc/profileImage.png`}
                />
              </Link>
            )}
            <h2>{post.sender.username}</h2>
            <h2>Posts: {post.sender.posts.length}</h2>
            <h2>Founded Forums: {post.sender.foundedForums.length}</h2>
          </>
        ) : (
          <>Post Not Found</>
        )}
      </div>
    </div>
  );
}
