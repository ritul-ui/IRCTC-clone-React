import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./pages/Home";
import BookingPage from "./pages/BookingPage";
import ContactPage from "./pages/ContactPage";
import LoginModal from "./pages/LoginModal";
import TrainCarousel from "./Components/TrainCarousel";
import styles from "./Styles/App.module.scss";
import ProtectedRoute from "./Components/ProtectedRoute";
import { AuthProvider } from "./Context/AuthContext";
import Test from "./Components/Test";


// Component to conditionally render content based on route
const RouteContentManager = () => {
  const location = useLocation();
  
  return (
    <div className={styles.mainContent}>
      {location.pathname === "/" && (
        <>
          <Home />
          <TrainCarousel />
        </>
      )}
      <Routes>  
        <Route path="/" element={null} />
        <Route 
          path="/booking" 
          element={
            <ProtectedRoute>
          <BookingPage />
          </ProtectedRoute>
        } 
        />
        <Route path="/test" element={<Test />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route 
          path="/login" 
          element={
            <LoginModal 
              isOpen={true} 
              onClose={() => window.history.back()} 
              onLogin={() => {}} 
              switchToRegister={() => {}} 
            />
          } 
        />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
    <Router>
      <div className={styles.app}>
        <Navbar />
        <RouteContentManager />
        <Footer />
      </div>
    </Router>
    </AuthProvider>
  );
}

export default App;