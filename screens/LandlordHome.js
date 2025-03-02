import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import styles from '../styles/LandlordHomeStyles';
import { useNavigation, useRoute } from "@react-navigation/native";
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';


const LandlordHome = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [userData, setUserData] = useState(null);

  // Fetch user data from Firebase
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDocRef = doc(db, 'users', route.params.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          setUserData(userDocSnap.data());
        } else {
          console.log('No such user found!');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (route.params?.uid) {
      fetchUserData();
    }
  }, [route.params?.uid]);

  const properties = [
    { id: 1, name: 'Zaviar Hostel For Boys', location: 'G-10/Islamabad', price: 'Rs 8000 /month', rating: 4.7, image: 'https://t4.ftcdn.net/jpg/02/19/66/93/360_F_219669327_v12pBKc7TB62E3uCJrgRRkDhfVENK3z5.jpg' },
    { id: 2, name: 'Khadija Hostel For Girls', location: 'H-12/Islamabad', price: 'Rs 5200 /month', rating: 4.5, image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/03/a9/c5/50/corner-hostel.jpg?w=700&h=-1&s=1' },
    { id: 3, name: 'Zakriya Hostel For Boys', location: 'I-8/Islamabad', price: 'Rs 6800 /month', rating: 4.2, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLtiZ6zRJsrGGgkxoHUIZiJG57Ff97KAqK5Q&s' },
    { id: 4, name: 'Ayesha Hostel For Girls', location: 'F-6/Islamabad', price: 'Rs 9700 /month', rating: 3.9, image: 'https://ameyawdebrah.com/wp-content/uploads/2023/04/nomads-brisbane-hostel-dorm.jpg' },
    { id: 5, name: 'City Madina Girls Hostel', location: 'F-10/Islamabad', price: 'Rs 7800 /month', rating: 4.3, image: 'https://img.freepik.com/premium-photo/hostel-bedroom-interior-generative-ai_874904-15953.jpg?semt=ais_hybrid' },
  ];

  const popularHostels = [
    { id: 1, name: 'Zainab Hostel For Girls', location: 'G-11/Islamabad', price: 'Rs 7500 /month', rating: 4.3, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlXDK_Svh57mfrTU2XTjWd5ELa6_sj1fbynw&s' },
    { id: 2, name: 'Grand Hostel For Boys', location: 'F-7/Islamabad', price: 'Rs 5600 /month', rating: 3.5, image: 'https://bnbwu.edu.pk/wp-content/uploads/2021/02/IMG_20210201_180023-1024x472.jpg' },
    { id: 3, name: 'Rumi One Hostel For Boys', location: 'H-13/Islamabad', price: 'Rs 7500 /month', rating: 4.6, image: 'https://images.olx.com.pk/thumbnails/383070125-800x600.jpeg' },
    { id: 4, name: 'Sadia Hostel For Girls', location: 'F-8/Islamabad', price: 'Rs 4500 /month', rating: 3.8, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw_X6TFOZK6nBu4a9sYAbNX2nrhJSW1ZDIUg&s' },
    { id: 5, name: 'Alpha One Hostel For Boys', location: 'H-13/Islamabad', price: 'Rs 6300 /month', rating: 4.6, image: 'https://hostelgeeks.com/wp-content/uploads/2016/04/hostel-room-types-dorms.jpg' },
  ];


  const PropertyCard = ({ property }) => (
    <View style={styles.card}>
      <Image source={{ uri: property.image }} style={styles.cardImage} />
      <TouchableOpacity style={styles.heartIcon}>
        <MaterialIcons name="favorite" size={24} color="red" />
      </TouchableOpacity>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{property.name}</Text>
        <Text style={styles.cardLocation}>{property.location}</Text>
        <View style={styles.cardFooter}>
          <Text style={styles.cardPrice}>{property.price}</Text>
          <Text style={styles.cardRating}>
            <Ionicons name="star" size={16} color="gold" /> {property.rating}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.location}>
          Welcome, {userData ? userData.name : 'Loading...'}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('LandlordNotifications')}>
          <Ionicons name="notifications-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Category Buttons */}
      <View style={styles.categories}>
        <TouchableOpacity style={[styles.categoryButton, styles.categoryButtonActive]}>
          <Text style={styles.categoryTextActive}>Hostel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryButton}>
          <Text style={styles.categoryText}>Homestay</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryButton}>
          <Text style={styles.categoryText}>Apart</Text>
        </TouchableOpacity>
      </View>

      {/* Properties Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>More Properties Like Yours</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          horizontal
          data={properties}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <PropertyCard property={item} />}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {/* Popular Hostels Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Hostels</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          horizontal
          data={popularHostels}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <PropertyCard property={item} />}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {/* Footer Button */}
      <TouchableOpacity style={styles.listButton} onPress={() => navigation.navigate('PropertyList')}>
        <Text style={styles.listButtonText}>List Your Property</Text>
      </TouchableOpacity>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home-outline" size={24} color="#5d4940" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="chatbubbles-outline" size={24} color="gray" />
          <Text style={styles.navText}>Your Personal AI</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('YourProperties')}>
          <Ionicons name="business-outline" size={24} color="gray" />
          <Text style={styles.navText}>Your Properties</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('LandlordProfile')}>
          <Ionicons name="person-outline" size={24} color="gray" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default LandlordHome;
