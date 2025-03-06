import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import styles from '../styles/EditProfileStyles';

const LandlordEditProfilePage = ({ navigation, route }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [fullName, setFullName] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore();
    const currentUser = auth.currentUser;

    if (currentUser) {
      setUser(currentUser);
      const userDocRef = doc(db, 'users', currentUser.uid);

      getDoc(userDocRef).then((docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setProfileImage(userData.photoURL || null);
          setFullName(userData.fullName || '');
        }
      });
    }

    if (route.params?.profileImage) {
      setProfileImage(route.params.profileImage);
    }
  }, [route.params?.profileImage]);

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

      const db = getFirestore();
      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, { photoURL: downloadURL });

    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const updateProfile = async () => {
    if (!user) return;

    try {
      const db = getFirestore();
      const userDocRef = doc(db, 'users', user.uid);

      await updateDoc(userDocRef, { name:fullName });

      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Edit Profile</Text>
      </View>

      {/* Profile Picture */}
      <View style={styles.profilePicContainer}>
        <Image
          style={styles.profilePic}
          source={profileImage ? { uri: profileImage } : require('../Images/default.jpg')}
        />
        <TouchableOpacity style={styles.editIcon} onPress={pickImage}>
          <Icon name="edit" size={18} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Input Fields */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={fullName}
          onChangeText={(text) => setFullName(text)}
        />
      </View>

      {/* Update Button */}
      <TouchableOpacity style={styles.updateButton} onPress={updateProfile}>
        <Text style={styles.updateButtonText}>Update</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LandlordEditProfilePage;
