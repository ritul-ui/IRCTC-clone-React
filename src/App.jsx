import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
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
import TrainSearchResults from "./pages/TrainSearchResult";
import TrainDetails from "./pages/TrainDetails";
import BookingConfirmation from "./pages/BookingConfirmationPage";


// Component to conditionally render content based on route
const RouteContentManager = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
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
        <Route path="/train-search" element={<TrainSearchResults />} />
        <Route path="/train-details/:train_number" element={<TrainDetails />} />
        <Route path="/booking-confirmation" element={<BookingConfirmation />} />
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