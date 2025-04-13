
import React, { useState } from "react";
import styles from "../Styles/AuthModal.module.scss";
import { FcGoogle } from "react-icons/fc";
import { loginWithEmail, loginWithGoogle } from "../Config/AuthService";

const LoginModal = ({ isOpen, onClose, switchToRegister, onLogin }) => {
    console.log("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const user = await loginWithEmail(email, password);
      setEmail("");
      setPassword("");
      if (onLogin) onLogin();
      onClose();
    } catch (error) {
      console.log("error", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);
    
    try {
      await loginWithGoogle();
      if (onLogin) onLogin();
      onClose();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${styles.overlay} ${isOpen ? styles.show : ""}`} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>X</button>
        <h2>Login</h2>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleEmailLogin}>
          <input 
            type="email" 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
         <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <button type="button" className={styles.googleBtn}
         onClick={handleGoogleLogin}
         disabled={loading}
         >
          <FcGoogle /> Login with Google
        </button>

        <p onClick={switchToRegister}>Don't have an account? Register</p>
      </div>
    </div>
  );
};

export default LoginModal;
