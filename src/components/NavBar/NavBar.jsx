import { useState } from "react";
import LogOut from "../Logout/Logout";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Tabs, TabList, TabPanels, Tab, TabIndicator } from "@chakra-ui/react";
export default function NavBar({ user, setUser }) {
  /******************************************** VARIABLES ********************************************/
  const navigate = useNavigate();
  const params = useParams();
  console.log("PARAMS IN NAV BAR", params);
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
    <Tabs variant="enclosed">
      <TabList marginLeft="5px" height="5vh">
        <Tab
          _selected={{
            border: "solid 2px rgb(180,217,247)",
            borderBottom: "solid 2px white",
          }}
        >
          <Link to={"/user"}>
            {youClicked ? (
              <p onClick={handleClick}>
                {user && user.profileImage ? (
                  <img
                    style={{ width: "20px", height: "20px" }}
                    src={`/profilePics/${user.profileImage}`}
                  />
                ) : (
                  <img
                    style={{ width: "20px", height: "20px" }}
                    src={`/src/assets/userFunc/profileImage.png`}
                  />
                )}
              </p>
            ) : (
              <p onClick={handleClick}>
                {user && user.profileImage ? (
                  <img
                    style={{ width: "20px", height: "20px" }}
                    src={`/profilePics/${user.profileImage}`}
                  />
                ) : (
                  <img
                    style={{ width: "20px", height: "20px" }}
                    src={`/src/assets/userFunc/profileImage.png`}
                  />
                )}
              </p>
            )}
          </Link>
        </Tab>
        <Tab
          _selected={{
            border: "solid 2px rgb(180,217,247)",
            borderBottom: "solid 2px white",
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
          _selected={{
            border: "solid 2px rgb(180,217,247)",
            borderBottom: "solid 2px white",
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
        <LogOut user={user} setUser={setUser} />
      </TabList>
    </Tabs>
  );
}
