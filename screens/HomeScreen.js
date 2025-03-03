import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, Modal, View, Text, Button } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet } from 'react-native';
import { Alert, TextInput } from 'react-native';
import PropertyCard from "../screens/PropertyCard";
import {
  Container,
  Header,
  LocationRow,
  LocationText,
  BellIcon,
  Categories,
  Category,
  CategoryText,
  Section,
  SectionHeader,
  SectionHeaderText,
  SeeAll,
  Card,
  CardImage,
  CardContent,
  CardTitle,
  CardSubtitle,
  CardFooter,
  CardPrice,
  BottomNav,
  NavItem,
  NavText,
} from '../styles/HomeScreenStyles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  map: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalContent: {
    width: '90%',
    height: '60%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
  },
});

const HomeScreen = ({ navigation, route }) => {
  const [userData, setUserData] = useState(null);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [manualAddress, setManualAddress] = useState('');
  const [suggestions, setSuggestions] = useState([]); // Empty array
  const [selectedLocation, setSelectedLocation] = useState({
    latitude: 33.6844, // Default (Islamabad)
    longitude: 73.0479,
  });
  const [selectedCategory, setSelectedCategory] = useState('Hostel');

  const fetchLocationName = async (latitude, longitude) => {
    try {
      const apiKey = 'pk.28ffc3665f759f380fc24a0533bb4b41';
      const response = await fetch(
        `https://us1.locationiq.com/v1/reverse.php?key=${apiKey}&lat=${latitude}&lon=${longitude}&format=json`
      );
      const data = await response.json();

      // Extract city, state, and country for a 3-part address
      const city = data.address.city || data.address.town || data.address.village || data.address.suburb;
      const state = data.address.state || data.address.county;
      const country = data.address.country;

      // Combine three parts (city, state, country) if available
      return [city, state, country].filter(Boolean).join(', ') || 'Unknown Location';
    } catch (error) {
      console.error('Error fetching location name:', error);
      return 'Unknown Location';
    }
  };

  const fetchLocationFromAddress = async (address) => {
    try {
      const apiKey = 'pk.28ffc3665f759f380fc24a0533bb4b41'; // LocationIQ API Key
      const response = await fetch(
        `https://us1.locationiq.com/v1/search.php?key=${apiKey}&q=${encodeURIComponent(address)}&format=json`
      );
      const data = await response.json();

      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        setSelectedLocation({
          latitude: parseFloat(lat),
          longitude: parseFloat(lon),
        });
      } else {
        Alert.alert('Error', 'No location found for the provided address.');
      }
    } catch (error) {
      console.error('Error fetching location from address:', error);
      Alert.alert('Error', 'Failed to fetch location from address.');
    }
  };

  const fetchLocationSuggestions = async (query) => {
    try {
      const apiKey = 'pk.28ffc3665f759f380fc24a0533bb4b41';
      const response = await fetch(
        `https://us1.locationiq.com/v1/autocomplete.php?key=${apiKey}&q=${encodeURIComponent(query)}&limit=5&countrycodes=PK&format=json`
      );
      const data = await response.json();
      setSuggestions(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching location suggestions:', error);
      setSuggestions([]);
    }
  };

  // Fetch user data based on UID passed from handleLogin
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDocRef = doc(db, 'users', route.params.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const data = userDocSnap.data();
          if (data.location) {
            const locationName = await fetchLocationName(
              data.location.latitude,
              data.location.longitude
            );
            setUserData({ ...data, locationName });
          } else {
            setUserData(data);
          }
        } else {
          console.error('No such user document!');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (route?.params?.uid) {
      fetchUserData();
    }
  }, [route?.params?.uid]);

  // Prompt user to set location after 3 seconds if not set
  useEffect(() => {
    if (userData && !userData.location) {
      const timer = setTimeout(() => {
        Alert.alert(
          'Set Your Location',
          'Please input your location to get better recommendations.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Set Location', onPress: () => setShowLocationModal(true) },
          ],
          { cancelable: true }
        );
      }, 3000); // 3 seconds delay

      return () => clearTimeout(timer); // Cleanup on unmount
    }
  }, [userData]);

  const handleLocationSave = async () => {
    try {
      const userDocRef = doc(db, 'users', route.params.uid);
      await updateDoc(userDocRef, { location: selectedLocation });

      const locationName = await fetchLocationName(
        selectedLocation.latitude,
        selectedLocation.longitude
      );

      setUserData((prev) => ({ ...prev, location: selectedLocation, locationName }));
      setShowLocationModal(false);
    } catch (error) {
      console.error('Error saving location:', error);
    }
  };

  return (
    <Container>
      <ScrollView>
        <Header>
          <LocationRow>
            <TouchableOpacity onPress={() => setShowLocationModal(true)} style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name="location-on" size={22} color="#5D4940" style={{ marginRight: 4 }} />
              <View>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                  {userData?.locationName?.split(', ')[0] || 'City'}
                </Text>
                <Text style={{ fontSize: 12, color: '#666' }}>
                  {userData?.locationName?.split(', ').slice(1).join(', ') || 'State, Country'}
                </Text>
              </View>
            </TouchableOpacity>
          </LocationRow>

          <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
            <BellIcon>
              <Icon name="notifications-none" size={24} color="#000" />
            </BellIcon>
          </TouchableOpacity>
        </Header>

        {/* Location Modal */}
        <Modal visible={showLocationModal} animationType="slide" transparent>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Your Location</Text>

              {/* Manual Address Input */}
              <TextInput
                placeholder="Enter your location (e.g., Multan, Pakistan)"
                value={manualAddress}
                onChangeText={(text) => {
                  setManualAddress(text);
                  if (text.length > 2) {
                    fetchLocationSuggestions(text); // Fetch suggestions after 2 chars
                  } else {
                    setSuggestions([]); // Clear suggestions if text is short
                  }
                }}
                style={{
                  borderWidth: 1,
                  borderColor: '#ccc',
                  borderRadius: 8,
                  padding: 10,
                  marginBottom: 5,
                }}
              />
              {/* Suggestions Dropdown */}
              {Array.isArray(suggestions) && suggestions.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setManualAddress(item.display_name);
                    setSelectedLocation({
                      latitude: parseFloat(item.lat),
                      longitude: parseFloat(item.lon),
                    });
                    setSuggestions([]); // Clear dropdown after selection
                  }}
                  style={{
                    backgroundColor: '#f0f0f0',
                    padding: 10,
                    borderBottomWidth: 1,
                    borderColor: '#ddd',
                  }}
                >
                  <Text>{item.display_name}</Text>
                </TouchableOpacity>
              ))}
              <Button
                title="Find Location"
                onPress={() => {
                  if (manualAddress.trim() !== '') {
                    fetchLocationFromAddress(manualAddress);
                  } else {
                    Alert.alert('Error', 'Please enter an address.');
                  }
                }}
              />

              {/* Map View */}
              <MapView
                style={styles.map}
                region={{
                  latitude: selectedLocation.latitude,
                  longitude: selectedLocation.longitude,
                  latitudeDelta: 0.05,
                  longitudeDelta: 0.05,
                }}
                onPress={(e) => setSelectedLocation(e.nativeEvent.coordinate)}
              >
                <Marker coordinate={selectedLocation} />
              </MapView>

              {/* Save/Cancel Buttons */}
              <Button
                title={userData && userData.location ? 'Update Location' : 'Save Location'}
                onPress={handleLocationSave}
              />
              <Button title="Cancel" onPress={() => setShowLocationModal(false)} />
            </View>
          </View>
        </Modal>

        {/* Categories */}
        <Categories>
          <Category selected={selectedCategory === 'Hostel'} onPress={() => setSelectedCategory('Hostel')}>
            <Icon name="home" size={24} color={selectedCategory === 'Hostel' ? "#fff" : "#666"} />
            <CategoryText selected={selectedCategory === 'Hostel'}>Hostel</CategoryText>
          </Category>
          <Category selected={selectedCategory === 'Homestay'} onPress={() => setSelectedCategory('Homestay')}>
            <Icon name="holiday-village" size={24} color={selectedCategory === 'Homestay' ? "#fff" : "#666"} />
            <CategoryText selected={selectedCategory === 'Homestay'}>Homestay</CategoryText>
          </Category>
          <Category selected={selectedCategory === 'Apartment'} onPress={() => setSelectedCategory('Apartment')}>
            <Icon name="apartment" size={24} color={selectedCategory === 'Apartment' ? "#fff" : "#666"} />
            <CategoryText selected={selectedCategory === 'Apartment'}>Apartment</CategoryText>
          </Category>
          <Category selected={selectedCategory === 'Hotel'} onPress={() => setSelectedCategory('Hotel')}>
            <Icon name="hotel" size={24} color={selectedCategory === 'Hotel' ? "#fff" : "#666"} />
            <CategoryText selected={selectedCategory === 'Hotel'}>Hotel</CategoryText>
          </Category>
        </Categories>

        {/* PropertyCard component - now with category filtering */}
        <PropertyCard 
          navigation={navigation} 
          category={selectedCategory}
        />

        {/* Bottom Navigation */}
        <BottomNav>
          <NavItem onPress={() => navigation.navigate('Home')}>
            <Icon name="home" size={24} color="#5d4940" />
            <NavText>Home</NavText>
          </NavItem>
          <NavItem>
            <Icon name="person" size={24} color="#666" />
            <NavText>Your Personal AI</NavText>
          </NavItem>
          <NavItem onPress={() => navigation.navigate('Bookings')}>
            <Icon name="receipt" size={24} color="#666" />
            <NavText>Your Bookings</NavText>
          </NavItem>
          <NavItem onPress={() => navigation.navigate('ProfilePage')}>
            <Icon name="account-circle" size={24} color="#666" />
            <NavText>Profile</NavText>
          </NavItem>
        </BottomNav>
      </ScrollView>
    </Container>
  );
};

export default HomeScreen;