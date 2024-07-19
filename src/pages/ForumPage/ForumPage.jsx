import styles from "./ForumPage.module.scss";
import Footer from "../../components/Footer/Footer";
import Post from "../../components/Post/Post";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as forumService from "../../../utilities/forum-api.cjs";
import * as postService from "../../../utilities/post-api.cjs";
import * as postAPI from "../../../utilities/post-api.cjs";
import PostModal from "../../components/PostModal/PostModal";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";
import { Link } from "react-router-dom";
import {
  PhoneIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";

export default function ForumPage({ user, setUser }) {
  /******************************************** Variables ********************************************/
  const { id } = useParams();
  const navigate = useNavigate();
  /******************************************** States ********************************************/
  const [isMember, setIsMember] = useState();
  const [forumPage, setForumPage] = useState();
  const [showPostModal, setShowPostModal] = useState(false);
  const [sortedForumPosts, setSortedForumPosts] = useState([]);
  const [allForums, setAllForums] = useState([]);
  /******************************************** Handling States ********************************************/

  function handleMakePostButton() {
    setShowPostModal(true);
  }

  function closeModal() {
    setShowPostModal(false);
  }

  /******************************************** useEffects ********************************************/
  useEffect(() => {
    (async () => {
      try {
        const forum = await forumService.getForum(id);
        setForumPage(forum);
        console.log("FORUM POSTS ARE ", forum.posts);
        setSortedForumPosts(forum.posts.reverse());
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);
  useEffect(() => {
    (async () => {
      try {
        const forums = await forumService.getAll();
        const posts = await postAPI.allPosts();
        setAllForums(forums);
        console.log("allforums", forums);
        setAllPosts(posts);
        console.log("POSTS: ", posts);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  useEffect(() => {
    if (!user) {
      return;
    } else {
      setIsMember(false);
      for (let followedForum of user.followedForums) {
        if (followedForum._id === id) {
          setIsMember(true);
        }
      }
    }
  }, [user]);
  /******************************************** API Calls ********************************************/

  async function handleLikeClick(poster) {
    try {
      const updatedPost = await postService.likePost();
    } catch (error) {
      console.log({ error: error });
    }
  }
  async function handleDislikeClick() {}
  function handlePostClick(e) {
    //console.log('postId in handlePostClick',e.currentTarget.getAttribute('postId'))
    const id = e.currentTarget.getAttribute("postId");
    navigate(`/post/${id}`);
  }
  async function handleMemberClick(e) {
    if (isMember) {
      const newInfo = await forumService.removeMember(id);
      console.log("REMOVE USER RETURNED INFO", newInfo);
      const flippedPosts = newInfo.updatedForum.posts.reverse();
      newInfo.updatedForum.posts = flippedPosts;
      console.log("FLIPPED POSTS", flippedPosts);
      console.log("UPDATED FLIPPED FORUM", newInfo.updatedForum);
      setIsMember(false);
      setForumPage(newInfo.updatedForum);
      setUser(newInfo.updatedUser);
    } else if (!isMember) {
      const newInfo = await forumService.addMember(id);
      console.log("ADD USER RETURNED INFO", newInfo);
      const flippedPosts = newInfo.updatedForum.posts.reverse();
      newInfo.updatedForum.posts = flippedPosts;
      console.log("FLIPPED POSTS", flippedPosts);
      console.log("UPDATED FLIPPED FORUM", newInfo.updatedForum);
      setIsMember(true);
      setForumPage(newInfo.updatedForum);
      setUser(newInfo.updatedUser);
    }
  }
  return (
    <div className={styles.ForumPage}>
      {forumPage && forumPage.posts ? (
        <>
          {showPostModal ? (
            <PostModal
              user={user}
              setUser={setUser}
              showModal={showPostModal}
              setShowModal={setShowPostModal}
              page={forumPage}
              setForumPage={setForumPage}
            />
          ) : (
            <></>
          )}
          <div className={styles.allForumsAside}>
            <h1 className={styles.pageTitle}>Forum</h1>
            <h1>Explore</h1>
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
          <div className={styles.forumSide}>
            <header>
              {forumPage ? <h1>{forumPage.title}.</h1> : <>Not Found</>}

              <section>
                <aside>
                  {isMember ? (
                    <button onClick={handleMemberClick}>Following</button>
                  ) : (
                    <button onClick={handleMemberClick}>+</button>
                  )}

                  <button onClick={handleMakePostButton}>Create a Post</button>
                </aside>
              </section>
            </header>
            {forumPage.posts.length > 0 ? (
              <div className={styles.postsList}>
                {forumPage.posts.map((post) => {
                  return (
                    // <div
                    //   className={styles.post}
                    //   onClick={handlePostClick}
                    //   postId={post._id}
                    // >
                    //   <section>
                    //     <h2>{post.title} </h2>
                    //     <h1>{post.sender.username} </h1>
                    //   </section>
                    //   {post.image ? (
                    //     <h3>
                    //       <img
                    //         className={styles---.postImage}
                    //         src={`/profilePics/${post.image}`}
                    //       />
                    //     </h3>
                    //   ) : (
                    //     <h3 className={styles.postText}>{post.text}</h3>
                    //   )}

                    //   <aside>
                    //     <div className={styles.pDiv}>
                    //       <p className={styles.like}>{post.likes} &#8593; </p>
                    //       <p className={styles.dislike}>
                    //         {post.dislikes} &#8595;
                    //       </p>
                    //       <p className={styles.comment}>
                    //         {post.comments.length} Comments
                    //       </p>
                    //       <p className={styles.date}>
                    //         {post.createdAt.slice(0, 10)}
                    //       </p>
                    //     </div>
                    //   </aside>
                    // </div>
                    <Post
                      id={post._id}
                      title={post.title}
                      forum={post.forum.title}
                      sender={post.sender.username}
                      text={post.text}
                      image={post.image}
                      comments={post.comments}
                      likes={post.likes}
                      dislikes={post.dislikes}
                    ></Post>
                  );
                })}
              </div>
            ) : (
              <h1 className={styles.noPosts}>
                No Posts yet, be the first to start a conversation!
              </h1>
            )}
          </div>
          {/* <Footer /> */}
        </>
      ) : (
        <>Forum Not Found</>
      )}
      <div className={styles.forumStatAside}>
        <h1>STATS</h1>
        {forumPage && forumPage.founder ? (
          <d>
            <h3 className={styles.stat} id={styles.des}>
              {forumPage.description}
            </h3>
            <h3 className={styles.stat}>
              Created By: {forumPage.founder.username}
            </h3>
            <h3 className={styles.stat}>Members: {forumPage.numOfMembers}</h3>
            <h3 className={styles.stat}>Posts: {forumPage.posts.length}</h3>
          </d>
        ) : (
          <h3>Created By: User Deleted</h3>
        )}
      </div>
    </div>
  );
}
