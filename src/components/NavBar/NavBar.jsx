import { useEffect, useState } from "react";
import LogOut from "../Logout/Logout";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Tabs, TabList, TabPanels, Tab, TabIndicator } from "@chakra-ui/react";
import styles from "./NavBar.module.scss";

export default function NavBar({ user, setUser }) {
  /******************************************** VARIABLES ********************************************/
  /******************************************** FUNCTIONS ********************************************/
  function formatDate(date) {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
  }
  /******************************************** STATES ********************************************/
  const [youClicked, setYouClicked] = useState(false);
  const [date, setDate] = useState();
  /******************************************** USE EFFECTS ********************************************/
  useEffect(() => {
    (async () => {
      const today = new Date();
      const formattedDate = formatDate(today);
      setDate(formattedDate);
    })();
  }, []);

  return (
    <Tabs
      variant="enclosed"
      backgroundColor="rgb(16, 18, 19)"
      color="white"
      className={styles.nav}
    >
      <TabList height="15vh" maxHeight="600px" className={styles.tabList}>
        <div className={styles.emptyArea}>
          {date ? <h2 className={styles.date}>{date}</h2> : <></>}
        </div>
        <Tab _selected={{}}>
          <Link to={"/"}>
            <h1 className={styles.goodForum}>GoodForum.</h1>
          </Link>
        </Tab>
        <Tab _selected={{}}>
          <div className={styles.forumDes}>
            <h2>Where the conversations are</h2>
            <h2>Good for you</h2>
          </div>
        </Tab>
        <div className={styles.options}>
          <Link to={"/user"}>
            <Tab
              width={"5vw"}
              className={styles.tab}
              _selected={{
                backgroundColor: "rgb(191, 63, 27)",
                border: "solid 0.3px white",
              }}
            >
              {youClicked ? (
                <p>
                  {user && user.profileImage ? (
                    <img
                      id={styles.userImage}
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50px",
                        boxShadow:
                          "rgba(0, 0, 0, 0.4) 0px 2px 4px,rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
                      }}
                      src={`/profilePics/${user.profileImage}`}
                    />
                  ) : (
                    <img
                      id={styles.userImage}
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
          <Tab className={styles.tab} _selected={{}}>
            <LogOut user={user} setUser={setUser} />
          </Tab>
        </div>
      </TabList>
    </Tabs>
  );
}
