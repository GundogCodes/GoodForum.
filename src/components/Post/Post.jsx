import { useEffect, useState } from "react";
import styles from "./Post.module.scss";
import { Link } from "react-router-dom";
import { ChatIcon, ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
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

  /********************************************** HANDLE STATES  **********************************************/

  /**********************************************  USEEFFCTS  **********************************************/

  /********************************************** FUNCTIONS  **********************************************/
  function handlePostClick(e) {
    const id = e.target.id;
    //  navigate(`/post/${id}`);
  }
  return (
    <div className={styles.Post}>
      <div className={styles.upper}>
        <h4>{forum ? <h2>{forum}</h2> : <></>}</h4>
        <h3>{sender ? <h2>{sender}</h2> : <></>}</h3>
        <h2>{title}</h2>
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
