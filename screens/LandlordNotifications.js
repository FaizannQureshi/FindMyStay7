import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import styles from '../styles/NotificationsStyles';
import { Ionicons } from '@expo/vector-icons';

const Notifications = ({navigation}) => {
  return (
    <ScrollView style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('LandlordHome')}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>

      {/* Notifications Section */}
      <Text style={styles.sectionTitle}>Today</Text>
      <View style={styles.notificationCard}>
        <View style={styles.iconContainer}>
          <Ionicons name="chatbubble-outline" size={24} color="#5d4940" />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.notificationTitle}>You have 4 new messages</Text>
          <Text style={styles.notificationSubtitle}>Jayant agent shared a message</Text>
        </View>
      </View>
      <View style={styles.notificationCard}>
        <Image
          source={{ uri: 'https://www.thehotelbedcompany.com/wp-content/uploads/2019/04/Bedroom-Moathouse-scaled.jpg' }}
          style={styles.notificationImage}
        />
        <View style={styles.textContainer}>
          <Text style={styles.notificationTitle}>You Saved “Malon Greens”</Text>
          <Text style={styles.notificationSubtitle}>Your just bookmarked</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Yesterday</Text>
      <View style={styles.notificationCard}>
        <View style={styles.iconContainer}>
          <Ionicons name="pricetag-outline" size={24} color="#5d4940" />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.notificationTitle}>Get 30% Off on first booking</Text>
          <Text style={styles.notificationSubtitle}>Special promotion only valid today</Text>
        </View>
      </View>
      <View style={styles.notificationCard}>
        <View style={styles.iconContainer}>
          <Ionicons name="lock-closed-outline" size={24} color="#5d4940" />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.notificationTitle}>Password Update Successful</Text>
          <Text style={styles.notificationSubtitle}>Your password update successfully</Text>
        </View>
      </View>
      <View style={styles.notificationCard}>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg' }}
          style={styles.notificationImage}
        />
        <View style={styles.textContainer}>
          <Text style={styles.notificationTitle}>You Saved “Peradise Mint”</Text>
          <Text style={styles.notificationSubtitle}>Your just bookmarked</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Notifications;
