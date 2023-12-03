import SignUpForm from "../SignUpForm/SignUpForm";
import styles from "./LoginForm.module.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as usersService from "../../../utilities/users-service.cjs";
export default function LoginForm({ user, setUser }) {
  /************************************ VARIABLES  ************************************/
  const navigate = useNavigate();

  /************************************ STATES  ************************************/
  const [signupClicked, setSignupClicked] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  /************************************ FUNCTIONS  ************************************/
  function handleClick() {
    navigate("/");
  }
  function handleChange(e) {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setError("");
    console.log("CHANGING LOGGIN IN CREDENTIALS");
  }

  function handleSignupClick() {
    setSignupClicked(!signupClicked);
  }
  /************************************ API CALLS  ************************************/
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      console.log(credentials);
      const user = await usersService.login(credentials);
      console.log("USER", user);
      setUser(user);
      handleClick();
    } catch (error) {
      setError("Login Failed");
    }
  }

  return (
    <div className={styles.loginDiv}>
      {signupClicked ? (
        <SignUpForm user={user} setUser={setUser} />
      ) : (
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <h3>LOGIN</h3>
          <p className={styles.text}>Email </p>
          <input
            type="text"
            name="email"
            value={credentials.email}
            className={styles.inputText}
            onChange={handleChange}
            required
          />
          <p className={styles.text}>Password </p>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            className={styles.inputText}
            required
          />

          <button type="submit" className={styles.submit}>
            LOG IN
          </button>
        </form>
      )}
      <p className={styles.errorMessage}>&nbsp;{error}</p>
      <h3 className={styles.signupButton} onClick={handleSignupClick}>
        {signupClicked ? "Login" : "Sign Up Here"}
      </h3>
    </div>
  );
}
