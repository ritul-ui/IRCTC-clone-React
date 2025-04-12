
import React, { useState } from "react";
import styles from "../Styles/AuthModal.module.scss";
import { FcGoogle } from "react-icons/fc";
import { loginWithEmail } from "../Config/AuthService";

const LoginModal = ({ isOpen, onClose, switchToRegister }) => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!isOpen) return null;

  const handleEmailLogin = async () => {
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
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={`${styles.overlay} ${isOpen ? styles.show : ""}`} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>X</button>
        <h2>Login</h2>

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
          <button type="button">Login</button>
        </form>

        <button className={styles.googleBtn}>
          <FcGoogle /> Login with Google
        </button>

        <p onClick={switchToRegister}>Don't have an account? Register</p>
      </div>
    </div>
  );
};

export default LoginModal;
