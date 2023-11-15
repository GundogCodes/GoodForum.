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
  const [selectedChats, setSelectedChats] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState();
  const [newMessage, setNewMessage] = useState();
  /*********************************************** FUNCTIONS ***********************************************/
  function goToUserPage(e) {
    const id = e.target.id;
    navigate(`/user/${id}`);
  }
  function handleChange(e) {
    e.preventDefault();
    setNewMessage({ content: e.target.value });
    console.log(newMessage);
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
    e.preventDefault();
    const friendId = e.target.id;
    console.log(friendId);
    try {
      const chatId = await chatAPI.findChat(friendId);
      console.log("RETURNED CHAT", chatId);
      //get chatId with chatName then get messages using chatId
      const chats = await messageAPI.getMessages(chatId._id);
      setSelectedChats(chats);
      setSelectedChatId(chatId._id);
      console.log("selectedChatId", chatId);
    } catch (error) {
      console.log(error);
    }
  }

  async function sendAMessage(e) {
    e.preventDefault();
    try {
      const sentMessage = await messageAPI.sendMessage(
        selectedChatId,
        newMessage
      );
      console.log("sent a new message", sentMessage);
      setSelectedChats({ ...selectedChats, sentMessage });
    } catch (error) {
      console.log(error);
    }
  }

  console.log("SELECTEDCHATS", selectedChats);
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
            <div className={styles.messages}>
              {selectedChats && selectedChats.length > 0 ? (
                selectedChats.map((chat) => {
                  return (
                    <div className={styles.message}>
                      <p>
                        {chat.sender ? (
                          <>
                            {chat.sender.username}: {chat.content}
                          </>
                        ) : (
                          <>{chat.content}</>
                        )}
                      </p>
                    </div>
                  );
                })
              ) : (
                <></>
              )}
            </div>
            <form onSubmit={sendAMessage} onChange={handleChange}>
              <input type="text" />
              <button type="submit">Send</button>
            </form>
          </div>

          <Footer />
        </>
      ) : (
        <h1>Not LoggedIn </h1>
      )}
    </div>
  );
}
