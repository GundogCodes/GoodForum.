import styles from "./ChatsPage.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

import io from "socket.io-client";
import * as chatAPI from "../../../utilities/chat-api.cjs";
import * as messageAPI from "../../../utilities/messages-api.cjs";
const ENDPOINT = "https://goodforum.ca";

const socket = io.connect(ENDPOINT);
export default function ChatsPage({ user, setUser }) {
  /*********************************************** VARIABLES***********************************************/
  const navigate = useNavigate();
  const messageBar = useRef(null);
  const selectedUser = useRef(null);
  const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  socket.emit("setup", user);
  /*********************************************** STATES ***********************************************/
  const [selectedChats, setSelectedChats] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState();
  const [newMessage, setNewMessage] = useState();
  const [userSelected, setUserSelected] = useState("");
  /*********************************************** FUNCTIONS ***********************************************/
  function goToUserPage(e) {
    const id = e.target.id;
    navigate(`/user/${id}`);
  }
  function handleChange(e) {
    e.preventDefault();
    setNewMessage({ content: e.target.value });
  }
  /*********************************************** USE EFFECTS ***********************************************/

  if (user) {
    socket.on("message received", async (newMessageReceived) => {
      console.log("MESSAGE RECEIVED IS::: ", newMessageReceived);
      //alert(newMessageReceived);
      if (newMessageReceived.chat._id !== selectedChatId) {
        return;
      } else {
        setSelectedChats([newMessageReceived, ...selectedChats]);
      }
    });
  }
  /*********************************************** API CALLS ***********************************************/
  async function getUserChats(e) {
    e.preventDefault();
    /*********************** Frontend ************************/
    let clickedImageID = e.target.id;
    setUserSelected(clickedImageID);
    if (clickedImageID !== userSelected) {
      const prev = document.getElementById(userSelected);
      if (prev) {
        if (isDarkMode) {
          prev.style.backgroundColor = "black";
        } else {
          prev.style.backgroundColor = "white";
        }
      }
      const current = document.getElementById(clickedImageID);
      if (isDarkMode) {
        current.style.backgroundColor = "#ff6410";
      } else {
        current.style.backgroundColor = "rgb(180,217,247)";
      }
    }
    /*********************** Check for Chat ************************/

    const friendId = e.target.id;
    const potChatName1 = user._id + friendId;
    const potChatName2 = friendId + user._id;

    let chatId = "";
    for (let chat of user.chats) {
      if (chat.chatName === potChatName1 || chat.chatName === potChatName2) {
        chatId = chat._id;
      }
    }
    console.log("selectedChat is ID of:", chatId);
    socket.emit("join chat", chatId);

    /*********************** Backend ************************/
    try {
      const messages = await messageAPI.getMessages(chatId);

      const reversedMessages = messages.reverse();
      setSelectedChats(reversedMessages);
    } catch (error) {
      console.log(error);
    }

    setSelectedChatId(chatId);
  }

  async function sendAMessage(e) {
    e.preventDefault();

    try {
      const sentMessage = await messageAPI.sendMessage(
        selectedChatId,
        newMessage
      );
      const foundChat = await chatAPI.getChat(selectedChatId);

      socket.emit("new message", sentMessage);
      setSelectedChats([sentMessage, ...selectedChats]);
    } catch (error) {
      console.log(error);
    }
    const text = document.getElementById("inputText");
    messageBar.current.value = "";
    setNewMessage("");
  }

  return (
    <div className={styles.ChatsPage}>
      {user ? (
        <>
          <div className={styles.ChatsAside}>
            {user.friends && user.friends.length > 0 ? (
              <>
                <h2>Your Chats</h2>
                {user.friends.map((friend) => {
                  return (
                    <div key={friend._id}>
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
                            src={`/profileImage.png`}
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
                    </div>
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
                    <div key={chat._id}>
                      {chat.sender._id === user._id ? (
                        <div id={styles.userMessage} className={styles.message}>
                          <div>
                            {chat.sender ? (
                              <div className={styles.messageBubble}>
                                <span>{chat.sender.username}:</span>{" "}
                                {chat.content}
                                {/* <span>{chat.createdAt.slice(0, 10)}</span> */}
                              </div>
                            ) : (
                              <>{chat.content}</>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div
                          id={styles.friendMessage}
                          className={styles.message}
                        >
                          <div>
                            {chat.sender ? (
                              <p className={styles.messageBubble}>
                                <span>{chat.sender.username}:</span>{" "}
                                {chat.content}
                                {/* <span>{chat.createdAt.slice(0, 10)}</span> */}
                              </p>
                            ) : (
                              <>{chat.content}</>
                            )}
                          </div>
                        </div>
                      )}
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
        <Link to={"/login"}>
          <h1 className={styles.signUpPrompt}>
            Sign Up or Login to Chat with Users!{" "}
          </h1>
        </Link>
      )}
    </div>
  );
}
