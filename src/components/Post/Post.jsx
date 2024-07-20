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
  const [likedClicked, setLikedClicked] = useState(false);
  const [dislikeClicked, setDislikeClicked] = useState(false);
  /********************************************** HANDLE STATES  **********************************************/
  /**********************************************  USEEFFCTS  **********************************************/
  useEffect(() => {
    (async () => {
      try {
        const post = await postAPIs.getPost(id);
        setForumTitle(post.forum.title);
        setForumId(post.forum._id);
        setPostSender(post.sender.username);
        setPostCreatedAt(post.createdAt);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  /********************************************** FUNCTIONS  **********************************************/
  function handlePostClick(e) {
    const id = e.target.ref;
    // navigate(`/post/${id}`);
  }
  function handleLikeClicked(e) {
    console.log("liked");
    console.log(likeRef.current.id);
    const postId = likeRef.current.id;
    // if disliked already clicked, decrement dislikes and increment liked
    if (dislikeClicked) {
      //---backend---//
      //---frontend---//
      //if already liked and clicked again decrement likes
    } else if (likedClicked) {
      //---backend---//
      //---frontend---//
      //also else if disliked and liked not clicked then increment likes
    } else if (!dislikeClicked && !likedClicked) {
      //---backend---//
      //---frontend---//
    }
  }
  function handleDislikeClicked(e) {
    console.log("disliked");
    console.log(dislikeRef.current.id);
    const postId = dislikeRef.current.id;
    //if liked already clicked, decrement likes, and increment dislikes
    //if liked not clicked then increment dislikes
    //if already disliked then decrement dislikes
  }
  return (
    <div className={styles.Post}>
      <div className={styles.upper}>
        <div className={styles.upperLeft}>
          <Link to={`/forum/${postForumId}`}>
            {postForumTitle && (
              <h3 className={styles.postForumTitle}>{postForumTitle}</h3>
            )}
          </Link>
          {postSender && (
            <h4 className={styles.postSenderName}>{postSender}</h4>
          )}
          <h2 className={styles.postTitle}>{title}</h2>
        </div>
        <div className={styles.upperRight}>
          {createdAt && (
            <h4 className={styles.date}>{createdAt.slice(0, 10)}</h4>
          )}
        </div>
      </div>
      <div className={styles.body}>
        <Link to={`/post/${id}`}>
          {text && <p className={styles.postText}>{text}</p>}
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
          <h4
            onClick={handleLikeClicked}
            ref={likeRef}
            id={`${id}`}
            className={styles.likes}
          >
            <ChevronUpIcon /> {likes}
          </h4>
          <h4
            onClick={handleDislikeClicked}
            ref={dislikeRef}
            id={`${id}`}
            className={styles.dislikes}
          >
            <ChevronDownIcon /> {dislikes}
          </h4>
          <h4>
            <ChatIcon /> {` ${comments.length}`}
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
