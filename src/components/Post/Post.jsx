import { useEffect, useState, useRef } from "react";
import styles from "./Post.module.scss";
import { Link } from "react-router-dom";
import { ChatIcon, ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import * as postAPIs from "../../../utilities/post-api.cjs";
import * as usersAPIs from "../../../utilities/users-api.cjs";
export default function Post({
  user,
  setUser,
  id,
  title,
  forum,
  sender,
  comments,
  likes,
  dislikes,
  image,
  text,
  link,
  video,
}) {
  /********************************************** VARIABLES **********************************************/
  // const navigate = useNavigate();
  const likeRef = useRef(null);
  const dislikeRef = useRef(null);
  /********************************************** STATE VARIABLES **********************************************/
  const [postForumTitle, setForumTitle] = useState();
  const [postForumId, setForumId] = useState();
  const [postSender, setPostSender] = useState();
  const [createdAt, setPostCreatedAt] = useState();
  const [userLiked, setUserLiked] = useState();
  const [userDisliked, setUserDisliked] = useState();
  const [postNumOfLikes, setPostNumOfLikes] = useState(likes);
  const [postNumOfDislikes, setPostNumOfDislikes] = useState(dislikes);
  const [post, setPost] = useState({
    postId: id,
    postTitle: title,
    postForum: forum,
    postSender: sender,
    postComments: comments,
    postLikes: likes,
    postDislikes: dislikes,
    postImage: image,
    postText: text,
    postLink: link,
  });

  /********************************************** HANDLE STATES  **********************************************/
  /**********************************************  USEEFFCTS  **********************************************/
  useEffect(() => {
    (async () => {
      if (user) {
        if (user.likedPosts.length > 0 && user.dislikedPosts.length > 0) {
          if (user.likedPosts.includes(id)) {
            setUserLiked(true);
          }
          if (user.dislikedPosts.includes(id)) {
            setUserDisliked(true);
          }
        }
      }
    })();
  }, []);

  /********************************************** FUNCTIONS  **********************************************/
  async function handleLikeClicked(e) {
    const postId = likeRef.current.id;
    // console.log("POST ID", postId);
    if (user) {
      if (userDisliked && !userLiked) {
        setPost((prevPost) => ({
          ...prevPost,
          postLikes: prevPost.postLikes + 1,
          postDislikes: Math.max(prevPost.postDislikes - 1, 0),
        }));
        setUserLiked(true);
        setUserDisliked(false);
        const undislikeResponse = await postAPIs.undislikePost(postId);
        const likeResponse = await postAPIs.likePost(postId);
        // console.log("UNDISLIKE RES ", undislikeResponse);
        // console.log("LIKE RES", likeResponse);
        setUser(likeResponse.updatedUser);
        //****************************************** SECTION 1 ******************************************/
      } else if (userLiked && !userDisliked) {
        setPost((prevPost) => ({
          ...prevPost,
          postLikes: Math.max(prevPost.postLikes - 1, 0),
        }));
        setUserLiked(false);
        setUserDisliked(false);
        const unlikeResponse = await postAPIs.unlikePost(postId);
        // console.log("UNLIKE RES ", unlikeResponse);
        setUser(unlikeResponse.updatedUser);
        //****************************************** SECTION 2 ******************************************/
      } else if (!userLiked && !userDisliked) {
        setPost((prevPost) => ({
          ...prevPost,
          postLikes: prevPost.postLikes + 1,
        }));
        setUserLiked(true);
        setUserDisliked(false);
        const likeResponse = await postAPIs.likePost(postId);
        // console.log(likeResponse);
        setUser(likeResponse.updatedUser);
      }
      //****************************************** SECTION 3 ******************************************/
    } else {
      alert("sign up or login");
    }
  }
  async function handleDislikeClicked(e) {
    const postId = dislikeRef.current.id;
    // console.log("POST ID", postId);
    if (user) {
      if (userLiked && !userDisliked) {
        setPost((prevPost) => ({
          ...prevPost,
          postLikes: Math.max(prevPost.postLikes - 1, 0),
          postDislikes: prevPost.postDislikes + 1,
        }));
        setUserLiked(false);
        setUserDisliked(true);
        const unlikeResponse = await postAPIs.unlikePost(postId);
        const dislikeResponse = await postAPIs.dislikePost(postId);
        // console.log("UNLIKE RES ", unlikeResponse);
        // console.log("DISLIKE RES", dislikeResponse);
        setUser(dislikeResponse.updatedUser);
        //****************************************** SECTION 1 ******************************************/
      } else if (!userLiked && userDisliked) {
        setPost((prevPost) => ({
          ...prevPost,
          postDislikes: Math.max(prevPost.postDislikes - 1, 0),
        }));
        setUserLiked(false);
        setUserDisliked(false);
        const undislikeResponse = await postAPIs.undislikePost(postId);
        // console.log("UNDISLIKE RES ", undislikeResponse);
        setUser(undislikeResponse.updatedUser);
        //****************************************** SECTION 2 ******************************************/
      } else if (!userLiked && !userDisliked) {
        setPost((prevPost) => ({
          ...prevPost,
          postDislikes: prevPost.postDislikes + 1,
        }));
        setUserLiked(false);
        setUserDisliked(true);
        const dislikeResponse = await postAPIs.dislikePost(postId);
        // console.log("DISLIKE RES ", dislikeResponse);
        setUser(dislikeResponse.updatedUser);
      }
      //****************************************** SECTION 3 ******************************************/
    } else {
      alert("sign up or login");
    }
  }
  return (
    <div className={styles.Post}>
      <div className={styles.upper}>
        <div className={styles.upperLeft}>
          <Link to={`/forum/${postForumId}`}>
            {post && post.postForum && (
              <h3 className={styles.postForumTitle}>{post.postForum}</h3>
            )}
          </Link>
          {post && post.postSender && (
            <h3 className={styles.postSenderName}>{post.postSender}</h3>
          )}
          <h2 className={styles.postTitle}>{post.postTitle}</h2>
        </div>
        <div className={styles.upperRight}>
          {createdAt && (
            <h4 className={styles.date}>{createdAt.slice(0, 10)}</h4>
          )}
        </div>
      </div>
      <div className={styles.body}>
        <Link to={`/post/${id}`}>
          {post && post.postText ? (
            <p className={styles.postText}>{post.postText}</p>
          ) : (
            <></>
          )}
          {image && (
            <img
              className={styles.postImage}
              src={`/profilePics/${image}`}
              alt="Post"
            />
          )}
        </Link>
      </div>
      <div className={styles.bottom}>
        <div className={styles.interactions}>
          {user && userLiked ? (
            <h4
              onClick={handleLikeClicked}
              ref={likeRef}
              id={`${id}`}
              className={styles.userliked}
            >
              <ChevronUpIcon /> {post.postLikes}
            </h4>
          ) : (
            <h4
              onClick={handleLikeClicked}
              ref={likeRef}
              id={`${id}`}
              className={styles.likes}
            >
              <ChevronUpIcon /> {post.postLikes}
            </h4>
          )}
          {user && userDisliked ? (
            <h4
              onClick={handleDislikeClicked}
              ref={dislikeRef}
              id={`${id}`}
              className={styles.userdisliked}
            >
              <ChevronDownIcon /> {post.postDislikes}
            </h4>
          ) : (
            <h4
              onClick={handleDislikeClicked}
              ref={dislikeRef}
              id={`${id}`}
              className={styles.dislikes}
            >
              <ChevronDownIcon /> {post.postDislikes}
            </h4>
          )}
          <h4>
            {post && post.postComments ? (
              <>
                <ChatIcon /> {` ${post.postComments.length}`}
              </>
            ) : (
              <>
                <ChatIcon /> {` ${post.postComments.length}`}
              </>
            )}
          </h4>
        </div>
      </div>
    </div>
  );
}
