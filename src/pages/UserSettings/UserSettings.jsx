import styles from "./UserSettings.module.scss";
import * as UserAPI from "../../../utilities/users-api.cjs";
import { useState } from "react";
export default function UserSettings({ user, setUser }) {
  /************************************** VARIABLES **************************************/
  const [userData, setUserData] = useState({
    email: user.email,
    password: user.password,
    bio: user.bio,
  });
  /************************************** STATES **************************************/
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [confirmEmail, setConfirmEmail] = useState(false);
  /************************************** FUNCTIONS **************************************/
  function handleChange(e) {
    console.log(userData);
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }
  /************************************** API CALLS **************************************/
  async function updateUser() {
    try {
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className={styles.UserSettings}>
      <h1>Edit Profile</h1>
      <form onChange={handleChange} onSubmit={updateUser}>
        <label>Email</label>
        <input name="email" placeholder={`${user.email}`}></input>
        <label>Confirm Email</label>
        <input name="email"></input>
        <label>Password</label>
        <input name="password"></input>
        <label>Confirm Password</label>
        <input name="password"></input>
        <label>Bio</label>
        <section>
          <input
            name="bio"
            className={styles.bioInput}
            placeholder={`${user.bio}`}
          />
          <button type="submit">Submit</button>
        </section>
      </form>
    </div>
  );
}
