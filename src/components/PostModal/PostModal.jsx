import styles from "./PostModal.module.scss";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as forumService from "../../../utilities/forum-api.cjs";
import * as postService from "../../../utilities/post-api.cjs";

export default function PostModal({
  user,
  setUser,
  showModal,
  setShowModal,
  page,
  setForumPage,
}) {
  /******************************************** Variables ********************************************/
  const { id } = useParams();
  const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  /******************************************** States ********************************************/
  const [file, setFile] = useState(null);
  const [postData, setPostData] = useState({
    title: null,
    text: null,
    image: null,
  });
  const [selectedForum, setSelectedForum] = useState("");
  const [isFile, setIsFile] = useState(false);
  const [showText, setShowText] = useState(true);
  const [showImage, setShowImage] = useState(false);
  const [showLink, setShowLink] = useState(false);
  const [showPic, setShowPic] = useState(false);
  /******************************************** Handling States ********************************************/
  function handlePostOptions(e) {
    const option = e.target.id;
    if (option === "Text") {
      setShowText(true);
      setShowImage(false);
      setShowLink(false);
    } else if (option === "Image") {
      setShowText(false);
      setShowImage(true);
      setShowLink(false);
    } else if (option === "Link") {
      setShowText(false);
      setShowImage(false);
      setShowLink(true);
    }
  }
  function handleXClick() {
    setShowModal(false);
  }
  function handleChange(e) {
    console.log("postData: ", postData);
    setPostData({
      ...postData,
      [e.target.name]: e.target.value,
    });
  }
  /******************************************** FUNCTIONS ********************************************/
  function handleForumSelection(e) {
    let pickedForum = e.target.id;
    console.log("PICKED FORUM", pickedForum);
    setSelectedForum(pickedForum);
    if (selectedForum !== pickedForum) {
      const prev = document.getElementById(selectedForum);
      if (prev) {
        if (isDarkMode) {
          prev.style.backgroundColor = "black";
        } else {
          prev.style.backgroundColor = "white";
          prev.style.color = "black";
        }
      }
      const current = document.getElementById(pickedForum);
      if (isDarkMode) {
        current.style.backgroundColor = "#ff6410";
      } else {
        current.style.backgroundColor = "rgb(191, 63, 27)";
        current.style.color = "white";
      }
    }
  }

  /******************************************** API Calls ********************************************/

  function uploadPic(e) {
    //if there is a image in the post use Multer to handle that if there is only text in the post then do the regular stuff
    e.preventDefault();
    console.log("fileName", file.name);
    console.log("init  postData is ", postData);
    setPostData({ ...postData, image: file.name });
    setIsFile(true);
  }

  async function handlePostToForum(e) {
    e.preventDefault();
    console.log("Data in HandlePost", postData);
    if (postData.text !== null) {
      try {
        const newForum = await forumService.postToForum(id, postData);
        console.log("updated Forum: ", newForum.updatedForum);
        const flippedPosts = newForum.updatedForum.posts.reverse();
        newForum.updatedForum.posts = flippedPosts;
        console.log("FLIPPED POSTS", flippedPosts);
        console.log("UPDATED FLIPPED FORUM", newForum.updatedForum);
        setForumPage(newForum.updatedForum);
        setUser(newForum.updatedUser);
        setShowModal(false);
      } catch (error) {
        console.log({ error: error });
      }
    } else {
      const formData = new FormData();
      formData.append("profilePic", file);
      const result = await axios.post("/api/profilePic", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(result.data);
      try {
        const newForum = await forumService.postToForum(id, postData);
        console.log("updated Forum: ", newForum);
        setForumPage(newForum);
        setShowModal(false);
        setUser(newForum.updatedUser);
      } catch (error) {
        console.log({ error: error });
      }
    }
  }

  async function handleMakeAPost(e) {
    e.preventDefault();
    if (postData.text !== null) {
      try {
        const newForum = await forumService.postToForum(
          selectedForum,
          postData
        );
        console.log("updated Forum: ", newForum);
        setShowModal(false);
      } catch (error) {
        console.log({ error: error });
      }
    } else {
      const formData = new FormData();
      formData.append("profilePic", file);
      const result = await axios.post("/api/profilePic", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(result.data);
      try {
        const newForum = await forumService.postToForum(
          selectedForum,
          postData
        );
        setShowModal(false);
      } catch (error) {
        console.log({ error: error });
      }
    }
  }

  return (
    <div className={styles.PostModal}>
      {user ? (
        <div className={styles.form}>
          {/* If User is on the Forum Page show this PostModal otherwise */}
          <form onChange={handleChange}>
            <p onClick={handleXClick}>x</p>
            {page ? (
              <h1>Post to {page.title}</h1>
            ) : (
              <>
                <h3>Your Forums </h3>
                <div className={styles.forumList}>
                  {user.followedForums.map((forum) => {
                    return (
                      <h4
                        onClick={handleForumSelection}
                        id={`${forum._id}`}
                        name={forum.title}
                        key={`${forum._id}`}
                      >
                        {forum.title}
                      </h4>
                    );
                  })}
                </div>
              </>
            )}
            <h2>Title</h2>
            <input maxLength={15} name="title" type="text" required />
            <h6 className={styles.line}> </h6>
            <header>
              <h5 id="Text" onClick={handlePostOptions}>
                Text
              </h5>
              <h5 id="Image" onClick={handlePostOptions}>
                Image
              </h5>
              <h5 id="Link" onClick={handlePostOptions}>
                Link
              </h5>
            </header>
            {showText ? (
              <>
                <h2>Text</h2>
                <input id={styles.text} name="text" type="text" />
              </>
            ) : (
              <></>
            )}
            {showImage ? (
              <>
                <h2>Image</h2>
                {showImage ? <img src="" /> : <img src="" />}
                <section>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                    }}
                    className={styles.fileInput}
                  />
                  <button className={styles.upload} onClick={uploadPic}>
                    {isFile ? "uploaded!" : "upload?"}
                  </button>
                </section>
              </>
            ) : (
              <></>
            )}
            {showLink ? (
              <div className={styles.linkDiv}>
                <h2>Link</h2>
                <input></input>
              </div>
            ) : (
              <></>
            )}
            {page ? (
              <button onClick={handlePostToForum} type="submit">
                Post
              </button>
            ) : (
              <button onClick={handleMakeAPost} type="submit">
                Post
              </button>
            )}
          </form>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
