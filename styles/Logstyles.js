import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    container: {
      // flex: 1,
      backgroundColor: "#f6ece5",
      paddingHorizontal: 10,
      justifyContent: "center",
      padding: 200,
      paddingTop: 220,
    },
    header: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#333",
      textAlign: "center",
      marginBottom: 30,
    },
    subHeader: {
      fontSize: 16,
      color: "#666",
      textAlign: "center",
      marginBottom: 30,
    },
    input: {
      backgroundColor: "#e8e1dc",
      borderRadius: 8,
      padding: 15,
      marginBottom: 15,
      fontSize: 16,
      borderWidth: 1,
      borderColor: "#ddd",
    },
    checkboxContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 20,
      paddingTop: 15,
    },
    checkbox: {
      width: 20,
      height: 20,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: "#5d4940",
      marginLeft: 10,
      marginRight: 10,
      justifyContent: 'center', // Center the check icon
      alignItems: 'center', // Center the check icon
    },
    checkboxChecked: {
      backgroundColor: "#5d4940",
    },
    checkboxLabel: {
      fontSize: 16,
      color: "#333",
      marginLeft: 0,
    },
    forgotPassword: {
      fontSize: 14,
      color: "#5d4940",
      textDecorationLine: "underline",
      // alignItems: "right//",
      // justifyContent: "space-between",
    },
    loginButton: {
      backgroundColor: "#5d4940",
      borderRadius: 8,
      padding: 15,
      alignItems: "center",
    },
    loginButtonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
    },
    orText: {
      textAlign: "center",
      fontSize: 16,
      color: "#666",
      marginVertical: 20,
    },
    googleButton: {
      backgroundColor: "#e8e1dc",
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 8,
      padding: 15,
      alignItems: "center",
      flexDirection: "row",
    },

    googleIcon: {
      marginRight: 10,
    },
    

    googleButtonText: {
      fontSize: 16,
      color: "#333",
      marginLeft: 20,
      
    },
    signUpText: {
      marginTop:25,
      textAlign: "center",
      fontSize: 14,
      color: "#666",
      flexDirection: "row",
      justifyContent: "center",
      marginBottom: 60,
    },
    signUpLink: {
      color: "#5d4940",
      fontWeight: "bold",
    },
    radioGroup: {       
      flexDirection: "row",       
      justifyContent: "center", // Changed from "space-between"
      alignItems: "center", // Added to ensure vertical centering
      marginVertical: 15,
      marginBottom: 20,
    },     
    radioButtonContainer: {       
      flexDirection: "row",       
      alignItems: "center",
      marginHorizontal: 25, // Added to create space between radio buttons
    },
    radioOuterCircle: {
      height: 20,
      width: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: "#5d4940",
      justifyContent: "center",
      alignItems: "center",
      marginRight: 8,
    },
    radioInnerCircle: {
      height: 10,
      width: 10,
      borderRadius: 5,
      backgroundColor: "#5d4940",
    },
    radioText: {
      fontSize: 14,
      color: "#374151",
    },
    
  });