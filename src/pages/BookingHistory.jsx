import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import styles from "../Styles/BookingHistory.module.scss";
import { db } from "../Config/FirebaseConfig";
import { useAuth } from "../Context/AuthContext"; // Assuming you have an AuthContext to get the current user

function BookingHistory() {
  const [bookings, setBookings] = useState([]);
  const { currentUser } = useAuth(); // Get the current user
  console.log("currentUser", currentUser);

  const fetchBookingData = async () => {
    try {
      if (!currentUser?.uid) {
        console.error("User not logged in");
        return;
      }

      // Query Firestore for bookings of the current user, ordered by createdAt
      const bookingsQuery = query(
        collection(db, "bookings"),
        where("userId", "==", currentUser.uid), // Filter by current user's ID
        orderBy("createdAt", "desc") // Sort by createdAt in descending order
      );

      const querySnapshot = await getDocs(bookingsQuery);

      const bookingData = [];
      querySnapshot.forEach((doc) => {
        bookingData.push({ id: doc.id, ...doc.data() });
      });
      console.log("Booking data:", bookingData);  

      setBookings(bookingData);
    } catch (error) {
      console.error("Error fetching booking data:", error);
    }
  };

  useEffect(() => {
    fetchBookingData();
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div className={styles.container}>
      <h1>Booking History</h1>
      <div className={styles.bookingHistory}>
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <div key={booking.id} className={styles.bookingCard}>
              <h2>{booking.trainDetails?.trainName}</h2>
              <p>Booking ID: {booking.id}</p>
              <p>From: {booking.trainDetails?.from}</p>
              <p>To: {booking.trainDetails?.to}</p>
              <p>Date: {booking.trainDetails?.date}</p>
            </div>
          ))
        ) : (
          <p className={styles.noBookings}>No bookings found.</p>
        )}
      </div>
    </div>
  );
}

export default BookingHistory;