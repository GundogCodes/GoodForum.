import styles from "./UserSettings.module.scss";
import * as UserAPI from "../../../utilities/users-api.cjs";
import { useRef, useState, useEffect } from "react";

export default function UserSettings({ user, setUser }) {
  /************************************** VARIABLES **************************************/
  const bioField = useRef(null);
  const usernameField = useRef(null);

  /************************************** STATES **************************************/
  const [userEmail, setUserEmail] = useState("");
  const [userPass, setUserPass] = useState("");
  const [userBio, setUserBio] = useState("");

  const [showEmail, setShowEmail] = useState(true);
  const [showUsername, setShowUsername] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showBio, setShowBio] = useState(false);

  /************************************** EFFECTS **************************************/
  useEffect(() => {
    if (user) {
      setUserEmail(user.email || "");
      setUserPass(user.password || "");
      setUserBio(user.bio || "");
    }
  }, [user]);

  /************************************** FUNCTIONS **************************************/
  function handleEmailChange(e) {
    setUserEmail(e.target.value);
  }

  function handlePassChange(e) {
    setUserPass(e.target.value);
  }

  function handleBioChange(e) {
    setUserBio(e.target.value);
  }

  function handleLabelClick(e) {
    const label = e.target.id;
    setShowEmail(label === "Email");
    setShowPass(label === "Password");
    setShowBio(label === "Bio");
    setShowUsername(label === "Username");
  }

  async function updateEmail(e) {
    e.preventDefault();
    if (user && userEmail) {
      const inputField1 = document.getElementById("emailInput1");
      const inputField2 = document.getElementById("emailInput2");
      const input1Value = inputField1.value;
      const input2Value = inputField2.value;
      if (input1Value !== input2Value) {
        alert("Emails Do Not Match!");
        return;
      }
      try {
        const updatedUser = await UserAPI.updateUserInfo(user._id, {
          email: userEmail,
        });
        setUser(updatedUser);
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function updatePass(e) {
    e.preventDefault();
    if (user && userPass) {
      const inputField1 = document.getElementById("passwordInput1");
      const inputField2 = document.getElementById("passwordInput2");
      const input1Value = inputField1.value;
      const input2Value = inputField2.value;
      if (input1Value !== input2Value) {
        alert("Passwords Do Not Match!");
        return;
      }
      try {
        const updatedUser = await UserAPI.updateUserInfo(user._id, {
          password: userPass,
        });
        setUser(updatedUser);
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function updateBio(e) {
    e.preventDefault();
    if (user && userBio) {
      const newBio = bioField.current.value;
      try {
        const updatedUser = await UserAPI.updateUserInfo(user._id, {
          bio: newBio,
        });
        setUser(updatedUser);
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function updateUsername(e) {
    e.preventDefault();
    if (user && usernameField.current) {
      const newUsername = usernameField.current.value;
      try {
        const updatedUser = await UserAPI.updateUserInfo(user._id, {
          username: newUsername,
        });
        setUser(updatedUser);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className={styles.UserSettings}>
      {user ? (
        <div className={styles.box}>
          <section>
            <label onClick={handleLabelClick} id="Username">
              Username
            </label>
            <label onClick={handleLabelClick} id="Email">
              Email
            </label>
            <label onClick={handleLabelClick} id="Password">
              Password
            </label>
            <label onClick={handleLabelClick} id="Bio">
              Bio
            </label>
          </section>
          <div>
            {/********************************** USERNAME **********************************/}
            {showUsername && (
              <aside>
                <form onSubmit={updateUsername}>
                  <label>New Username</label>
                  <input
                    id="usernameInput"
                    placeholder={user.username}
                    ref={usernameField}
                  />
                  <button type="submit">Submit</button>
                </form>
              </aside>
            )}
            {/********************************** EMAIL **********************************/}
            {showEmail && (
              <aside>
                <form onSubmit={updateEmail}>
                  <label>Email</label>
                  <input id="emailInput1" placeholder={user.email} />
                  <label>Confirm Email</label>
                  <input
                    id="emailInput2"
                    onChange={handleEmailChange}
                    name="email"
                  />
                  <button type="submit">Submit</button>
                </form>
              </aside>
            )}
            {/********************************** PASSWORD **********************************/}
            {showPass && (
              <aside>
                <form onSubmit={updatePass}>
                  <label>Password</label>
                  <input id="passwordInput1" type="password" />
                  <label>Confirm Password</label>
                  <input
                    id="passwordInput2"
                    onChange={handlePassChange}
                    name="password"
                    type="password"
                  />
                  <button type="submit">Submit</button>
                </form>
              </aside>
            )}
            {/********************************** BIO **********************************/}
            {showBio && (
              <aside>
                <form onSubmit={updateBio}>
                  <label>Bio</label>
                  <input
                    id={styles.bio}
                    name="bio"
                    className={styles.bioInput}
                    placeholder={user.bio}
                    onChange={handleBioChange}
                    ref={bioField}
                  />
                  <button type="submit">Submit</button>
                </form>
              </aside>
            )}
          </div>
        </div>
      ) : (
        <>Login</>
      )}
    </div>
  );
}
