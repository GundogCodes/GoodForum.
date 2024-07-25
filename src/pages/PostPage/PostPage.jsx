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
  ChevronUpIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  ChatIcon,
} from "@chakra-ui/icons";
import ImageModal from "../../components/ImageModal/ImageModal";
export default function PostPage({ user, setUser }) {
  /********************************************** FUNCTIONS **********************************************/

  function zip(arr1, arr2) {
    const minLength = Math.min(arr1.length, arr2.length);
    const result = [];
    for (let i = 0; i < minLength; i++) {
      result.push([arr1[i], arr2[i]]);
    }
    return result;
  }
  function handleChange(e) {
    setNewComment({ text: e.target.value });
  }
  /********************************************** STATE VARIABLES **********************************************/

  const [newComment, setNewComment] = useState();
  const [post, setPost] = useState();
  const [userLiked, setUserLiked] = useState(false);
  const [userDisliked, setUserDisliked] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [allForums, setAllForums] = useState([]);
  const [commentUsernames, setCommentUsernames] = useState([]);
  const [commentUserIds, setCommentUserIds] = useState([]);
  /********************************************** VARIABLES **********************************************/

  const { id } = useParams();
  const inputRef = useRef(null);
  const darkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const navigate = useNavigate();
  const likeRef = useRef(null);
  const dislikeRef = useRef(null);
  const zippedComments = zip(post?.comments || [], commentUsernames);
  /**********************************************  USEEFFCTS  **********************************************/
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
    (() => {
      if (user && user.likedPosts.includes(id)) {
        setUserLiked(true);
      }
      if (user && user.dislikedPosts.includes(id)) {
        setUserDisliked(true);
      }
    })();
  }, []);

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

  /********************************************** ASYNC FUNCTIONS  **********************************************/
  //LIKE
  async function handleLikeClicked(e) {
    const postId = likeRef.current.id;
    console.log("POST ID", postId);
    if (user) {
      if (userDisliked && !userLiked) {
        // setPost((prevPost) => ({
        //   ...prevPost,
        //   postLikes: prevPost.postLikes + 1,
        //   postDislikes: Math.max(prevPost.postDislikes - 1, 0),
        // }));
        setUserLiked(true);
        setUserDisliked(false);
        const undislikeResponse = await postAPIs.undislikePost(postId);
        const likeResponse = await postAPIs.likePost(postId);
        // console.log("UNDISLIKE RES ", undislikeResponse);
        // console.log("LIKE RES", likeResponse);
        setUser(likeResponse.updatedUser);
        setPost(likeResponse.updatedPost);
        //****************************************** SECTION 1 ******************************************/
      } else if (userLiked && !userDisliked) {
        // setPost((prevPost) => ({
        //   ...prevPost,
        //   postLikes: Math.max(prevPost.postLikes - 1, 0),
        // }));
        setUserLiked(false);
        setUserDisliked(false);
        const unlikeResponse = await postAPIs.unlikePost(postId);
        // console.log("UNLIKE RES ", unlikeResponse);
        setUser(unlikeResponse.updatedUser);
        setPost(unlikeResponse.updatedPost);
        //****************************************** SECTION 2 ******************************************/
      } else if (!userLiked && !userDisliked) {
        // setPost((prevPost) => ({
        //   ...prevPost,
        //   postLikes: prevPost.postLikes + 1,
        // }));
        setUserLiked(true);
        setUserDisliked(false);
        const likeResponse = await postAPIs.likePost(postId);
        // console.log(likeResponse);
        setUser(likeResponse.updatedUser);
        setPost(likeResponse.updatedPost);
      }
      //****************************************** SECTION 3 ******************************************/
    } else {
      alert("sign up or login");
    }
  }
  async function handleDislikeClicked(e) {
    const postId = dislikeRef.current.id;
    console.log("POST ID", postId);
    if (user) {
      if (userLiked && !userDisliked) {
        // setPost((prevPost) => ({
        //   ...prevPost,
        //   postLikes: Math.max(prevPost.postLikes - 1, 0),
        //   postDislikes: prevPost.postDislikes + 1,
        // }));
        setUserLiked(false);
        setUserDisliked(true);
        const unlikeResponse = await postAPIs.unlikePost(postId);
        const dislikeResponse = await postAPIs.dislikePost(postId);
        // console.log("UNLIKE RES ", unlikeResponse);
        // console.log("DISLIKE RES", dislikeResponse);
        setUser(dislikeResponse.updatedUser);
        setPost(dislikeResponse.updatedPost);
        //****************************************** SECTION 1 ******************************************/
      } else if (!userLiked && userDisliked) {
        // setPost((prevPost) => ({
        //   ...prevPost,
        //   postDislikes: Math.max(prevPost.postDislikes - 1, 0),
        // }));
        setUserLiked(false);
        setUserDisliked(false);
        const undislikeResponse = await postAPIs.undislikePost(postId);
        // console.log("UNDISLIKE RES ", undislikeResponse);
        setUser(undislikeResponse.updatedUser);
        setPost(undislikeResponse.updatedPost);
        //****************************************** SECTION 2 ******************************************/
      } else if (!userLiked && !userDisliked) {
        // setPost((prevPost) => ({
        //   ...prevPost,
        //   postDislikes: prevPost.postDislikes + 1,
        // }));
        setUserLiked(false);
        setUserDisliked(true);
        const dislikeResponse = await postAPIs.dislikePost(postId);
        // console.log("DISLIKE RES ", dislikeResponse);
        setUser(dislikeResponse.updatedUser);
        setPost(dislikeResponse.updatedPost);
      }
      //****************************************** SECTION 3 ******************************************/
    } else {
      alert("sign up or login");
    }
  }
  //******************************************  ADDING COMMENT SECTION ******************************************/
  async function addComment(e) {
    e.preventDefault();
    try {
      const updatedCommentWithPost = await postAPIs.commentOnPost(
        newComment,
        id
      );
      console.log("RETURN FROM ADDING COMMENT", updatedCommentWithPost);
      setPost(updatedCommentWithPost.updatedPost);
      window.location.reload();
    } catch (error) {
      console.log({ error: error });
    }
    inputRef.current.value = "";
  }
  //******************************************  ADDING COMMENT SECTION ******************************************/
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
                ref={likeRef}
                id={`${id}`}
                className={styles.dislike}
                onClick={handleLikeClicked}
                style={{
                  color: handleLikeClicked
                    ? darkMode
                      ? "#FF6410"
                      : "rgb(191, 63, 27)"
                    : "inherit",
                }}
              >
                <ChevronUpIcon /> {post.likes}
              </h4>
              <h4
                ref={dislikeRef}
                id={`${id}`}
                className={styles.dislike}
                onClick={handleDislikeClicked}
                style={{
                  color: handleDislikeClicked
                    ? darkMode
                      ? "#FF6410"
                      : "rgb(191, 63, 27)"
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
        <div>Post Not Found</div>
      )}
      <div className={styles.posterInfo}>
        {post ? (
          <>
            <h1>OP</h1>
            <Link to={`/user/${post.sender._id}`}>
              {post.sender.profileImage ? (
                <img
                  id={styles.profilePic}
                  src={`/profilePics/${post.sender.profileImage}`}
                />
              ) : (
                <img
                  id={styles.profilePic}
                  src={"/src/assets/userFunc/profileImage.png"}
                />
              )}
            </Link>
            {post.sender ? (
              <>
                <h2>{post.sender.username}</h2>
                <h2>Posts: {post.sender.posts.length}</h2>
                <h2>Founded Forums: {post.sender.foundedForums.length}</h2>
              </>
            ) : (
              <></>
            )}
          </>
        ) : (
          <p className={styles.loading}>Loading...</p>
        )}
      </div>
    </div>
  );
}
