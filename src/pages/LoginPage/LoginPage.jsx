import styles from "./LoginPage.module.scss";
import { useState, useEffect } from "react";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import * as usersService from "../../../utilities/users-service.cjs";
import { CloseIcon, QuestionIcon } from "@chakra-ui/icons";
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
  const [showDetails, setDetails] = useState(false);
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
  console.log(showDetails);
  return (
    <div className={styles.LoginPage}>
      {showDetails ? (
        <div className={styles.showDetails}>
          <div className={styles.desModal}>
            <h1>GoodForum.</h1>
            <div className={styles.desText}>
              <h2>
                is a dynamic web application designed to provide a comprehensive
                platform for interactive discussions and community engagement.
                Built with modern web technologies.
                <br />
                Fractalus offers users a seamless experience to connect, share
                insights, and explore diverse topics.
                <br />
                <span>Key Features:</span>
                <br />• Real-time Discussions: Engage in real-time discussions
                on various topics of interest. • User Profiles: Customize your
                profile and connect with like-minded individuals. • Rich Media
                Support: Share images and videos to enrich discussions. •
                Responsive Design: Access Fractalus from any device, ensuring a
                consistent experience.
                <br />
                <span>Technologies Used:</span>
                <br />
                <span>•Frontend:</span> React.js, TypeScript, Material-UI, Axios
                <br />
                <span>•Backend:</span> Node.js, Express.js, MongoDB •
                Deployment: AWS (Amazon Web Services), PM2
                <br />
                Explore Fractalus today and join a vibrant community of thinkers
                and doers!
              </h2>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      {showDetails ? (
        <CloseIcon
          color={"rgb(191, 63, 27)"}
          width={"20px"}
          height={"20px"}
          zIndex={"10"}
          position={"absolute"}
          right={"1vw"}
          top={"5vh"}
          onClick={() => {
            setDetails(!showDetails);
          }}
        />
      ) : (
        <QuestionIcon
          color={"black"}
          width={"20px"}
          height={"20px"}
          zIndex={"10"}
          position={"absolute"}
          right={"15.6vw"}
          top={"16vh"}
          onClick={() => {
            setDetails(!showDetails);
          }}
        />
      )}
      <div className={styles.leftSide}>
        <div className={styles.logoDiv}>
          {/* <img
            className={styles.logo}
            src="../../../public/images/logo.png"
          ></img> */}
          <div className={styles.hDiv}>
            <h1> Welcome to GoodForum.</h1>
            <h2>Unveiling Infinite Possibilities</h2>
          </div>
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
            {signupClicked ? "Login" : "Don't Have An Account? Sign Up Here"}
          </h3>
        </div>
      </div>
      <div className={styles.rightSide}>
        {randomNumber === 0 ? (
          <h2 className={styles.greeting}>
            Today is another step forward on your journey towards achieving your
            dreams. You have the power within you to turn aspirations into
            reality through determination and perseverance.
          </h2>
        ) : (
          <></>
        )}

        {randomNumber === 1 ? (
          <h2 className={styles.greeting}>
            Your potential is boundless, waiting to be unleashed. Embrace your
            unique talents and abilities, knowing that you have the capability
            to make a profound impact in your community and beyond.
          </h2>
        ) : (
          <></>
        )}
        {randomNumber === 2 ? (
          <h2 className={styles.greeting}>
            Believe wholeheartedly in yourself and your capabilities. You are
            worthy of success, and each day presents new opportunities for you
            to showcase your skills and talents to the world.
          </h2>
        ) : (
          <></>
        )}
        {randomNumber === 3 ? (
          <h2 className={styles.greeting}>
            You deserve to experience joy, fulfillment, and happiness in
            abundance. Recognize the beauty in your journey and celebrate the
            milestones, big and small, that contribute to your personal growth.
          </h2>
        ) : (
          <></>
        )}
        {randomNumber === 4 ? (
          <h2 className={styles.greeting}>
            You are valued and cherished for who you are. Embrace your
            authenticity and celebrate the qualities that make you unique. Your
            presence enriches the communities you belong to.
          </h2>
        ) : (
          <></>
        )}
        {randomNumber === 5 ? (
          <h2 className={styles.greeting}>
            Trust in the path you are on, knowing that every decision and action
            you take is leading you towards greater fulfillment and purpose.
            Your journey is unique and worthy of embracing with optimism.
          </h2>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
