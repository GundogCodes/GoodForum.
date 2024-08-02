import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import styles from "./App.module.scss";
import NavBar from "./components/NavBar/NavBar";
import routes from "./router/routes";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import UserPage from "./pages/UserPage/UserPage";
import ChatsPage from "./pages/ChatsPage/ChatsPage";
import ForumPage from "./pages/ForumPage/ForumPage";
import PostPage from "./pages/PostPage/PostPage";
import UserFriends from "./pages/UserFriends/UserFriends";
import UserSettings from "./pages/UserSettings/UserSettings";
import OtherUserPage from "./pages/OtherUserPage/OtherUserPage";
import { getUser } from "../utilities/users-service.cjs";
import LogOut from "./components/Logout/Logout";
function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const userData = await getUser();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchUserData();
  }, []);
  console.log("HEY THIS IS THE UPDATED VERSION AUg.1.24 11:22PM");
  return (
    <div className={styles.app}>
      <NavBar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<HomePage user={user} setUser={setUser} />} />
        <Route
          path="/user"
          element={<UserPage user={user} setUser={setUser} />}
        />
        <Route
          path="/user/:id"
          element={<OtherUserPage user={user} setUser={setUser} />}
        />
        <Route
          path="/settings"
          element={<UserSettings user={user} setUser={setUser} />}
        />
        <Route
          path="/friends"
          element={<UserFriends user={user} setUser={setUser} />}
        />
        <Route
          path="/chats"
          element={<ChatsPage user={user} setUser={setUser} />}
        />
        <Route
          path="/forum/:id"
          element={<ForumPage user={user} setUser={setUser} />}
        />
        <Route
          path="/post/:id"
          element={<PostPage user={user} setUser={setUser} />}
        />
        <Route
          path="/login"
          element={<LoginPage user={user} setUser={setUser} />}
        />
      </Routes>
    </div>
  );
}

export default App;
