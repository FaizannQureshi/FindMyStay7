import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  CheckBox,
  ActivityIndicator,
  Image,
  Alert,
  Modal,
  Button,
  FlatList,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles/PropertyListStyles";
import { db, storage } from "../firebase/firebaseConfig"; // Import Firestore
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth"; // Import Firebase Auth





const LOCATIONIQ_API_KEY = "pk.28ffc3665f759f380fc24a0533bb4b41"; // Replace with your actual key

const PropertyList = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [locationQuery, setLocationQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [propertyDocument, setPropertyDocument] = useState(null);
  const [propertyImages, setPropertyImages] = useState([]);
  const [selectedFacilities, setSelectedFacilities] = useState({
    mess: false,
    laundry: false,
    cctv: false,
    security: false,
    transport: false,
    kitchen: false,
  });

  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [locationSuggestions, setLocationSuggestions] = useState([]);

  const handleLocationInputChange = async (text) => {
    setPropertyData((prev) => ({ ...prev, location: text }));
    if (text.length > 2) {
      try {
        const response = await fetch(
          `https://api.locationiq.com/v1/autocomplete?key=pk.28ffc3665f759f380fc24a0533bb4b41&q=${encodeURIComponent(
            text
          )}&countrycodes=pk&limit=5&format=json`
        );
        const suggestions = await response.json();
        setLocationSuggestions(suggestions);

        // 🌟 Updated: Auto-update lat & lon if first suggestion exists
        if (suggestions[0]) {
          const { lat, lon } = suggestions[0];
          setRegion((prev) => ({
            ...prev,
            latitude: parseFloat(lat),
            longitude: parseFloat(lon),
          }));
          setPropertyData((prev) => ({
            ...prev,
            latitude: parseFloat(lat),
            longitude: parseFloat(lon),
          }));
        }
      } catch (error) {
        console.error("Error fetching location suggestions:", error);
      }
    } else {
      setLocationSuggestions([]);
    }
  };



  const fetchLocationSuggestions = async (query) => {
    try {
      if (!query || query.length < 3) return setLocationSuggestions([]);
      const response = await axios.get(
        `https://api.locationiq.com/v1/autocomplete?key=pk.28ffc3665f759f380fc24a0533bb4b41&q=${encodeURIComponent(
          query
        )}&limit=10&format=json`
      );

      // Prioritize Pakistan-based locations
      const sortedSuggestions = response.data.sort((a, b) => {
        const isAPakistan = a.address && a.address.country_code === "pk";
        const isBPakistan = b.address && b.address.country_code === "pk";
        return isBPakistan - isAPakistan;
      });

      setLocationSuggestions(sortedSuggestions);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleLocationSelect = (location) => {
    const latitude = parseFloat(location.lat);
    const longitude = parseFloat(location.lon);

    setSelectedLocation({
      latitude,
      longitude,
      displayName: location.display_name,
    });

    setPropertyData((prev) => ({
      ...prev,
      location: location.display_name,
      latitude,
      longitude,
    }));

    setRegion((prev) => ({
      ...prev,
      latitude,
      longitude,
    }));
    setLocationSuggestions([]);
  };

  const uploadRoomImages = async (images, roomKey) => {
    return await Promise.all(
      images.map(async (uri, index) => {
        const path = `room_images/${roomKey}_${Date.now()}_${index}`;
        return await uploadFileToFirebase(uri, path);
      })
    );
  };


  // Toggle function for checkboxes
  const toggleFacility = (facility) => {
    setSelectedFacilities((prev) => ({
      ...prev,
      [facility]: !prev[facility], // Toggle the selected state
    }));
  };

  const [propertyData, setPropertyData] = useState({
    name: "",
    cnic: "",
    phone: "",
    propertyTitle: "", // Added new field
    description: "",
    floors: "",
    rooms: "",
    location: "",
    latitude: null,
    longitude: null,
    facilities: {},
  });

  const [roomPricing, setRoomPricing] = useState({
    single: { selected: false, price: "", quantity: "" },
    bi: { selected: false, price: "", quantity: "" },
    tri: { selected: false, price: "", quantity: "" },
    four: { selected: false, price: "", quantity: "" },
    five: { selected: false, price: "", quantity: "" },
    more: { selected: false, price: "", quantity: "" },
  });

  // Function to pick images from gallery
  const pickRoomImages = async (roomKey) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      setRoomPricing((prev) => ({
        ...prev,
        [roomKey]: {
          ...prev[roomKey],
          images: [...(prev[roomKey].images || []), ...result.assets.map((asset) => asset.uri)],
        },
      }));
    }
  };

  const [addOns, setAddOns] = useState({
    mess: { selected: false, price: "", type: "per month" },
    laundry: { selected: false, price: "", type: "per item" },
    transport: { selected: false, price: "", type: "per time" },
    cleaning: { selected: false, price: "", type: "per month" }, // New Room Cleaning Option
  });

  // Update state when user types
  const handleInputChange = (key, value) => {
    setPropertyData((prev) => ({ ...prev, [key]: value }));
  };

  // Function to upload property data to Firestore
  const uploadProperty = async () => {
    try {
      if (
        !propertyData.name ||
        !propertyData.cnic ||
        !propertyData.phone ||
        !propertyData.floors ||
        !propertyData.rooms ||
        !propertyData.location
      ) {
        alert("Please fill all required fields.");
        return;
      }

      // Format room pricing for Firestore
      // Upload room images and format pricing
      const formattedRoomPricing = await Promise.all(
        Object.entries(roomPricing)
          .filter(([_, data]) => data.selected)
          .map(async ([key, data]) => {
            const imageUrls = data.images
              ? await uploadRoomImages(data.images, key)
              : [];
            return {
              type: key,
              price: data.price,
              quantity: data.quantity,
              images: imageUrls, // Include uploaded image URLs
            };
          })
      );


      // Format add-ons for Firestore
      const formattedAddOns = Object.entries(addOns)
        .filter(([_, data]) => data.selected)
        .map(([key, data]) => ({
          type: key,
          price: data.price,
          priceType: data.type, // Save price type (per month, per item, per time)
        }));

      await addDoc(collection(db, "properties"), {
        ...propertyData,
        facilities: selectedFacilities,
        pricing: formattedRoomPricing, // ✅ Now includes image URLs
        addOns: formattedAddOns,
        propertyDocument: docURL,
        propertyImages: imageUrls,
        timestamp: new Date(),
      });


      alert("Property listed successfully!");
      navigation.navigate("SuccessPagePropertyUpload");
    } catch (error) {
      console.error("Error uploading property: ", error);
      alert("Failed to list property. Try again.");
    }
  };


  const pickDocument = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) setPropertyDocument(result.assets[0].uri);
  };

  const pickPropertyImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });
    if (!result.canceled) setPropertyImages(result.assets.map((asset) => asset.uri));
  };

  const uploadFileToFirebase = async (uri, path) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, blob);
    return await getDownloadURL(storageRef);
  };
  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (
        !propertyData.name ||
        !propertyData.cnic ||
        !propertyData.phone ||
        !propertyData.floors ||
        !propertyData.rooms ||
        !propertyData.location ||
        !propertyData.description || 
        !propertyDocument
      ) {
        alert("Please fill all required fields.");
        setLoading(false);
        return;
      }
  
      const auth = getAuth(); // Initialize Firebase Auth
      const user = auth.currentUser;
      if (!user) {
        alert("You must be logged in to list a property.");
        setLoading(false);
        return;
      }
  
      // Upload Property Document
      const docURL = await uploadFileToFirebase(propertyDocument, `documents/${Date.now()}_property_doc`);
  
      // Upload Property Images
      const imageUrls = await Promise.all(
        propertyImages.map((uri, index) =>
          uploadFileToFirebase(uri, `property_images/${Date.now()}_${index}`)
        )
      );
  
      // ✅ Upload Room Images for each room type
      const formattedRoomPricing = await Promise.all(
        Object.entries(roomPricing)
          .filter(([_, data]) => data.selected)
          .map(async ([key, data]) => {
            const uploadedRoomImages = await Promise.all(
              (data.images || []).map((uri, idx) =>
                uploadFileToFirebase(uri, `room_images/${key}_${Date.now()}_${idx}`)
              )
            );
            return {
              type: key,
              price: data.price,
              quantity: data.quantity,
              images: uploadedRoomImages, // Room images URLs saved here
            };
          })
      );
  
      // ✅ Format add-ons for Firestore
      const formattedAddOns = Object.entries(addOns)
        .filter(([_, data]) => data.selected)
        .map(([key, data]) => ({
          type: key,
          price: data.price,
          priceType: data.type,
        }));
  
      // ✅ Upload everything to Firestore
      await addDoc(collection(db, "properties"), {
        userID: user.uid, // Linking property to the user
        ...propertyData,
        facilities: selectedFacilities,
        pricing: formattedRoomPricing,
        addOns: formattedAddOns,
        propertyDocument: docURL,
        propertyImages: imageUrls,
        status: "active",
        timestamp: new Date(),
      });
  
      alert("Your property has been listed successfully!");
      navigation.navigate("SuccessPagePropertyUpload");
    } catch (error) {
      console.error("Error listing property:", error);
      alert("Error listing property. Please try again.");
    }
    setLoading(false);
  };  



  // 🌟 UI rendering for location suggestions with improved styling
  const renderLocationSuggestions = () =>
    locationSuggestions.length > 0 && (
      <View
        style={{
          backgroundColor: "white",
          borderColor: "brown",
          borderWidth: 1,
          borderRadius: 8,
          padding: 10,
          marginTop: 5,
          elevation: 5,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        }}
      >
        {locationSuggestions.map((suggestion, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleLocationSelect(suggestion)}
            style={{
              paddingVertical: 8,
              borderBottomWidth:
                index !== locationSuggestions.length - 1 ? 1 : 0,
              borderBottomColor: "#ddd",
            }}
          >
            <Text style={{ color: "#4a4a4a" }}>
              {suggestion.display_name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );



  return (
    <ScrollView style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("LandlordHome")}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>List Your Property</Text>
      </View>

      <Text style={styles.subtitle}>
        On <Text style={styles.highlight}>FindMyStay</Text>
      </Text>

      {/* Input Fields */}
      <TextInput
        style={styles.input}
        placeholder="Enter your complete name as per CNIC"
        placeholderTextColor="gray"
        value={propertyData.name}
        onChangeText={(text) => handleInputChange("name", text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter your CNIC Number"
        placeholderTextColor="gray"
        value={propertyData.cnic}
        onChangeText={(text) => handleInputChange("cnic", text.replace(/[^0-9]/g, ""))} // Allow only numbers
        keyboardType="numeric"
        maxLength={13} // Assuming CNIC without dashes
      />


      <TextInput
        style={styles.input}
        placeholder="Phone number"
        placeholderTextColor="gray"
        value={propertyData.phone}
        onChangeText={(text) => handleInputChange("phone", text.replace(/[^0-9]/g, ""))}
        keyboardType="phone-pad"
        maxLength={12} // Assuming a standard 11-digit phone number
      />


      {/* Features Section */}

      {/* New Property Name Field */}
      <TextInput
        style={styles.input}
        placeholder="Name of Your Hostel or Property"
        placeholderTextColor="gray"
        value={propertyData.propertyTitle}
        onChangeText={(text) => handleInputChange("propertyTitle", text)}
      />
      <TextInput
        style={[styles.input, { height: 120, textAlignVertical: "top" }]} // Increased height for multiline
        placeholder="Describe your property (e.g., amenities, environment, nearby facilities)"
        placeholderTextColor="gray"
        value={propertyData.description}
        onChangeText={(text) => handleInputChange("description", text)}
        multiline={true}
      />

      <TextInput
        style={styles.input}
        placeholder="Number of Floors"
        placeholderTextColor="gray"
        value={propertyData.floors}
        onChangeText={(text) => handleInputChange("floors", text.replace(/[^0-9]/g, ""))}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Number of Rooms"
        placeholderTextColor="gray"
        value={propertyData.rooms}
        onChangeText={(text) => handleInputChange("rooms", text.replace(/[^0-9]/g, ""))}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Property Location"
        placeholderTextColor="gray"
        value={propertyData.location}
        onChangeText={handleLocationInputChange}
      />

      {/* 🌟 Location suggestions shown here */}
      {renderLocationSuggestions()}




      <MapView style={styles.map} region={region}>
        <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
      </MapView>


      <TouchableOpacity style={styles.uploadButton} onPress={pickDocument}>
        <Ionicons name="cloud-upload-outline" size={20} color="white" />
        <Text style={styles.uploadText}>
          {propertyDocument ? "Property Document Selected" : "Upload Property Document"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.uploadButton} onPress={pickPropertyImages}>
        <Ionicons name="images-outline" size={20} color="white" />
        <Text style={styles.uploadText}>
          {propertyImages.length > 0 ? `${propertyImages.length} Images Selected` : "Upload Property Images"}
        </Text>
      </TouchableOpacity>

      {/* Facilities Section */}
      <Text style={styles.sectionTitle}>Facilities</Text>
      {[
        { name: "Mess", key: "mess" },
        { name: "Laundry", key: "laundry" },
        { name: "CCTV", key: "cctv" },
        { name: "24/7 Security Guard", key: "security" },
        { name: "Transport", key: "transport" },
        { name: "Kitchen", key: "kitchen" },
      ].map((facility) => (
        <TouchableOpacity
          key={facility.key}
          style={styles.facility}
          onPress={() => toggleFacility(facility.key)}
        >
          <Text style={styles.facilityText}>{facility.name}</Text>
          <Ionicons
            name={
              selectedFacilities[facility.key]
                ? "checkbox-outline"
                : "square-outline"
            }
            size={24}
            color="black"
          />
        </TouchableOpacity>
      ))}

      {/* Pricing Section */}
      <Text style={styles.sectionTitle}>Pricing</Text>
      {[
        { label: "Single Seater", key: "single" },
        { label: "Bi Seater", key: "bi" },
        { label: "Tri Seater", key: "tri" },
        { label: "Four Seater", key: "four" },
        { label: "Five Seater", key: "five" },
        { label: "More than 5", key: "more" },
      ].map((room) => (
        <View key={room.key} style={styles.roomTypeContainer}>
          <TouchableOpacity
            style={styles.facility}
            onPress={() =>
              setRoomPricing((prev) => ({
                ...prev,
                [room.key]: {
                  ...prev[room.key],
                  selected: !prev[room.key]?.selected,
                  images: prev[room.key]?.images || [],
                },
              }))
            }
          >
            <Text style={styles.facilityText}>{room.label}</Text>
            <Ionicons
              name={
                roomPricing[room.key]?.selected
                  ? "checkbox-outline"
                  : "square-outline"
              }
              size={24}
              color="black"
            />
          </TouchableOpacity>

          {roomPricing[room.key]?.selected && (
            <>
              {/* Price & Quantity Inputs */}
              <View style={styles.priceInputContainer}>
                <TextInput
                  style={styles.priceInput}
                  placeholder="Price (per month)"
                  placeholderTextColor="gray"
                  keyboardType="numeric"
                  value={roomPricing[room.key]?.price || ''}
                  onChangeText={(text) =>
                    setRoomPricing((prev) => ({
                      ...prev,
                      [room.key]: { ...prev[room.key], price: text },
                    }))
                  }
                />
                <TextInput
                  style={styles.priceInput}
                  placeholder="Number of Rooms"
                  placeholderTextColor="gray"
                  keyboardType="numeric"
                  value={roomPricing[room.key]?.quantity || ''}
                  onChangeText={(text) =>
                    setRoomPricing((prev) => ({
                      ...prev,
                      [room.key]: { ...prev[room.key], quantity: text },
                    }))
                  }
                />
              </View>

              {/* Upload Room Images */}
              <TouchableOpacity
                style={styles.uploadButton}
                onPress={() => pickRoomImages(room.key)}
              >
                <Text style={styles.uploadButtonText}>Upload Room Images</Text>
                <Ionicons name="image-outline" size={24} color="white" />
              </TouchableOpacity>

              {/* Preview Uploaded Images */}
              <ScrollView horizontal style={{ marginTop: 10 }}>
                {roomPricing[room.key]?.images?.map((imgUri, index) => (
                  <Image
                    key={index}
                    source={{ uri: imgUri }}
                    style={{ width: 100, height: 100, marginRight: 10, borderRadius: 10 }}
                  />
                ))}
              </ScrollView>
            </>
          )}
        </View>
      ))}
      <Text style={styles.sectionTitle}>Add Ons</Text>
      {[
        { label: "Mess", key: "mess" },
        { label: "Laundry", key: "laundry" },
        { label: "Transport", key: "transport" },
        { label: "Room Cleaning", key: "cleaning" }, // New Room Cleaning Option
      ].map((addon) => (
        <View key={addon.key} style={styles.roomTypeContainer}>
          {/* Checkbox for Selecting Add-On */}
          <TouchableOpacity
            style={styles.facility}
            onPress={() =>
              setAddOns((prev) => ({
                ...prev,
                [addon.key]: {
                  ...prev[addon.key],
                  selected: !prev[addon.key].selected,
                },
              }))
            }
          >
            <Text style={styles.facilityText}>{addon.label}</Text>
            <Ionicons
              name={
                addOns[addon.key].selected
                  ? "checkbox-outline"
                  : "square-outline"
              }
              size={24}
              color="black"
            />
          </TouchableOpacity>

          {/* Show Inputs Only if Selected */}
          {addOns[addon.key].selected && (
            <View style={styles.priceInputContainer}>
              {/* Price Input */}
              <TextInput
                style={styles.priceInput}
                placeholder="Enter Price"
                placeholderTextColor="gray"
                keyboardType="numeric"
                value={addOns[addon.key].price}
                onChangeText={(text) =>
                  setAddOns((prev) => ({
                    ...prev,
                    [addon.key]: { ...prev[addon.key], price: text },
                  }))
                }
              />

              {/* Dropdown for Price Type */}
              <View style={styles.dropdownContainer}>
                <TouchableOpacity
                  style={styles.dropdownButton}
                  onPress={() =>
                    setAddOns((prev) => ({
                      ...prev,
                      [addon.key]: {
                        ...prev[addon.key],
                        type:
                          prev[addon.key].type === "per month"
                            ? "per item"
                            : prev[addon.key].type === "per item"
                              ? "per time"
                              : "per month",
                      },
                    }))
                  }
                >
                  <Text style={styles.dropdownText}>
                    {addOns[addon.key].type}
                  </Text>
                  <Ionicons name="chevron-down" size={20} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      ))}

      {/* Terms and Conditions */}
      <Text style={styles.terms}>
        By clicking on 'List your Property', you're agreeing to our Privacy Policy{" "}
        <Text style={styles.highlight}>Terms of Service</Text> and{" "}
        <Text style={styles.highlight}>Privacy Policy</Text>.
      </Text>



      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#856c61" />
          <Text style={styles.loadingText}>Please wait. Your property is being uploaded...</Text>
        </View>
      )}

      {/* Upload Button */}

      <TouchableOpacity
        style={styles.uploadButtonFinal}
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text style={styles.uploadButtonText}>{loading ? "Uploading..." : "List Your Property"}</Text>
      </TouchableOpacity>





      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("LandlordHome")}
        >
          <Ionicons name="home-outline" size={24} color="#5d4940" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="chatbubbles-outline" size={24} color="gray" />
          <Text style={styles.navText}>Your Personal AI</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("YourProperties")}
        >
          <Ionicons name="business-outline" size={24} color="gray" />
          <Text style={styles.navText}>Your Properties</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("LandlordProfile")}
        >
          <Ionicons name="person-outline" size={24} color="gray" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
export default PropertyList;