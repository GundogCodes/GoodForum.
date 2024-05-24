import styles from "./UserSettings.module.scss";
import * as UserAPI from "../../../utilities/users-api.cjs";
import { useRef, useState } from "react";
export default function UserSettings({ user, setUser }) {
  /************************************** VARIABLES **************************************/
  const bioField = useRef(null);
  const usernameField = useRef(null);
  /************************************** STATES **************************************/

  const [userEmail, setUserEmail] = useState({ email: user.email });
  const [userPass, setUserPass] = useState({ email: user.password });
  const [userBio, setUserBio] = useState({ email: user.bio });

  const [showEmail, setShowEmail] = useState(true);
  const [showUsername, setShowUsername] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showBio, setShowBio] = useState(false);

  const [emailUpdated, setEmailUpdated] = useState(false);

  /************************************** FUNCTIONS **************************************/
  function handleEmailChange(e) {
    console.log(userEmail);
    setUserEmail({ [e.target.name]: e.target.value });
  }
  function handlePassChange(e) {
    console.log(userPass);
    setUserPass({ [e.target.name]: e.target.value });
  }
  function handleBioChange(e) {
    console.log(userBio);
    setUserBio({ [e.target.name]: e.target.value });
  }
  function handleLabelClick(e) {
    const label = e.target.id;
    if (label === "Email") {
      setShowEmail(true);
      setShowPass(false);
      setShowBio(false);
      setShowUsername(false);
    } else if (label === "Password") {
      setShowEmail(false);
      setShowPass(true);
      setShowBio(false);
      setShowUsername(false);
    } else if (label === "Bio") {
      setShowEmail(false);
      setShowPass(false);
      setShowBio(true);
      setShowUsername(false);
    } else if (label === "Username") {
      setShowEmail(false);
      setShowPass(false);
      setShowBio(false);
      setShowUsername(true);
    }
  }
  /************************************** API CALLS **************************************/
  async function updateEmail(e) {
    //WORKS
    e.preventDefault();
    const inputField1 = document.getElementById("emailInput1");
    const inputField2 = document.getElementById("emailInput2");
    const input1Value = inputField1.value;
    const input2Value = inputField2.value;
    console.log(input1Value, input2Value);
    if (input1Value !== input2Value) {
      alert("Emails Do Not Match!");
    } else {
      const updatedUser = await UserAPI.updateUserInfo(user._id, userEmail);
      console.log("newEmailWillBE", updatedUser);
      setUser(updatedUser);
      try {
      } catch (error) {
        console.log(error);
      }
    }
  }
  async function updatePass(e) {
    e.preventDefault();

    const inputField1 = document.getElementById("passwordInput1");
    const inputField2 = document.getElementById("passwordInput2");
    const input1Value = inputField1.value;
    const input2Value = inputField2.value;
    console.log(input1Value, input2Value);
    if (input1Value !== input2Value) {
      alert("Passwords Do Not Match!");
    } else {
      const updatedUser = await UserAPI.updateUserInfo(user._id, userPass);
      console.log("newPassWILLBE", updatedUser);
      setUser(updatedUser);
      try {
      } catch (error) {
        console.log(error);
      }
    }
  }
  async function updateBio(e) {
    //WORKS
    e.preventDefault();
    const newBio = bioField.current.value;
    console.log(newBio);
    try {
      const updatedUser = await UserAPI.updateUserInfo(user._id, {
        bio: newBio,
      });
      setUser(updatedUser);
      console.log("UPDATED USER", updatedUser);
    } catch (error) {
      console.log(error);
    }
  }
  async function updateUsername(e) {
    //WORKS
    e.preventDefault();
    const newUsername = usernameField.current.value;
    console.log(newUsername);
    try {
      const updatedUser = await UserAPI.updateUserInfo(user._id, {
        username: newUsername,
      });
      setUser(updatedUser);
      console.log("UPDATED USER", updatedUser);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className={styles.UserSettings}>
      <div className={styles.box}>
        <section>
          {/* <h1>Edit Profile</h1> */}
          <label onClick={handleLabelClick} id="Username">
            Username
          </label>
          <label onClick={handleLabelClick} id="Email">
            Email
          </label>
          {/* <label onClick={handleLabelClick} id="Password">
          Password
        </label> */}
          <label onClick={handleLabelClick} id="Bio">
            Bio
          </label>
        </section>
        <form>
          {/********************************** USERNAME **********************************/}
          {showUsername ? (
            <aside>
              <form>
                <label>New Username</label>
                <input
                  id="usernameInput"
                  placeholder={`${user.username}`}
                  ref={usernameField}
                ></input>
                <button onClick={updateUsername} type="submit">
                  Submit
                </button>
              </form>
            </aside>
          ) : (
            <></>
          )}
          {/********************************** EMAIL **********************************/}
          {showEmail ? (
            <aside>
              <form>
                <label>Email</label>
                <input id="emailInput1" placeholder={`${user.email}`}></input>
                <label>Confirm Email</label>
                <input
                  id="emailInput2"
                  onChange={handleEmailChange}
                  name="email"
                ></input>
                <button onClick={updateEmail} type="submit">
                  Submit
                </button>
              </form>
            </aside>
          ) : (
            <></>
          )}
          {/********************************** PASS **********************************/}
          {showPass ? (
            <aside>
              <form>
                <label>Password</label>
                <input id="passwordInput1"></input>
                <label>Confirm Password</label>
                <input
                  id="passwordInput2"
                  onChange={handlePassChange}
                  name="password"
                ></input>
                <button onClick={updatePass} type="submit">
                  Submit
                </button>
              </form>
            </aside>
          ) : (
            <></>
          )}
          {/********************************** BIO **********************************/}
          {showBio ? (
            <aside>
              <form>
                <label>Bio</label>
                <input
                  id={styles.bio}
                  name="bio"
                  className={styles.bioInput}
                  placeholder={`${user.bio}`}
                  onChange={handleBioChange}
                  ref={bioField}
                />
                <button onClick={updateBio} type="submit">
                  Submit
                </button>
              </form>
            </aside>
          ) : (
            <></>
          )}
        </form>
      </div>
    </div>
  );
}
