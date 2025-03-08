import React, { useState } from "react";
import { styles } from "../styles/Logstyles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
// import { doc, setDoc } from "firebase/firestore"; // Import Firestore methods
import { doc, getDoc } from "firebase/firestore"; // Add getDoc here
import { db } from "../firebase/firebaseConfig"; // Import Firestore
import { loginUser } from "../firebase/authService"; // Ensure path is correct
import { resetPassword } from "../firebase/authService";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from "react";




import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

const Login = () => {
  const navigation = useNavigation(); // Initialize navigation
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [role, setRole] = useState(null); // No default now
  const [selectedRole, setSelectedRole] = useState(null);

  useEffect(() => {
    const loadRememberedUser = async () => {
      const savedEmail = await AsyncStorage.getItem('email');
      const savedPassword = await AsyncStorage.getItem('password');
      const savedRememberMe = await AsyncStorage.getItem('rememberMe');

      if (savedRememberMe === 'true') {
        setEmail(savedEmail || '');
        setPassword(savedPassword || '');
        setRememberMe(true);
      }
    };
    loadRememberedUser();
  }, []);


  const handleLogin = async () => {
    if (!email || !password || !role) {
      Alert.alert("Missing Information", "Please enter all fields and select a role.");
      return;
    }
  
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      if (rememberMe) {
        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('password', password);
        await AsyncStorage.setItem('rememberMe', 'true');
      } else {
        await AsyncStorage.removeItem('email');
        await AsyncStorage.removeItem('password');
        await AsyncStorage.removeItem('rememberMe');
      }
  
      await user.reload();
      if (!user.emailVerified) {
        Alert.alert("Error", "Please verify your email before logging in.");
        return;
      }
  
      // 🔍 Fetch user document directly from Firestore
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);
  
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
  
        if (userData.role !== role) {
          Alert.alert(
            "Role Mismatch",
            `This account is registered as a "${userData.role}". Please log in with the correct role.`,
            [{ text: "OK" }],
            { cancelable: false }
          );
          return;
        }
  
        // 🎯 Navigate based on role
        navigation.navigate(role === "Buyer" ? "HomeScreen" : "LandlordHome", { uid: user.uid });
  
      } else {
        throw new Error("User data not found.");
      }
    } catch (error) {
      console.error("Login Error:", error.message);
      Alert.alert("Login Error", error.message);
    }
  };  


  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert("Forgot Password", "Please enter your email address to reset your password.");
      return;
    }

    const result = await resetPassword(email);
    if (result.success) {
      Alert.alert("Password Reset Email Sent", "Check your email for reset instructions.");
    } else {
      Alert.alert("Error", result.message);
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome back!</Text>
      <Text style={styles.subHeader}>Log In to your account</Text>

      {/* Email Field */}
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="#888"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      {/* Password Field */}
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        placeholderTextColor="#888"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Remember Me & Forgot Password */}
      <View style={styles.checkboxContainer}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            style={[
              styles.checkbox,
              rememberMe && styles.checkboxChecked,
            ]}
            onPress={() => setRememberMe(!rememberMe)}
          >
            {rememberMe && <Icon name="check" size={16} color="#fff" />}
          </TouchableOpacity>
          <Text style={styles.checkboxLabel}>Remember Me</Text>
        </View>
        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotPassword}>Forgotten password?</Text>
        </TouchableOpacity>

      </View>

      {/* Role Selection */}
      <View style={styles.radioGroup}>
        <TouchableOpacity
          style={styles.radioButtonContainer}
          onPress={() => setRole("Buyer")}
        >
          <View style={styles.radioOuterCircle}>
            {role === "Buyer" && <View style={styles.radioInnerCircle} />}
          </View>
          <Text style={styles.radioText}>Login as Buyer</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.radioButtonContainer}
          onPress={() => setRole("Landlord")}
        >
          <View style={styles.radioOuterCircle}>
            {role === "Landlord" && <View style={styles.radioInnerCircle} />}
          </View>
          <Text style={styles.radioText}>Login as Landlord</Text>
        </TouchableOpacity>
      </View>

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Log In</Text>
      </TouchableOpacity>

      {/* Divider */}
      {/* <Text style={styles.orText}>OR</Text> */}

      {/* Google Login */}
      {/* <TouchableOpacity style={styles.googleButton}>
        <Icon name="google" size={24} color="#5d4940" style={styles.googleIcon} />
        <Text style={styles.googleButtonText}>Log in with your Google account</Text>
      </TouchableOpacity> */}

      {/* Sign Up Link */}
      <View style={styles.signUpText}>
        <Text>Don’t have an account? </Text>
        <Text style={styles.signUpLink} onPress={() => navigation.navigate("Signup")}>
          Sign Up
        </Text>
      </View>
    </View>
  );
};

export default Login;
