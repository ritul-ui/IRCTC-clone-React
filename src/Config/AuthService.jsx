import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    signInWithPopup,
    onAuthStateChanged,
    updateProfile 
  } from "firebase/auth";
  import { auth } from "../Config/FirebaseConfig";
  
  // Register with email/password
  export const registerWithEmail = async (email, password, fullName) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("user", userCredential);
      await updateProfile(userCredential.user, {
        displayName: fullName
      });                                    
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  };
  
  // Login with email/password
  export const loginWithEmail = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  };
  
  