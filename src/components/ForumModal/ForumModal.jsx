import styles from "./ForumModal.module.scss";
import * as forumService from "../../../utilities/forum-api.cjs";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
export default function FormModal({
  user,
  setUser,
  title,
  showModal,
  setShowModal,
  headings,
}) {
  const navigate = useNavigate();
  function handleGoToQuarry() {
    console.log("newForum is ", newForum);
    navigate(`forum/${newForum.title}`);
  }
  const [newForum, setNewForum] = useState();
  const [existingForum, setExistingForum] = useState();
  const [isForum, setIsForum] = useState(false);
  const [newForumInfo, setNewForumInfo] = useState({
    title: "",
    topic: "",
    description: "",
  });

  function handleChange(e) {
    console.log(newForumInfo);
    setNewForumInfo({
      ...newForumInfo,
      [e.target.name]: e.target.value,
    });
  }

  async function handleCreateForum(e) {
    e.preventDefault();
    try {
      const newForumI = await forumService.createForum(newForumInfo);
      console.log("API RETURNS: ", newForumI);
      if (newForumI.message) {
        console.log(newForumI.message);
        setIsForum(true);
        console.log("FORUMCHECK", newForumI.Forum);
        setExistingForum(newForumI.Forum);
      } else if (newForumI.newForum) {
        console.log(isForum);
        setNewForum(newForumI.newForum);
        setUser(newForumI.updatedUser);
        setIsForum(false);
        setShowModal(false);
        navigate(`/forum/${newForumI.newForum._id}`);
      }
      //window.location.reload();
    } catch (error) {
      console.log("error: ", error);
    }
  }
  function handleOffModalClick() {
    setShowModal(false);
  }

  return (
    <div className={styles.FormModal}>
      <section>
        <p onClick={handleOffModalClick}>x</p>
        <h1>{title}</h1>
        <div className={styles.inputField}>
          <h3>{headings[0]}</h3>
          <input
            maxLength={15}
            name="title"
            type="text"
            onChange={handleChange}
          />
          {headings[2] ? (
            <>
              <h3>{headings[1]}</h3>
              <input
                maxLength={15}
                name="topic"
                type="text"
                onChange={handleChange}
              />
            </>
          ) : (
            <></>
          )}

          <h3>{headings[2]}</h3>
          <input
            name="description"
            id={styles.description}
            type="text"
            onChange={handleChange}
            maxLength={50}
          />

          <button
            className={styles.button}
            type="submit"
            onClick={handleCreateForum}
          >
            Create
          </button>
        </div>
        {isForum ? (
          <h2>
            <Link
              className={styles.gotToForum}
              to={`forum/${existingForum._id}`}
            >
              Forum Already Exists! Go to Forum:{" "}
              <span>{existingForum.title}</span>
            </Link>
          </h2>
        ) : (
          <></>
        )}
      </section>
    </div>
  );
}
