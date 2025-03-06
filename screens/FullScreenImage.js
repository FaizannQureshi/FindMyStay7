
import React, { useState } from "react";
import { View, Image, TouchableOpacity, StyleSheet, Alert, Text, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { getAuth } from "firebase/auth";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

const FullScreenImage = ({ route, navigation }) => {
  const { imageUri } = route.params;
  const [loading, setLoading] = useState(false);

  const handleRemoveImage = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;

    const storage = getStorage();
    const db = getFirestore();
    const imageRef = ref(storage, `profile_pictures/${user.uid}.jpg`);

    Alert.alert(
      "Remove Profile Picture",
      "Are you sure you want to remove your profile picture?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Remove",
          onPress: async () => {
            try {
              setLoading(true);

              await deleteObject(imageRef);

              const userDocRef = doc(db, "users", user.uid);
              await updateDoc(userDocRef, { photoURL: null });

              setLoading(false);
              Alert.alert("Success", "Profile picture removed successfully.");

              navigation.goBack();
            } catch (error) {
              setLoading(false);
              console.error("Error removing image:", error);
              Alert.alert("Error", "Failed to remove profile picture.");
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={30} color="#fff" />
      </TouchableOpacity>

      {imageUri ? (
        <>
          <Image source={{ uri: imageUri }} style={styles.fullImage} resizeMode="contain" />

          <TouchableOpacity style={styles.removeButton} onPress={handleRemoveImage} disabled={loading}>
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.removeText}>Remove Profile Picture</Text>
            )}
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.noImageText}>No profile picture selected.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  fullImage: {
    width: "100%",
    height: "100%",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1,
  },
  removeButton: {
    position: "absolute",
    bottom: 50,
    backgroundColor: "#ff4444",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  removeText: {
    color: "#fff",
    fontSize: 16,
  },
  noImageText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default FullScreenImage;
