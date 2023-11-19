import styles from "./HomePosts.module.scss";
import Post from "../Post/Post";
import * as postAPIs from "../../../utilities/post-api.cjs";
import { useNavigate } from "react-router-dom";
export default function HomePosts({ allPosts }) {
  /********************************* VARIABLES *********************************/
  const navigate = useNavigate();

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
  console.log(allPosts);
  return (
    <ul className={styles.HomePosts}>
      {allPosts.map((post) => {
        return (
          <li onClick={handlePostClick} id={`${post._id}`}>
            <section onClick={handlePostClick} id={`${post._id}`}>
              <h4
                className={styles.forumTitle}
                onClick={handlePostClick}
                id={`${post._id}`}
              >
                {post.forum.title}{" "}
              </h4>
              <h2 onClick={handlePostClick} id={`${post._id}`}>
                {post.title}{" "}
              </h2>
              {post.sender ? (
                <h1 onClick={handlePostClick} id={`${post._id}`}>
                  {post.sender.username}{" "}
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
                />{" "}
              </h3>
            ) : (
              <h3 onClick={handlePostClick} id={`${post._id}`}>
                {post.text}{" "}
              </h3>
            )}
            <aside onClick={handlePostClick} id={`${post._id}`}>
              <div
                onClick={handlePostClick}
                id={`${post._id}`}
                className={styles.pDiv}
              >
                <p
                  id={`${post._id}`}
                  onClick={handlePostClick}
                  className={styles.likes}
                >
                  Likes {post.likes}
                </p>
                <p
                  id={`${post._id}`}
                  onClick={handlePostClick}
                  className={styles.dislikes}
                >
                  Dislikes {post.dislikes}
                </p>
                <p
                  id={`${post._id}`}
                  onClick={handlePostClick}
                  className={styles.comment}
                >
                  Comments {post.comments.length}
                </p>
                <p className={styles.date}>{post.createdAt.slice(0, 10)}</p>
              </div>
              {post.comments.length > 0 ? (
                <footer onClick={handlePostClick} id={`${post._id}`}>
                  {post.comments[0].text}
                </footer>
              ) : (
                <></>
              )}
            </aside>
          </li>
        );
      })}
    </ul>
  );
}
