import {StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  
    // FOR welcome page
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#f6ece5",
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 30,
      fontWeight: "bold",
      marginBottom: 20,
    },
    imageGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      marginBottom: 20,
    },
    image: {
      width: 80,
      height: 80,
      margin: 5,
      borderRadius: 10,
    },
    heading: {
      fontSize: 18,
      fontWeight: "bold",
      textAlign: "center",
      marginVertical: 10,
    },
    subheading: {
      fontSize: 14,
      color: "#555",
      textAlign: "center",
      marginBottom: 20,
    },
    pagination: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 20,
    },
    dot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: "#ccc",
      marginHorizontal: 5,
    },
    activeDot: {
      backgroundColor: "#4CAF50",
    },
    button: {
      backgroundColor: "#5d4940",
      paddingVertical: 15,
      paddingHorizontal: 80,
      borderRadius: 30,
    },
    buttonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
    },

});


