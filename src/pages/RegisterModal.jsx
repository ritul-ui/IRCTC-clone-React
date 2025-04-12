
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import styles from "../Styles/AuthModal.module.scss";
import { registerWithEmail } from "../Config/AuthService";

const RegisterModal = ({ isOpen, onClose, switchToLogin }) => {
  // console.log("register");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!isOpen) return null;


  const handleRegisteration = async (e) => {
    console.log("register");
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      await registerWithEmail(email, password, fullName);
      setEmail("");
      setPassword("");
      onClose();
      switchToLogin();
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
        <h2>Register</h2>

        <form onSubmit={handleRegisteration}>
          <input type="text" />
          <input 
            type="text" 
            placeholder="Full Name" 
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required 
          />
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
          <button type="button">Register</button>
        </form>

        <button className={styles.googleBtn}>
          <FcGoogle /> Register with Google
        </button>

        <p onClick={switchToLogin}>Already have an account? Login</p>
      </div>
    </div>
  );
};

export default RegisterModal;
