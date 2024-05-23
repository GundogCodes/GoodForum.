import styles from "./LoginPage.module.scss";
import { useState } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import Footer from "../../components/Footer/Footer";

export default function LoginPage({ user, setUser }) {
  const [clicked, setClicked] = useState(null);

  function handleLoginClick() {
    setClicked(!clicked);
  }

  return (
    <div className={styles.LoginPage}>
      <h1>Fractalus</h1>
      <LoginForm user={user} setUser={setUser} />
    </div>
  );
}
