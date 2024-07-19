import { useEffect, useState } from "react";
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
}) {
  /********************************************** VARIABLES **********************************************/
  //const navigate = useNavigate();
  /********************************************** STATE VARIABLES **********************************************/
  const [postForumTitle, setForumTitle] = useState();
  const [postForumId, setForumId] = useState();
  const [postSender, setPostSender] = useState();
  const [createdAt, setPostCreatedAt] = useState();
  /********************************************** HANDLE STATES  **********************************************/

  /**********************************************  USEEFFCTS  **********************************************/
  useEffect(() => {
    (async () => {
      try {
        const post = await postAPIs.getPost(id);
        console.log("POST: ", post);
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
    const id = e.target.id;
    //  navigate(`/post/${id}`);
  }
  return (
    <div className={styles.Post}>
      <div className={styles.upper}>
        <div className={styles.upperLeft}>
          <Link to={`/forum/${postForumId}`}>
            {" "}
            <h4>{postForumTitle ? <h2>{postForumTitle}</h2> : <></>}</h4>
          </Link>
          <h3>{postSender ? <h2>{postSender}</h2> : <></>}</h3>
          <h2 className={styles.postTitle}>{title}</h2>
        </div>
        <div className={styles.upperRight}>
          {" "}
          {createdAt ? (
            <h4 className={styles.date}>{createdAt.slice(0, 10)}</h4>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className={styles.body}>
        <Link to={`/post/${id}`}>
          {text ? <h1 className={styles.postText}>{text}</h1> : <></>}
          {image ? (
            <img className={styles.postImage} src={`/profilePics/${image}`} />
          ) : (
            <></>
          )}
        </Link>
      </div>
      <div className={styles.bottom}>
        <div className={styles.likes}>
          <h4>
            {" "}
            <ChevronUpIcon /> {likes}
          </h4>
          <h4>
            {" "}
            <ChevronDownIcon /> {dislikes}
          </h4>
          <h4>
            {" "}
            <ChatIcon /> {`  ${comments.length}`}
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
