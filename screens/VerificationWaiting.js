import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { checkVerificationStatus, deleteUnverifiedUser } from "../firebase/authService";

const VerificationWaiting = ({ route, navigation }) => {
  const [timeLeft, setTimeLeft] = useState(120);
  const { user, selectedRole } = route.params;

  useEffect(() => {
    let timer, checkVerification;

    const startTimer = () => {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            deleteUnverifiedUser(user);
            navigation.replace("Signup");
          }
          return prev - 1;
        });
      }, 1000);
    };

    const verifyEmail = async () => {
      try {
        const isVerified = await checkVerificationStatus(user);
        if (isVerified) {
          clearInterval(timer);
          clearInterval(checkVerification);
          navigation.replace(selectedRole === "Buyer" ? "HomeScreen" : "LandlordHome");
        }
      } catch (error) {
        console.error("Verification Check Error:", error);
      }
    };

    checkVerification = setInterval(verifyEmail, 2000);
    startTimer();

    return () => {
      clearInterval(timer);
      clearInterval(checkVerification);
    };
  }, [user, selectedRole, navigation]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#5d4940" />
      <Text style={styles.title}>Waiting for Email Verification</Text>
      <Text style={styles.timer}>{timeLeft} seconds remaining</Text>
      <Text style={styles.text}>Please check your email and verify your account.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    color: "#5d4940",
  },
  timer: {
    fontSize: 18,
    marginTop: 10,
    color: "#5d4940",
  },
  text: {
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
    color: "#666",
  },
});

export default VerificationWaiting;
