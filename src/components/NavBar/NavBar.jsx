import { useState } from "react";
import LogOut from "../Logout/Logout";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Tabs, TabList, TabPanels, Tab, TabIndicator } from "@chakra-ui/react";
import styles from "./NavBar.module.scss";
export default function NavBar({ user, setUser }) {
  /******************************************** VARIABLES ********************************************/
  const navigate = useNavigate();
  const params = useParams();
  /******************************************** STATES ********************************************/
  const [youClicked, setYouClicked] = useState(false);
  const [homeClicked, setHomeClicked] = useState(false);
  const [messagesClicked, setMessagesClicked] = useState(false);
  /******************************************** USE EFFECTS ********************************************/
  /******************************************** FUNCTIONS ********************************************/
  function handleClick(e) {
    const butt = e.target.innerText;
    console.log(e.target.innerText);
    if (butt === "") {
      setYouClicked(true);
      setHomeClicked(false);
      setMessagesClicked(false);
    } else if (butt === "Home") {
      setYouClicked(false);
      setHomeClicked(true);
      setMessagesClicked(false);
    } else if (butt === "Messages") {
      setYouClicked(false);
      setHomeClicked(false);
      setMessagesClicked(true);
    }
  }

  function handleEtchClick() {
    navigate("/");
  }

  return (
    <Tabs
      variant="enclosed"
      backgroundColor="rgb(16, 18, 19)"
      color="white"
      className={styles.nav}
    >
      <TabList height="4vh" maxHeight="50px" className={styles.tabList}>
        <div className={styles.options}>
          <Tab
            width={"5vw"}
            className={styles.tab}
            _selected={{
              backgroundColor: "rgb(191, 63, 27)",
              border: "solid 0.3px white",
              color: "white",
            }}
          >
            <Link to={"/user"}>
              {youClicked ? (
                <p onClick={handleClick}>
                  {user && user.profileImage ? (
                    <img
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50px",
                      }}
                      src={`/profilePics/${user.profileImage}`}
                    />
                  ) : (
                    <img
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50px",
                      }}
                      src={`/src/assets/userFunc/profileImage.png`}
                    />
                  )}
                </p>
              ) : (
                <p onClick={handleClick}>
                  {user && user.profileImage ? (
                    <img
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50px",
                      }}
                      src={`/profilePics/${user.profileImage}`}
                    />
                  ) : (
                    <img
                      style={{
                        width: "20px",
                        borderRadius: "50px",
                        height: "20px",
                      }}
                      src={`/src/assets/userFunc/profileImage.png`}
                    />
                  )}
                </p>
              )}
            </Link>
          </Tab>
          <Tab
            className={styles.tab}
            _selected={{
              backgroundColor: "rgb(191, 63, 27)",
              border: "solid 0.3px white",
              color: "white",
            }}
          >
            <Link to={"/"}>
              {homeClicked ? (
                <p onClick={handleClick}>Home</p>
              ) : (
                <p onClick={handleClick}>Home</p>
              )}
            </Link>
          </Tab>
          <Tab
            className={styles.tab}
            _selected={{
              backgroundColor: "rgb(191, 63, 27)",
              border: "solid 0.3px white",
              color: "white",
            }}
          >
            {messagesClicked ? (
              <Link to={"/chats"}>
                <p onClick={handleClick}>Messages</p>
              </Link>
            ) : (
              <Link to={"/chats"}>
                <p onClick={handleClick}>Messages</p>
              </Link>
            )}
          </Tab>
        </div>
        <Tab _selected={{}}>
          <h1 className={styles.fractalus}>Fractalus</h1>
        </Tab>
        <Tab className={styles.tabLogout} _selected={{}}>
          <LogOut user={user} setUser={setUser} />
        </Tab>
      </TabList>
    </Tabs>
  );
}
