import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../styles/EditProfileStyles';


const EditProfilePage = ({ navigation }) => {
  const [gender, setGender] = useState('Male');

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Edit Profile</Text>
      </View>

      {/* Profile Picture */}
      <View style={styles.profilePicContainer}>
        <Image
          style={styles.profilePic}
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkUBvvFmkFgqojBT8GXgGBKVaBiqEuBgC0Sg&s', // Replace with the actual image URL
          }}
        />
        <TouchableOpacity style={styles.editIcon}>
          <Icon name="edit" size={18} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Input Fields */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.input} placeholder="Faizan Qureshi" />

        <Text style={styles.label}>Email Address</Text>
        <TextInput style={styles.input} placeholder="faizan@gmail.com" keyboardType="email-address" />

        <Text style={styles.label}>Mobile Number</Text>
        <TextInput style={styles.input} placeholder="(209) 555-0104" keyboardType="phone-pad" />

        <Text style={styles.label}>Date of Birth</Text>
        <View style={styles.dateInputContainer}>
          <TextInput style={[styles.input, styles.dateInput]} placeholder="August 14, 2023" />
          <Icon name="calendar-today" size={20} color="#666" />
        </View>
      </View>

      {/* Gender Selection */}
      <Text style={styles.genderLabel}>Gender</Text>
      <View style={styles.genderContainer}>
        <TouchableOpacity
          style={styles.genderOption}
          onPress={() => setGender('Male')}
        >
          <View style={[styles.radioButton, gender === 'Male' && styles.radioButtonSelected]} />
          <Text style={styles.genderText}>Male</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.genderOption}
          onPress={() => setGender('Female')}
        >
          <View style={[styles.radioButton, gender === 'Female' && styles.radioButtonSelected]} />
          <Text style={styles.genderText}>Female</Text>
        </TouchableOpacity>
      </View>

      {/* Update Button */}
      <TouchableOpacity style={styles.updateButton}>
        <Text style={styles.updateButtonText}>Update</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditProfilePage;
