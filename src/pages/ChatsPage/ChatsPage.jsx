import styles from "./ChatsPage.module.scss";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

import io from "socket.io-client";
import * as chatAPI from "../../../utilities/chat-api.cjs";
import * as messageAPI from "../../../utilities/messages-api.cjs";
const ENDPOINT = "http://localhost:8004";
var selectedChatCompare;
const socket = io.connect(ENDPOINT);
export default function ChatsPage({ user, setUser }) {
  /*********************************************** VARIABLES***********************************************/
  const navigate = useNavigate();
  const messageBar = useRef(null);
  const selectedUser = useRef(null);
  /*********************************************** STATES ***********************************************/
  const [socketConnected, setSocketConnected] = useState(false);
  const [selectedChats, setSelectedChats] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState();
  const [newMessage, setNewMessage] = useState();
  const [userSelected, setUserSelected] = useState(false);
  /*********************************************** FUNCTIONS ***********************************************/
  function goToUserPage(e) {
    const id = e.target.id;
    navigate(`/user/${id}`);
  }
  function handleChange(e) {
    e.preventDefault();
    setNewMessage({ content: e.target.value });
    //console.log(newMessage);
  }
  /*********************************************** USE EFFECTS ***********************************************/

  if (user) {
    socket.on("message received", async (newMessageReceived) => {
      console.log("MESSAGE RECEIVED IS::: ", newMessageReceived);

      console.log("which chat is the receiver in", selectedChatId);

      if (newMessageReceived.chat._id !== selectedChatId) {
        return;
      } else {
        console.log("the chats are", selectedChats); // this is emprty whyy??
        setSelectedChats([newMessageReceived, ...selectedChats]);
      }
    });
  }
  /*********************************************** API CALLS ***********************************************/
  async function getUserChats(e) {
    e.preventDefault();
    if (!userSelected) {
      selectedUser.current.style.border = "solid 3px rgb(180,217,247)";
      setUserSelected(true);
    } else if (userSelected) {
      selectedUser.current.style.border = "none";
      setUserSelected(false);
    }
    const friendId = e.target.id;
    const potChatName1 = user._id + friendId;
    const potChatName2 = friendId + user._id;
    //console.log(user._id);
    let chatId = "";
    for (let chat of user.chats) {
      if (chat.chatName === potChatName1 || chat.chatName === potChatName2) {
        //  console.log(chat._id);
        chatId = chat._id;
      }
    }
    try {
      const messages = await messageAPI.getMessages(chatId);
      // console.log("MESSAGES", messages);
      const reversedMessages = messages.reverse();
      setSelectedChats(reversedMessages);
    } catch (error) {
      console.log(error);
    }
    //console.log("CHAT ID", chatId);
    setSelectedChatId(chatId);
    socket.emit("join chat", chatId);
  }

  async function sendAMessage(e) {
    e.preventDefault();
    // console.log("new typed Message", newMessage);
    // console.log("chatID in sendAMessage", selectedChatId);
    try {
      const sentMessage = await messageAPI.sendMessage(
        selectedChatId,
        newMessage
      );
      const foundChat = await chatAPI.getChat(selectedChatId);
      // console.log("sent message is: ", sentMessage);
      // console.log("foundChat ", foundChat);
      socket.emit("new message", sentMessage);
      setSelectedChats([sentMessage, ...selectedChats]);
    } catch (error) {
      console.log(error);
    }
    const text = document.getElementById("inputText");
    messageBar.current.value = "";
    setNewMessage("");
  }

  //console.log("SELECTEDCHATS", selectedChats);
  return (
    <div className={styles.ChatsPage}>
      {user ? (
        <>
          <div className={styles.ChatsAside}>
            {user.friends && user.friends.length > 0 ? (
              <>
                {user.friends.map((friend) => {
                  return (
                    <h1>
                      {friend.profileImage ? (
                        <img
                          ref={selectedUser}
                          onClick={getUserChats}
                          id={`${friend._id}`}
                          src={`/profilePics/${friend.profileImage}`}
                        />
                      ) : (
                        <img
                          ref={selectedUser}
                          onClick={getUserChats}
                          id={`${friend._id}`}
                          src={`/src/assets/userFunc/profileImage.png`}
                        />
                      )}
                      <p
                        onClick={goToUserPage}
                        className={styles.friendName}
                        id={`${friend._id}`}
                      >
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
                          <div className={styles.messageBubble}>
                            {chat.sender.username}: {chat.content}
                          </div>
                        ) : (
                          <>{chat.content}</>
                        )}
                      </p>
                    </div>
                  );
                })
              ) : (
                <aside>
                  Your
                  <br />
                  Messages
                </aside>
              )}
            </div>
            <form onSubmit={sendAMessage} onChange={handleChange}>
              <input ref={messageBar} type="text" />
              <button type="submit">Send</button>
            </form>
          </div>
        </>
      ) : (
        <h1>Not LoggedIn </h1>
      )}
    </div>
  );
}
