import styles from "./LoginPage.module.scss";
import { useState, useEffect } from "react";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import * as usersService from "../../../utilities/users-service.cjs";
export default function LoginPage({ user, setUser }) {
  const [clicked, setClicked] = useState(null);

  /************************************ VARIABLES  ************************************/
  const navigate = useNavigate();

  /************************************ STATES  ************************************/
  const [newUser, setNewUser] = useState();
  const [randomNumber, setRandomNumber] = useState(0);
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const [signupClicked, setSignupClicked] = useState(false);
  // const [credentials, setCredentials] = useState({
  //   email: "",
  //   password: "",
  // });
  useEffect(() => {
    const generateRandomNumber = () => {
      const random = Math.floor(Math.random() * 3); // Generates random number from 0 to 2
      setRandomNumber(random);
    };

    generateRandomNumber();
  }, []);

  /************************************ FUNCTIONS  ************************************/
  function handleLoginClick() {
    setClicked(!clicked);
  }
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
  async function handleSignUpSubmit(e) {
    e.preventDefault();
    try {
      console.log("credentials: ", credentials);
      const createdUser = await usersService.signUp(credentials);
      setUser(createdUser);
      setNewUser(createdUser);
    } catch (error) {
      setError("Log In Failed - Try Again");
    }

    navigate("/");
  }
  return (
    <div className={styles.LoginPage}>
      <div className={styles.leftSide}>
        <div className={styles.logoDiv}>
          <img
            className={styles.logo}
            src="../../../public/images/logo.png"
          ></img>
          <h1>Fractalus</h1>
        </div>
        <div className={styles.loginDiv}>
          {signupClicked ? (
            <div className={styles.signUpFormDiv}>
              <form className={styles.signUpForm} onSubmit={handleSignUpSubmit}>
                <h3>Create Your Account</h3>
                <p className={styles.text}>Username </p>
                <input
                  type="text"
                  name="username"
                  value={credentials.name}
                  className={styles.inputText}
                  onChange={handleChange}
                  required
                />
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
                  SIGN UP
                </button>
              </form>
            </div>
          ) : (
            <form className={styles.loginForm} onSubmit={handleSubmit}>
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
      </div>
      <div className={styles.rightSide}>
        {randomNumber === 0 ? (
          <img src="https://i.pinimg.com/originals/dd/cb/1f/ddcb1fa912f785e19329d4dde984d8ec.gif" />
        ) : (
          <></>
        )}

        {randomNumber === 1 ? (
          <img src="https://i.pinimg.com/originals/da/5f/6c/da5f6cd0bc4a500bfc73dab6f7a5f8ac.gif" />
        ) : (
          <></>
        )}
        {randomNumber === 2 ? (
          <img src="https://i.pinimg.com/originals/27/92/44/2792441dd9436b6d5fc0028ffcaf733e.gif" />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
