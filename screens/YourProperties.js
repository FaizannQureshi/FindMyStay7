import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, ActivityIndicator, Switch } from 'react-native';
import { getAuth } from 'firebase/auth';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import styles from '../styles/BookingsStyles';

const YourProperties = ({ navigation }) => {
  const [tab, setTab] = useState('Upcoming'); // 'Upcoming' or 'Past'
  const [activeProperties, setActiveProperties] = useState([]);
  const [pastProperties, setPastProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const auth = getAuth();
        const user = auth.currentUser;
  
        if (!user) {
          alert('You must be logged in to view your properties.');
          setLoading(false);
          return;
        }
  
        const propertiesRef = collection(db, 'properties');
        const q = query(propertiesRef, where('userID', '==', user.uid));
        const querySnapshot = await getDocs(q);
  
        const properties = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
  
        // ✅ Keep both active and inactive properties in `activeProperties`
        setActiveProperties(properties.filter((p) => p.status === 'active' || p.status === 'inactive'));
  
        // ✅ Past properties should still only include deleted properties
        setPastProperties(properties.filter((p) => p.status === 'deleted'));
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProperties();
  }, []);

  // ✅ Toggle Active/Inactive Status
  const toggleStatus = async (propertyId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    try {
      const propertyRef = doc(db, 'properties', propertyId);
      await updateDoc(propertyRef, { status: newStatus });
  
      setActiveProperties((prev) =>
        prev.map((prop) =>
          prop.id === propertyId ? { ...prop, status: newStatus } : prop
        )
      );
    } catch (error) {
      console.error('Error updating property status:', error);
      alert('Failed to update status. Please try again.');
    }
  };

  // ✅ Cancel Property (Set to Deleted)
  const handleCancel = async (propertyId) => {
    try {
      const propertyRef = doc(db, 'properties', propertyId);
      await updateDoc(propertyRef, { status: 'deleted' });

      const cancelledProperty = activeProperties.find((p) => p.id === propertyId);

      setActiveProperties((prev) => prev.filter((p) => p.id !== propertyId));
      if (cancelledProperty) {
        setPastProperties((prev) => [...prev, { ...cancelledProperty, status: 'deleted' }]);
      }
    } catch (error) {
      console.error('Error cancelling property:', error);
      alert('Failed to cancel the property.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('LandlordHome')}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Properties</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, tab === 'Upcoming' && styles.activeTab]}
          onPress={() => setTab('Upcoming')}
        >
          <Text style={[styles.tabText, tab === 'Upcoming' && styles.activeTabText]}>Active Properties</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, tab === 'Past' && styles.activeTab]}
          onPress={() => setTab('Past')}
        >
          <Text style={[styles.tabText, tab === 'Past' && styles.activeTabText]}>Past Properties</Text>
        </TouchableOpacity>
      </View>

      {/* Loading Indicator */}
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" style={{ marginTop: 20 }} />
      ) : (
        <ScrollView style={styles.bookingsList}>
          {(tab === 'Upcoming' ? activeProperties : pastProperties).map((property) => (
            <View key={property.id} style={styles.bookingCard}>
              <Text style={styles.bookingId}>Property ID: {property.id}</Text>
              <Text style={styles.bookingDate}>Upload Date: {property.timestamp?.toDate().toLocaleDateString() || 'N/A'}</Text>
              <View style={styles.bookingDetails}>
                <Image source={{ uri: property.propertyImages?.[0] }} style={styles.bookingImage} />
                <View>
                  <Text style={styles.bookingName}>{property.propertyTitle}</Text>
                  <Text style={styles.bookingLocation}>📍 {property.location}</Text>
                </View>
              </View>

              {/* Toggle Switch to Activate/Deactivate */}
              {tab === 'Upcoming' && (
                <View style={styles.toggleContainer}>
                  <Text style={styles.toggleLabel}>
                    {property.status === 'active' ? 'Active' : 'Inactive'}
                  </Text>
                  <Switch
                    value={property.status === 'active'}
                    onValueChange={() => toggleStatus(property.id, property.status)}
                  />
                </View>
              )}

              {/* Action Buttons */}
              <View style={styles.bookingActions}>
                {tab === 'Upcoming' && (
                  <TouchableOpacity style={styles.cancelButton} onPress={() => handleCancel(property.id)}>
                    <Text style={styles.cancelText}>Cancel</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity style={styles.detailsButton}>
                  <Text style={styles.detailsText}>View Details</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default YourProperties;
