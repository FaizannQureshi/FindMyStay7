import React, { useState, useEffect } from "react";
import { styles } from "../styles/Signstyles";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  Animated
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { signUpUser } from "../firebase/authService";

const Signup = () => {
  const navigation = useNavigation();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [email, setEmail] = useState("");
  const [photos, setPhotos] = useState([]);
  const [dob, setDob] = useState("");
  const [cnic, setCnic] = useState("");
  const [selectedGender, setSelectedGender] = useState(null);
  const [fullName, setFullName] = useState("");
  const [uploadText, setUploadText] = useState("Upload front of your CNIC");
  const [fadeAnim] = useState(new Animated.Value(0));


  useEffect(() => {
    if (photos.length === 1) setUploadText("Upload back of your CNIC");
    if (photos.length === 2) setUploadText("Both CNIC sides uploaded ✔️");
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [photos]);


  const handleImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "We need access to your gallery.");
      return;
    }
    if (photos.length >= 2) {
      Alert.alert("Limit Reached", "You can only select two images.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setPhotos((prevPhotos) => [...prevPhotos, result.assets[0].uri]);
    }
  };

  const removeImage = (uri) => {
    setPhotos(photos.filter((photo) => photo !== uri));
    setUploadText("Upload front of your CNIC");
  };

  const formatCnic = (value) => {
    let numericValue = value.replace(/\D/g, "");
    if (numericValue.length > 5) {
      numericValue = numericValue.slice(0, 5) + "-" + numericValue.slice(5);
    }
    if (numericValue.length > 13) {
      numericValue = numericValue.slice(0, 13) + "-" + numericValue.slice(13);
    }
    if (numericValue.length > 15) {
      numericValue = numericValue.slice(0, 15);
    }
    setCnic(numericValue);
  };

  // Update the handleSubmit function:
  const handleSubmit = async () => {
    if (!email || !password || !confirmPassword || !selectedRole || !photos.length || !dob || !cnic || !fullName) {
      Alert.alert("Missing Information", "Please fill out all fields.");
      return;
    }

    if (photos.length !== 2) {
      Alert.alert("Photo Error", "You must upload exactly two photos of your CNIC.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Password Mismatch", "Passwords do not match.");
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    const cnicPattern = /^\d{5}-\d{7}-\d{1}$/;
    if (!cnicPattern.test(cnic)) {
      Alert.alert("Invalid CNIC", "Enter a valid CNIC (XXXXX-XXXXXXX-X).");
      return;
    }

    const passwordValidation = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordValidation.test(password)) {
      Alert.alert(
        "Password Error",
        "Password must contain at least one capital letter, one number, and one special character."
      );
      return;
    }

    try {
      const user = await signUpUser(email, password, {
        role: selectedRole,
        name: fullName,
        gender: selectedGender,
        cnic,
        dob,
        photos,
      });

      navigation.navigate("VerificationWaiting", {
        user,
        selectedRole,
      });
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>FindMyStay</Text>
      <Text style={styles.subtitle}>Account Signup</Text>

      <View style={styles.inputContainer}>
        <Ionicons name="person" size={20} color="#5d4940" />
        <TextInput
          style={styles.input}
          placeholder="Enter full name as per CNIC"
          placeholderTextColor="#9CA3AF"
          value={fullName}
          onChangeText={setFullName}
        />
      </View>

      <View style={styles.inputContainer}>
        <MaterialIcons name="credit-card" size={20} color="#5d4940" />
        <TextInput
          style={styles.input}
          placeholder="Enter your CNIC number"
          placeholderTextColor="#9CA3AF"
          keyboardType="numeric"
          value={cnic}
          onChangeText={formatCnic}
          maxLength={15}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="mail" size={20} color="#5d4940" />
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#9CA3AF"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="calendar" size={20} color="#5d4940" />
        <TextInput
          style={styles.input}
          placeholder="YYYY - MM - DD"
          placeholderTextColor="#9CA3AF"
          value={dob}
          onChangeText={setDob}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed" size={20} color="#5d4940" />
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#9CA3AF"
          secureTextEntry={!passwordVisible}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <Ionicons
            name={passwordVisible ? "eye" : "eye-off"}
            size={20}
            color="#5d4940"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed" size={20} color="#5d4940" />
        <TextInput
          style={styles.input}
          placeholder="Confirm your password"
          placeholderTextColor="#9CA3AF"
          secureTextEntry={!confirmPasswordVisible}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity
          onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
        >
          <Ionicons
            name={confirmPasswordVisible ? "eye" : "eye-off"}
            size={20}
            color="#5d4940"
          />
        </TouchableOpacity>
      </View>

      {/* Gender Selection */}
      <Text style={styles.label}>Gender</Text>
       <View style={styles.radioGroup}>
        <TouchableOpacity
          style={styles.radioButtonContainer}
          onPress={() => setSelectedGender("Male")}
        >
          <View style={styles.radioOuterCircle}>
            {selectedGender === "Male" && <View style={styles.radioInnerCircle} />}
          </View>
          <Text style={styles.radioText}>Male</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.radioButtonContainer}
          onPress={() => setSelectedGender("Female")}
        >
          <View style={styles.radioOuterCircle}>
            {selectedGender === "Female" && <View style={styles.radioInnerCircle} />}
          </View>
          <Text style={styles.radioText}>Female</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.radioButtonContainer}
          onPress={() => setSelectedGender("Prefer not to say")}
        >
          <View style={styles.radioOuterCircle}>
            {selectedGender === "Prefer not to say" && <View style={styles.radioInnerCircle} />}
          </View>
          <Text style={styles.radioText}>Prefer not to say</Text>
        </TouchableOpacity>
      </View>

      {/* Updated Upload Section */}
      <TouchableOpacity style={styles.uploadContainer} onPress={handleImagePicker}>
        <Ionicons name="cloud-upload" size={24} color="#5d4940" />
        <Animated.Text style={[styles.uploadText, { opacity: fadeAnim }]}>
          {uploadText}
        </Animated.Text>
      </TouchableOpacity>

      {photos.length > 0 && (
        <View style={styles.previewContainer}>
          {photos.map((uri, index) => (
            <View key={index} style={styles.imageWrapper}>
              <Image source={{ uri }} style={styles.selectedImage} />
              <Text style={styles.imageLabel}>{index === 0 ? "Front Side" : "Back Side"}</Text>
              <TouchableOpacity
                onPress={() => removeImage(uri)}
                style={styles.removeButton}
              >
                <Ionicons name="close-circle" size={24} color="red" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}


      <View style={styles.radioGroup}>
        <TouchableOpacity
          style={styles.radioButtonContainer}
          onPress={() => setSelectedRole("Buyer")}
        >
          <View style={styles.radioOuterCircle}>
            {selectedRole === "Buyer" && <View style={styles.radioInnerCircle} />}
          </View>
          <Text style={styles.radioText}>As a Buyer</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.radioButtonContainer}
          onPress={() => setSelectedRole("Landlord")}
        >
          <View style={styles.radioOuterCircle}>
            {selectedRole === "Landlord" && <View style={styles.radioInnerCircle} />}
          </View>
          <Text style={styles.radioText}>As a Landlord</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Login Up Link */}
      <View style={styles.signUpText}>
        <Text>Already have an account? </Text>
        <Text style={styles.signUpLink} onPress={() => navigation.navigate("Login")}>
          Login
        </Text>
      </View>


    </ScrollView>
  );
};

export default Signup;

