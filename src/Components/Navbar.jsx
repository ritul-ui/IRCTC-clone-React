import React, { useState, useEffect, useCallback } from "react";
import { replace, useNavigate } from "react-router-dom";
import styles from "../Styles/Navbar.module.scss";
import { FaBell, FaQuestionCircle, FaHome } from "react-icons/fa";
import LoginModal from "../pages/LoginModal";
import RegisterModal from "../pages/RegisterModal";
import { useAuth } from "../Context/AuthContext";
import { logout } from "../Config/AuthService";

const Navbar = () => {
  const navigate = useNavigate();
  const {setIsLoggedIn, isLoggedIn, currentUser} = useAuth(); // Accessing login state from AuthContext
  console.log("isLoggedIn", isLoggedIn);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false); // Tracks login state


  const updateCurrentTime = useCallback(() => {
    setCurrentTime(new Date());
  }, []);

  useEffect(() => {
    const interval = setInterval(updateCurrentTime, 1000);
    return () => clearInterval(interval);
  }, [updateCurrentTime]);

  const handleBookingClick = () => {
    if (isLoggedIn) {
      navigate("/booking"); // Redirect to booking page if logged in
    } else {
      setIsLoginOpen(true); // Open login modal if not logged in
    }
  };

  const handleLogout = async () => {  
        await logout(); // Call the logout function from AuthService
        setIsLoggedIn(false); // Update the login state in AuthContext
  }

  const handleTrainSearchClick = () => {
    if (isLoggedIn) {
      navigate("/train-search"); // Redirect to train search page if logged in
    } else {
      setIsLoginOpen(true); // Open login modal if not logged in
    }
  }

  return (
    <>
      <nav className={styles.navbar}>
        {/* Logo & Home Icon */}
        <div className={styles.logoContainer}>
          <FaHome 
            className={styles.homeIcon} 
            onClick={() => navigate("/")} 
            title="Home" 
          />
          <div className={styles.logo}>IRCTC</div>
        </div>

        {/* Navigation Links */}
        <div className={styles.navLinks}>
          <span className={styles.navLink} onClick={handleBookingClick}>BOOKINGS</span>
          <span 
             className={styles.navLink} 
             onClick={handleTrainSearchClick}
           >
             TRAIN SEARCH
           </span>
          <span className={styles.navLink} onClick={() => navigate("/contact")}>CONTACT US</span>
          <span>{currentTime.toLocaleDateString()} [{currentTime.toLocaleTimeString()}]</span>
          <FaBell className={styles.icon} title="Notifications" />
          <FaQuestionCircle className={styles.icon} title="Help & Support" />

          {/* Authentication Buttons */}
          {currentUser ? (
            <div>
              <p>Welcome {currentUser.displayName || "User"}</p>
              <button className={styles.authButton} onClick={handleLogout}>LOGOUT</button>
            </div>
          ) : (
            <>
              <button className={styles.authButton} onClick={() => setIsLoginOpen(true)}>LOGIN</button>
              <button className={styles.registerButton} onClick={() => setIsRegisterOpen(true)}>REGISTER</button>
            </>
          )}
        </div>
      </nav>

      {/* Login & Register Modals */}
      <LoginModal 
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLogin={() => setIsLoggedIn(true)} // Set login state when user logs in
        switchToRegister={() => {
          setIsLoginOpen(false);
          setIsRegisterOpen(true);
        }}
      />

      <RegisterModal 
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onLogin={() => setIsLoggedIn(true)} 
        switchToLogin={() => {
          setIsRegisterOpen(false);
          setIsLoginOpen(true);
        }}
      />
    </>
  );
};

export default Navbar;
