import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    signInWithPopup,
    onAuthStateChanged,
    updateProfile ,
    GoogleAuthProvider
  } from "firebase/auth";
  import { auth } from "../Config/FirebaseConfig";
  
  // Register with email/password
  export const registerWithEmail = async (email, password, fullName) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("user", userCredential);
      // Update profile with the user's name
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
  
  // Login with Google
  export const loginWithGoogle = async () => {
    try {
        const googleProvider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, googleProvider);
      console.log("loginWithGoogle", result);
      return result.user;
    } catch (error) {
      throw error;
    }
  };
  
  // Logout
  export const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      throw error;
    }
  };
  
  // Auth state observer
  export const observeAuthState = (callback) => {
    return onAuthStateChanged(auth, callback); 
  };