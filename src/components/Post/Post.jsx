import { useEffect, useState, useRef } from "react";
import styles from "./Post.module.scss";
import { Link } from "react-router-dom";
import { ChatIcon, ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import * as postAPIs from "../../../utilities/post-api.cjs";

export default function Post({
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
  user,
  setUser,
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
    (() => {
      if (user && user.likedPosts.includes(id)) {
        setUserLiked(true);
      }
      if (user && user.dislikedPosts.includes(id)) {
        setUserDisliked(true);
      }
    })();
  }, []);
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const post = await postAPIs.getPost(id);
  //       setForumTitle(post.forum.title);
  //       setForumId(post.forum._id);
  //       // setPostSender(post.sender.username);
  //       // setPostCreatedAt(post.createdAt);
  //       setPost(post);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   })();
  // }, []);
  //console.log("USER: ", user);
  /********************************************** FUNCTIONS  **********************************************/
  async function handleLikeClicked(e) {
    console.log("liked");
    console.log(likeRef.current.id);
    const postId = likeRef.current.id;
    // if disliked already clicked, decrement dislikes and increment liked
    if (userDisliked && !userLiked) {
      setPost((prevPost) => ({
        ...prevPost,
        postLikes: prevPost.postLikes + 1,
        postDislikes: prevPost.postDislikes - 1,
      }));
      setUserLiked(true);
      setUserDisliked(false);
    } else if (userLiked && !userDisliked) {
      setPost((prevPost) => ({
        ...prevPost,
        postLikes: prevPost.postLikes - 1,
      }));
      setUserLiked(false);
      setUserDisliked(false);
    } else if (!userLiked && !userDisliked) {
      setPost((prevPost) => ({
        ...prevPost,
        postLikes: prevPost.postLikes + 1,
      }));
      setUserLiked(true);
      setUserDisliked(false);
    }
    //if already liked and clicked again decrement likes
    //also else if disliked and liked not clicked then increment likes
  }
  async function handleDislikeClicked(e) {
    // console.log("disliked");
    // console.log(dislikeRef.current.id);
    // const postId = dislikeRef.current.id;
    //if liked already clicked, decrement likes, and increment dislikes
    //if liked not clicked then increment dislikes
    //if already disliked then decrement dislikes
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
        {/* {comments[0] ? (
          <h3 className={styles.postComments}>{`${comments[0].text}`}</h3>
        ) : (
          <></>
        )} */}
      </div>
    </div>
  );
}
