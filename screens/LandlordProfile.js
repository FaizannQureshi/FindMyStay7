import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  ScrollView,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles/ProfilePageStyle";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const LandlordProfile = ({ navigation }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUserName(userDoc.data().name || "Full Name");
          setProfileImage(userDoc.data().photoURL || null);
        }
      }
    });

    return unsubscribe;
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImage = result.assets[0].uri;
      setProfileImage(selectedImage);
      uploadImageToFirebase(selectedImage);
    }
  };

  const uploadImageToFirebase = async (imageUri) => {
    if (!user) return;

    const storage = getStorage();
    const fileName = `${user.uid}.jpg`;
    const storageRef = ref(storage, `profile_pictures/${fileName}`);

    try {
      const response = await fetch(imageUri);
      const blob = await response.blob();
      await uploadBytes(storageRef, blob);

      const downloadURL = await getDownloadURL(storageRef);
      setProfileImage(downloadURL);

      // Update Firestore with new image URL
      const db = getFirestore();
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, { photoURL: downloadURL });
    } catch (error) {
      console.error("Error uploading image: ", error);
    }
  };

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigation.navigate("Login");
      })
      .catch((error) => {
        console.error("Logout Error:", error);
      });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("LandlordHome")}
        >
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Profile</Text>
      </View>

      <View style={styles.profileSection}>
        {/* Profile Image Picker */}
        {/* <TouchableOpacity onPress={pickImage} style={styles.profileImageContainer}> */}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("FullScreenImage", {
              imageUri: profileImage,
              onImageRemoved: () => setProfileImage(null),
            })
          }
          style={styles.profileImageContainer}
        >
          <Image
            source={
              profileImage
                ? { uri: profileImage }
                : require("../Images/default.jpg")
            }
            style={styles.profileImage}
          />
        </TouchableOpacity>

        <View>
          <Text style={styles.profileName}>{userName}</Text>
          <Text style={styles.profileEmail}>
            {user?.email || "email@example.com"}
          </Text>
        </View>
      </View>

      <View style={styles.menu}>
        {/* New "Upload Your Profile Picture" Menu Item */}
        <TouchableOpacity style={styles.menuItem} onPress={pickImage}>
          <View style={styles.menuRow}>
            <Icon name="photo" size={24} color="#000" />
            <Text style={styles.menuText}>Upload Your Profile Picture</Text>
          </View>
          <Icon name="chevron-right" size={24} color="#aaa" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() =>
            navigation.navigate("LandlordEditProfile", { profileImage })
          }
        >
          <View style={styles.menuRow}>
            <Icon name="person" size={24} color="#000" />
            <Text style={styles.menuText}>Edit Profile</Text>
          </View>
          <Icon name="chevron-right" size={24} color="#aaa" />
        </TouchableOpacity>
        {/* 
        <TouchableOpacity style={styles.menuItem}><View style={styles.menuRow}><Icon name="lock" size={24} color="#000" /><Text style={styles.menuText}>Change Password</Text></View><Icon name="chevron-right" size={24} color="#aaa" /></TouchableOpacity> */}

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("ChangePasswordScreen")}
        >
          <View style={styles.menuRow}>
            <Icon name="lock" size={24} color="#000" />
            <Text style={styles.menuText}>Change Password</Text>
          </View>
          <Icon name="chevron-right" size={24} color="#aaa" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuRow}>
            <Icon name="credit-card" size={24} color="#000" />
            <Text style={styles.menuText}>Payment Method</Text>
          </View>
          <Icon name="chevron-right" size={24} color="#aaa" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("YourProperties")}
        >
          <View style={styles.menuRow}>
            <Icon name="receipt" size={24} color="#000" />
            <Text style={styles.menuText}>My Properties</Text>
          </View>
          <Icon name="chevron-right" size={24} color="#aaa" />
        </TouchableOpacity>

        <View style={styles.menuItem}>
          <View style={styles.menuRow}>
            <Icon name="visibility" size={24} color="#000" />
            <Text style={styles.menuText}>Dark Mode</Text>
          </View>
          <Switch
            value={darkMode}
            onValueChange={(value) => setDarkMode(value)}
          />
        </View>

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuRow}>
            <Icon name="policy" size={24} color="#000" />
            <Text style={styles.menuText}>Privacy Policy</Text>
          </View>
          <Icon name="chevron-right" size={24} color="#aaa" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuRow}>
            <Icon name="description" size={24} color="#000" />
            <Text style={styles.menuText}>Terms & Conditions</Text>
          </View>
          <Icon name="chevron-right" size={24} color="#aaa" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
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

export default LandlordProfile;
