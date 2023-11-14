import styles from "./ChatsPage.module.scss";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import io from "socket.io-client";
import * as chatAPI from "../../../utilities/chat-api.cjs";
import * as messageAPI from "../../../utilities/messages-api.cjs";
const ENDPOINT = "http://localhost:8004";
var socket, selectedChatCompare;

export default function ChatsPage({ user, setUser }) {
  /*********************************************** VARIABLES***********************************************/
  const navigate = useNavigate();
  /*********************************************** STATES ***********************************************/
  const [socketConnected, setSocketConnected] = useState(false);

  /*********************************************** FUNCTIONS ***********************************************/
  function goToUserPage(e) {
    const id = e.target.id;
    navigate(`/user/${id}`);
  }
  /*********************************************** USE EFFECTS ***********************************************/
  useEffect(() => {
    if (user) {
      socket = io(ENDPOINT);
      socket.emit("setup", user);
      socket.on("connection", () => setSocketConnected(true));
    }
  }, []);
  //socket.emit('join chat', '')
  /*********************************************** API CALLS ***********************************************/
  async function getUserChats(e) {
    const friendId = e.target.id;
    try {
      const chats = await messageAPI.getMessages(friendId); // how am i gonna find a chat with the userID duhh
      console.log("CHATS", chats);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={styles.ChatsPage}>
      {user ? (
        <>
          <div className={styles.ChatsAside}>
            {user.friends.length > 0 ? (
              <>
                {user.friends.map((friend) => {
                  return (
                    <h1>
                      {friend.profileImage ? (
                        <img
                          onClick={getUserChats}
                          id={`${friend._id}`}
                          src={`/profilePics/${friend.profileImage}`}
                        />
                      ) : (
                        <img
                          onClick={getUserChats}
                          id={`${friend._id}`}
                          src={`/src/assets/userFunc/profileImage.png`}
                        />
                      )}
                      <p onClick={goToUserPage} id={`${friend._id}`}>
                        {friend.username}
                      </p>
                    </h1>
                  );
                })}
              </>
            ) : (
              <></>
            )}
          </div>
          <div className={styles.ChatsFlow}>
            <div className={styles.messages}>Messages here</div>
            <section>
              <input type="text" />
              <button type="submit">Send</button>
            </section>
          </div>

          <Footer />
        </>
      ) : (
        <h1>Not LoggedIn </h1>
      )}
    </div>
  );
}
