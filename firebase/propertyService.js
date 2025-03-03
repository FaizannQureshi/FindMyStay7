import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";


const staticRatings = {
  "Ayesha Hostel": 4.5,
  "Haris Residency": 4.2,
  "Green View Hostel": 4.8,
};

export const fetchProperties = async () => {
  const propertiesCollection = collection(db, "properties");
  const propertySnapshot = await getDocs(propertiesCollection);
  const propertyList = propertySnapshot.docs
    .map((doc) => {
      const data = doc.data();
      
      // Skip non-active properties
      if (data.status !== "active") {
        return null;
      }

      // Extract lowest room price
      const lowestRoomPrice = Math.min(
        ...data.pricing.map((room) => parseInt(room.price))
      );

      return {
        id: doc.id,
        ...data,  // Include all original properties
        startingPrice: lowestRoomPrice,
        rating: staticRatings[data.propertyTitle] || 3.5
      };
    })
    .filter(property => property !== null); // Remove null entries (non-active properties)

  // Sort by rating (desc)
  return propertyList.sort((a, b) => b.rating - a.rating);
};