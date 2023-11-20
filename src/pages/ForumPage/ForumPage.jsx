import styles from "./ForumPage.module.scss";
import Footer from "../../components/Footer/Footer";
import Post from "../../components/Post/Post";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as forumService from "../../../utilities/forum-api.cjs";
import * as postService from "../../../utilities/post-api.cjs";
import PostModal from "../../components/PostModal/PostModal";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";

export default function ForumPage({ user, setUser }) {
  /******************************************** Variables ********************************************/
  const { id } = useParams();
  const navigate = useNavigate();
  /******************************************** States ********************************************/
  const [isMember, setIsMember] = useState();
  const [showPost, setShowPost] = useState(false);
  const [forumPage, setForumPage] = useState();
  const [showPostModal, setShowPostModal] = useState(false);

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
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);

  useEffect(() => {
    if (!user) {
      return;
    } else {
      setIsMember(false);
      for (let followedForum of user.followedForums) {
        console.log(followedForum._id);
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
      setIsMember(false);
      setForumPage(newInfo.updatedForum);
      setUser(newInfo.updatedUser);
    } else if (!isMember) {
      const newInfo = await forumService.addMember(id);
      console.log("ADD USER RETURNED INFO", newInfo);
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
          <header>
            <h1>{forumPage.title}.</h1>
            <h2>{forumPage.description}</h2>
            {forumPage.founder ? (
              <h3>Created By: {forumPage.founder.username}</h3>
            ) : (
              <h3>Created By: User Deleted</h3>
            )}
            <h4>Members: {forumPage.numOfMembers}</h4>
            <section>
              <aside>
                {isMember ? (
                  <button onClick={handleMemberClick}>Following</button>
                ) : (
                  <button onClick={handleMemberClick}>+</button>
                )}

                <button onClick={handleMakePostButton}>Etch Post</button>
              </aside>
            </section>
          </header>
          {forumPage.posts.length > 0 ? (
            <ul>
              {forumPage.posts.map((post) => {
                return (
                  <li onClick={handlePostClick} postId={post._id}>
                    <section>
                      <h2>{post.title} </h2>
                      <h1>{post.sender.username} </h1>
                    </section>
                    {post.image ? (
                      <img
                        className={styles.postImage}
                        src={`/profilePics/${post.image}`}
                      />
                    ) : (
                      <h3>{post.text}</h3>
                    )}

                    <aside>
                      <div className={styles.pDiv}>
                        <p onClick={handleLikeClick} className={styles.like}>
                          Like {post.likes}
                        </p>
                        <p
                          onClick={handleDislikeClick}
                          className={styles.dislike}
                        >
                          Dislike {post.dislikes}
                        </p>
                        <p>Comments {post.comments.length}</p>
                      </div>
                    </aside>
                  </li>
                );
              })}
            </ul>
          ) : (
            <h1 className={styles.noPosts}>
              No Posts yet, be the first to start a conversation!
            </h1>
          )}
          <Footer />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
