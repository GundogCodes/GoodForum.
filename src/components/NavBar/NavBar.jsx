import { useState } from "react";
import LogOut from "../Logout/Logout";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Tabs, TabList, TabPanels, Tab, TabIndicator } from "@chakra-ui/react";
import styles from "./NavBar.module.scss";

export default function NavBar({ user, setUser }) {
  /******************************************** VARIABLES ********************************************/
  /******************************************** STATES ********************************************/
  const [youClicked, setYouClicked] = useState(false);
  /******************************************** USE EFFECTS ********************************************/
  /******************************************** FUNCTIONS ********************************************/

  return (
    <Tabs
      variant="enclosed"
      backgroundColor="rgb(16, 18, 19)"
      color="white"
      className={styles.nav}
    >
      <TabList height="4vh" maxHeight="50px" className={styles.tabList}>
        <div className={styles.options}>
          <Link to={"/user"}>
            <Tab
              width={"5vw"}
              className={styles.tab}
              _selected={{
                backgroundColor: "rgb(191, 63, 27)",
                border: "solid 0.3px white",
                color: "white",
              }}
            >
              {youClicked ? (
                <p>
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
                <p>
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
            </Tab>
          </Link>
          <Link to={"/"}>
            <Tab
              className={styles.tab}
              _selected={{
                backgroundColor: "rgb(191, 63, 27)",
                border: "solid 0.3px white",
                color: "white",
              }}
            >
              <p>Home</p>
            </Tab>
          </Link>
          <Link to={"/chats"}>
            <Tab
              className={styles.tab}
              _selected={{
                backgroundColor: "rgb(191, 63, 27)",
                border: "solid 0.3px white",
                color: "white",
              }}
            >
              <p>Messages</p>
            </Tab>
          </Link>
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
