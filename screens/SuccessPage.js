import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const SuccessPage = () => {
  const navigation = useNavigation();

  const navigateToHome = () => {
    navigation.navigate('HomeScreen'); // Assuming HomeScreen is named in the navigation stack
  };

  return (
    <View style={styles.container}>
      <View style={styles.circleIcon}>
        <Icon name="check" size={30} color="#fff" />
      </View>
      <Text style={styles.title}>Payment Received Successfully</Text>
      <Text style={styles.message}>
        Congratulations 🎉{'\n'}Your booking has been confirmed
      </Text>

      {/* "Back to Home" Button at bottom center */}
      <TouchableOpacity style={styles.button} onPress={navigateToHome}>
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f6ece5',
    paddingHorizontal: 20,
  },
  circleIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#5d4940',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginTop: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#5d4940',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SuccessPage;
