import styles from "./PostPage.module.scss";
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as postAPIs from "../../../utilities/post-api.cjs";
import React from "react";
import { useMediaQuery } from "@react-hook/media-query";
import * as forumService from "../../../utilities/forum-api.cjs";
import * as userService from "../../../utilities/users-api.cjs";
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
import ImageModal from "../../components/ImageModal/ImageModal";
export default function PostPage({ user }) {
  function zip(arr1, arr2) {
    const minLength = Math.min(arr1.length, arr2.length);
    const result = [];
    for (let i = 0; i < minLength; i++) {
      result.push([arr1[i], arr2[i]]);
    }
    return result;
  }
  const { id } = useParams();
  const inputRef = useRef(null);
  const darkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const navigate = useNavigate();

  const [newComment, setNewComment] = useState();
  const [post, setPost] = useState();
  const [likedClicked, setLikedClicked] = useState(false);
  const [dislikedClicked, setDislikedClicked] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [allForums, setAllForums] = useState([]);
  const [commentUsernames, setCommentUsernames] = useState([]);
  const [commentUserIds, setCommentUserIds] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const commentorIds = [];
        const post = await postAPIs.getPost(id);
        setPost(post);
        for (let commentor of post.comments) {
          commentorIds.push(commentor.sender);
        }
        setCommentUserIds(commentorIds);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);

  useEffect(() => {
    const fetchUsernames = async () => {
      try {
        const usernameList = await Promise.all(
          commentUserIds.map(async (userId) => {
            const user = await userService.getUser(userId);
            return user.username;
          })
        );
        setCommentUsernames(usernameList);
      } catch (error) {
        console.error("Error fetching usernames:", error);
      }
    };
    if (commentUserIds.length > 0) {
      fetchUsernames();
    }
  }, [commentUserIds]);

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

  function handleChange(e) {
    setNewComment({ text: e.target.value });
  }

  async function handleLike() {
    setLikedClicked(!likedClicked);
    try {
      const updatedPost = likedClicked
        ? await postAPIs.unlikePost(id)
        : await postAPIs.likePost(id);
      setPost(updatedPost);
    } catch (error) {
      console.log({ error: error });
    }
  }

  async function handleDislike() {
    setDislikedClicked(!dislikedClicked);
    try {
      const updatedPost = dislikedClicked
        ? await postAPIs.undislikePost(id)
        : await postAPIs.dislikePost(id);
      setPost(updatedPost);
    } catch (error) {
      console.log({ error: error });
    }
  }

  async function addComment(e) {
    e.preventDefault();
    try {
      const updatedCommentWithPost = await postAPIs.commentOnPost(
        newComment,
        id
      );
      setPost(updatedCommentWithPost.updatedPost);
    } catch (error) {
      console.log({ error: error });
    }
    inputRef.current.value = "";
  }

  const zippedComments = zip(post?.comments || [], commentUsernames);
  console.log("ZIPPED COMMENTS: ", zippedComments);
  return (
    <div className={styles.PostPage}>
      {post ? (
        <>
          {showImageModal ? (
            <ImageModal
              setShowImageModal={setShowImageModal}
              image={post.image}
            />
          ) : null}
          <div className={styles.allForumsAside}>
            <h1 className={styles.pageTitle}>Post</h1>
            <h1>Forums</h1>
            {allForums.map((forum) => (
              <Link
                className={styles.allTheForums}
                to={`/forum/${forum._id}`}
                key={forum._id}
              >
                <ChevronRightIcon /> {forum.title}
              </Link>
            ))}
          </div>
          <section>
            <header>
              <h3
                id={styles.postForum}
                onClick={() => navigate(`/forum/${post.forum._id}`)}
                className={styles.headerClickables}
              >
                {post.forum.title}
              </h3>
              {post.sender ? (
                <h3
                  id={styles.sender}
                  onClick={() => navigate(`/user/${post.sender._id}`)}
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
                  onClick={() => setShowImageModal(true)}
                  className={styles.postImage}
                  src={`/profilePics/${post.image}`}
                />
              ) : (
                <p>{post.text}</p>
              )}
            </aside>
            <div className={styles.interactions}>
              <h4
                className={styles.dislike}
                onClick={handleLike}
                style={{
                  color: likedClicked
                    ? darkMode
                      ? "#FF6410"
                      : "rgb(180,217,247)"
                    : "inherit",
                }}
              >
                <ChevronUpIcon /> {post.likes}
              </h4>
              <h4
                className={styles.dislike}
                onClick={handleDislike}
                style={{
                  color: dislikedClicked
                    ? darkMode
                      ? "#FF6410"
                      : "rgb(180,217,247)"
                    : "inherit",
                }}
              >
                <ChevronDownIcon /> {post.dislikes}
              </h4>
              <h4>
                <ChatIcon /> {post.comments.length}
              </h4>
              <h4 className={styles.date}>{post.createdAt.slice(0, 10)}</h4>
            </div>
            <div className={styles.commentDiv}>
              <div className={styles.commentSection}>
                {zippedComments.length > 0 ? (
                  zippedComments.map(([comment, username]) => (
                    <li className={styles.comment} key={comment._id}>
                      <p className={styles.commentLeftSide}>
                        <Link to={`/user/${comment.sender}`}>{username}</Link>:
                      </p>
                      <p className={styles.commentRightSide}>{comment.text}</p>
                    </li>
                  ))
                ) : (
                  <h4>Add Comment</h4>
                )}
              </div>
              <div className={styles.inputDiv}>
                {user ? (
                  <form onSubmit={addComment}>
                    <input ref={inputRef} onChange={handleChange} type="text" />
                    <button className={styles.commentButton} type="submit">
                      Comment
                    </button>
                  </form>
                ) : (
                  <h2>Login or sign up to comment</h2>
                )}
              </div>
            </div>
          </section>
        </>
      ) : (
        <div>Post Deleted</div>
      )}
      <div className={styles.posterInfo}>
        {post ? (
          <>
            <h1>OP</h1>
            <Link to={`/user/${post.sender._id}`}>
              <img
                id={styles.profilePic}
                src={`/profilePics/${
                  post.sender.profileImage ||
                  "/src/assets/userFunc/profileImage.png"
                }`}
              />
            </Link>
            <h2>{post.sender.username}</h2>
            {post.sender.posts.length > 0 && (
              <h2>Posts: {post.sender.posts.length}</h2>
            )}
            <h2>Founded Forums: {post.sender.foundedForums.length}</h2>
          </>
        ) : (
          <>Post Not Found</>
        )}
      </div>
    </div>
  );
}
