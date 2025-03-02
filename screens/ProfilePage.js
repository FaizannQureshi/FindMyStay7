import React from "react";
import { View, Text, TouchableOpacity, Switch, Image, ScrollView} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import styles from "../styles/ProfilePageStyle";

const ProfilePage = ({navigation}) => {
  const [darkMode, setDarkMode] = React.useState(false);

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('HomeScreen')}
        >
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Profile</Text>
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkUBvvFmkFgqojBT8GXgGBKVaBiqEuBgC0Sg&s",
          }}
          style={styles.profileImage}
        />
        <View>
          <Text style={styles.profileName}>Faizan Qureshi</Text>
          <Text style={styles.profileEmail}>faizan@gmail.com</Text>
        </View>
        <TouchableOpacity style={styles.editIcon} onPress={() => navigation.navigate('EditProfile')}>
          <Icon name="edit" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Menu Items */}
      <View style={styles.menu}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('EditProfile')}
        >
          <View style={styles.menuRow}>
            <Icon name="person" size={24} color="#000" />
            <Text style={styles.menuText}>Edit Profile</Text>
          </View>
          <Icon name="chevron-right" size={24} color="#aaa" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuRow}>
            <Icon name="lock" size={24} color="#000" />
            <Text style={styles.menuText}>Change Password</Text>
          </View>
          <Icon name="chevron-right" size={24} color="#aaa" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuRow}>
            <Icon name="credit-card" size={24} color="#000" />
            <Text style={styles.menuText}>Payment Method</Text>
          </View>
          <Icon name="chevron-right" size={24} color="#aaa" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('Bookings')}
        >
          <View style={styles.menuRow}>
            <Icon name="receipt" size={24} color="#000" />
            <Text style={styles.menuText}>My Bookings</Text>
          </View>
          <Icon name="chevron-right" size={24} color="#aaa" />
        </TouchableOpacity>

        <View style={styles.menuItem}>
          <View style={styles.menuRow}>
            <Icon name="visibility" size={24} color="#000" />
            <Text style={styles.menuText}>Dark Mode</Text>
          </View>
          <Switch
            value={darkMode}
            onValueChange={(value) => setDarkMode(value)}
          />
        </View>

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuRow}>
            <Icon name="policy" size={24} color="#000" />
            <Text style={styles.menuText}>Privacy Policy</Text>
          </View>
          <Icon name="chevron-right" size={24} color="#aaa" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuRow}>
            <Icon name="description" size={24} color="#000" />
            <Text style={styles.menuText}>Terms & Conditions</Text>
          </View>
          <Icon name="chevron-right" size={24} color="#aaa" />
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('HomeScreen')}>
          <Icon name="home" size={24} color="#aaa" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Icon name="person" size={24} color="#aaa" />
          <Text style={[styles.navText, styles.NavText]}>Your Personal AI</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Bookings')}>
          <Icon name="receipt" size={24} color="#aaa" />
          <Text style={[styles.navText, styles.NavText]}>Your Bookings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Icon name="account-circle" size={24} color="#5d4940" />
          <Text style={[styles.navText, styles.activeNavText]}>Profile</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfilePage;
