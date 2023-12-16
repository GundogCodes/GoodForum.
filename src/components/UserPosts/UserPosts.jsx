import styles from "./UserPosts.module.scss";
import Post from "../Post/Post";
import { useState, useEffect } from "react";
import * as usersAPI from "../../../utilities/users-api.cjs";
import { useNavigate } from "react-router-dom";
import { PhoneIcon, ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";

export default function UserPosts({ user, setUser }) {
  const navigate = useNavigate();
  const [allUserPost, setAllUserPosts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const userPosts = await usersAPI.getUsersPosts();
        if (userPosts === "no posts") {
          setAllUserPosts();
        } else {
          const reversedPosts = userPosts.reverse();
          setAllUserPosts(reversedPosts);
          console.log(userPosts);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  function handlePostClick(e) {
    const id = e.target.id;
    console.log("ID: ", id);
    navigate(`/post/${id}`);
  }

  return (
    <ul className={styles.UserPosts}>
      {allUserPost ? (
        <>
          {allUserPost.map((post) => (
            <li id={`${post._id}`} onClick={handlePostClick}>
              <section id={`${post._id}`} onClick={handlePostClick}>
                <h4 id={`${post._id}`} onClick={handlePostClick}></h4>
                <h2 id={`${post._id}`} onClick={handlePostClick}>
                  {post.title}{" "}
                </h2>
              </section>
              {post.image ? (
                <h3 id={`${post._id}`} onClick={handlePostClick}>
                  <img
                    id={`${post._id}`}
                    onClick={handlePostClick}
                    className={styles.postImage}
                    src={`profilePics/${post.image}`}
                  />
                </h3>
              ) : (
                <h3 id={`${post._id}`} onClick={handlePostClick}>
                  {post.text}{" "}
                </h3>
              )}
              <aside>
                <div className={styles.pDiv}>
                  <p className={styles.like}>
                    {" "}
                    <ArrowUpIcon /> {post.likes}
                  </p>
                  <p className={styles.dislike}>
                    <ArrowDownIcon /> {post.dislikes}{" "}
                  </p>
                  <p className={styles.comment}>
                    Comments {post.comments.length}
                  </p>
                  <p className={styles.date}>{post.createdAt.slice(0, 10)}</p>
                </div>
                {post.comments.length > 0 ? (
                  <footer id={`${post._id}`} onClick={handlePostClick}>
                    {post.comments[0].text}
                  </footer>
                ) : (
                  <></>
                )}
              </aside>
            </li>
          ))}
        </>
      ) : (
        <h1 className={styles.noPosts}>No Posts Yet</h1>
      )}
    </ul>
  );
}
