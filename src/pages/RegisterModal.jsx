
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import styles from "../Styles/AuthModal.module.scss";
import { registerWithEmail, loginWithGoogle } from "../Config/AuthService";

const RegisterModal = ({ isOpen, onClose, switchToLogin , onLogin}) => {
  // console.log("register");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;


  const handleRegisteration = async (e) => {
    console.log("register");
    e.preventDefault();
    setError("");
    setLoading(true);
    
    // startTransition(async () => {
    try {
      await registerWithEmail(email, password, fullName);
      setEmail("");
      setPassword("");
      setFullName("");
      onClose();
      switchToLogin();
    } catch (error) {
    console.log("error", error);
    setError(error.message);
    } 
    finally {
      setLoading(false);
    }
  // });
  };


  const handleGoogleRegister = async () => {
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
        <h2>Register</h2>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleRegisteration}>
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
           <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <button type="button" className={styles.googleBtn}
         onClick={handleGoogleRegister}
         disabled={loading}
         >
          <FcGoogle /> Register with Google
        </button>

        <p onClick={switchToLogin}>Already have an account? Login</p>
      </div>
    </div>
  );
};

export default RegisterModal;
