import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import styles from '../styles/BookingsStyles';

const BookingsPage = ({navigation}) => {
  const [tab, setTab] = useState('Upcoming'); // Tab state: 'Upcoming' or 'Past'

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bookings</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, tab === 'Upcoming' && styles.activeTab]}
          onPress={() => setTab('Upcoming')}
        >
          <Text style={[styles.tabText, tab === 'Upcoming' && styles.activeTabText]}>Upcoming</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, tab === 'Past' && styles.activeTab]}
          onPress={() => setTab('Past')}
        >
          <Text style={[styles.tabText, tab === 'Past' && styles.activeTabText]}>Past</Text>
        </TouchableOpacity>
      </View>

      {/* Bookings List */}
      <ScrollView style={styles.bookingsList}>
        {/* Example booking cards */}
        <View style={styles.bookingCard}>
          <Text style={styles.bookingId}>Booking ID: 22378965</Text>
          <Text style={styles.bookingDate}>Booking Date: April 26, 2023, 10:00 PM - 03:00 PM</Text>
          <View style={styles.bookingDetails}>
            <Image
              source={{ uri: 'https://thumbs.dreamstime.com/b/luxury-hotel-room-master-bedroom-creative-ai-design-background-instagram-facebook-wall-painting-photo-wallpaper-backgrounds-325040660.jpg' }}
              style={styles.bookingImage}
            />
            <View>
              <Text style={styles.bookingName}>Malon Greens</Text>
              <Text style={styles.bookingLocation}>📍 Mumbai, Maharashtra</Text>
              <Text style={styles.bookingRating}>⭐ 4.0 (115 Reviews)</Text>
            </View>
          </View>
          <View style={styles.bookingActions}>
            <TouchableOpacity style={styles.cancelButton}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.detailsButton}>
              <Text style={styles.detailsText}>View Details</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.bookingCard}>
          <Text style={styles.bookingId}>Booking ID: 90867891</Text>
          <Text style={styles.bookingDate}>Booking Date: April 30, 2023, 10:00 PM - 03:00 PM</Text>
          <View style={styles.bookingDetails}>
            <Image
              source={{ uri: 'https://hoteldel.com/wp-content/uploads/2021/01/hotel-del-coronado-views-suite-K1TOS1-K1TOJ1-1600x900-1.jpg' }}
              style={styles.bookingImage}
            />
            <View>
              <Text style={styles.bookingName}>Sabro Prime</Text>
              <Text style={styles.bookingLocation}>📍 Mumbai, Maharashtra</Text>
              <Text style={styles.bookingRating}>⭐ 4.0 (115 Reviews)</Text>
            </View>
          </View>
          <View style={styles.bookingActions}>
            <TouchableOpacity style={styles.cancelButton}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.detailsButton}>
              <Text style={styles.detailsText}>View Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default BookingsPage;
