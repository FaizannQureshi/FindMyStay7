import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { styles } from "../styles/welstyles";
import { useNavigation } from "@react-navigation/native";

const images = [
  require("../Images/img1.jpg"),
  require("../Images/img2.jpg"),
  require("../Images/img3.jpg"),
  require("../Images/img5.jpg"),
  require("../Images/img6.jpg"),
  require("../Images/img7.jpg"),
  require("../Images/img8.jpg"),
  require("../Images/img9.jpg"),
];

const Welcome = ({navigation}) => {
  return (
    <View style={styles.container}>
      {/* Logo */}
      <Text style={styles.title}>FindMyStay</Text>

      {/* Image Grid */}
      <View style={styles.imageGrid}>
        {images.map((img, index) => (
          <Image key={index} source={img} style={styles.image} />
        ))}
      </View>

      {/* Text Section */}
      <Text style={styles.heading}>
        Let’s Find Your Sweet & Dream Place with
      </Text>
      <Text style={styles.subheading}>
        Get the opportunity to stay that you dream of at an affordable price
      </Text>

      {/* Button */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.buttonText}>Let’s Go</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Welcome;
