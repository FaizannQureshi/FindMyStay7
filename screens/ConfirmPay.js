import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  Keyboard,
  Platform,
} from 'react-native';
import { BlurView } from 'expo-blur';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";


const ConfirmPay = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [expiryDate, setExpiryDate] = useState('');
  const navigation = useNavigation(); // Add this line to get navigation


  const handlePayNow = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    Keyboard.dismiss();
  };

  const handleExpiryDateChange = (text) => {
    // Remove any non-numeric characters
    let formattedText = text.replace(/[^0-9]/g, '');

    // Insert slash between MM and YY
    if (formattedText.length > 2) {
      formattedText = `${formattedText.substring(0, 2)}/${formattedText.substring(2, 4)}`;
    }
    setExpiryDate(formattedText);
  };

  React.useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setIsKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return ( 
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Confirm & Pay</Text>
      </View>

      <View style={styles.propertyInfo}>
        <View style={styles.propertyImageContainer}>
          <Image
            source={{
              uri: 'https://i.pinimg.com/originals/c2/63/1d/c2631d34a86d55acf6daf0f5ff4cbd99.jpg',
            }}
            style={styles.propertyImage}
          />
        </View>
        <View style={styles.propertyDetails}>
          <Text style={styles.propertyName}>Zaviar Hostel</Text>
          <Text style={styles.propertyLocation}>G-10/ Islamabad</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>4.0 (115 Reviews)</Text>
          </View>
        </View>
      </View>

      <View style={styles.bookingDetails}>
        <View style={styles.bookingItem}>
          <Text style={styles.bookingLabel}>Dates</Text>
          <Text style={styles.bookingValue}>Oct 19, 2024 - Oct 20, 2024</Text>
        </View>
        <View style={styles.bookingItem}>
          <Text style={styles.bookingLabel}>Number of People</Text>
          <Text style={styles.bookingValue}>3</Text>
        </View>
        <View style={styles.bookingItem}>
          <Text style={styles.bookingLabel}>Number of Rooms</Text>
          <Text style={styles.bookingValue}>1</Text>
        </View>
      </View>

      <View style={styles.paymentOptions}>
        <Text style={styles.paymentLabel}>Payment Method</Text>
        <View style={styles.paymentMethods}>
          <TouchableOpacity style={styles.paymentMethod}>
            <Icon name="cc-visa" size={32} color="#1A73E8" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.paymentMethod}>
            <Icon name="cc-mastercard" size={32} color="#FF5F00" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.paymentMethod}>
            <Icon name="cc-paypal" size={32} color="#003087" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.paymentMethod}>
            <Icon name="google-wallet" size={32} color="#EA4335" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.priceDetails}>
        <View style={styles.priceItem}>
          <Text style={styles.priceLabel}>Price</Text>
          <Text style={styles.priceValue}>$360.00</Text>
        </View>
        <View style={styles.priceItem}>
          <Text style={styles.priceLabel}>Taxes & Fees</Text>
          <Text style={styles.priceValue}>$10.00</Text>
        </View>
        <View style={[styles.priceItem, styles.grandTotal]}>
          <Text style={styles.priceLabel}>Grand Total</Text>
          <Text style={styles.priceValue}>$370.00</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.payButton} onPress={handlePayNow}>
        <Text style={styles.payButtonText}>Next</Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent
        animationType="slide"
        onRequestClose={handleCloseModal}
      >
        <View style={[
          styles.modalContainer,
          isKeyboardVisible && styles.modalContainerKeyboard
        ]}>
          <BlurView
            style={styles.absolute}
            blurType="light"
            blurAmount={10}
            reducedTransparencyFallbackColor="white"
          />
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Card</Text>
            <TextInput
              placeholder="Card Number"
              placeholderTextColor="#7a7a7a"
              style={styles.input}
              keyboardType="numeric"
            />
            <TextInput
              placeholder="Card Holder Name"
              placeholderTextColor="#7a7a7a"
              style={styles.input}
              autoCapitalize="words"
            />
            <View style={styles.rowInputs}>
              <TextInput
                placeholder="Expiry Date"
                placeholderTextColor="#7a7a7a"
                style={[styles.input, styles.halfInput]}
                value={expiryDate}
                onChangeText={handleExpiryDateChange}
                maxLength={5}  // MM/YY
                keyboardType="numeric"
              />
              <TextInput
                placeholder="CVV"
                placeholderTextColor="#7a7a7a"
                style={[styles.input, styles.halfInput]}
                secureTextEntry
                keyboardType="numeric"
                maxLength={4}
              />
            </View>
            <TouchableOpacity style={styles.addButton} onPress={() => {
        setIsModalVisible(false);
        navigation.navigate('SuccessPage');
      }}>
              <Text style={styles.addButtonText}>Confirm Payment</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6ece5',
    paddingHorizontal: 20,
    paddingTop: 65,
  },
  absolute: {
    position: "relative",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  header: {
    marginBottom: 30,
    // flexDirection: 'row',
    alignItems: 'center',
    // flex:1,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    // paddingLeft: 80,
  },
  propertyInfo: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#e8e1dc',
    padding: 5,
    // borderCurve: 10,
    borderRadius: 10,
  },
  propertyImageContainer: {
    marginRight: 16,
  },
  propertyImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  propertyDetails: {
    flex: 1,
  },
  propertyName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    marginTop: 5,
  },
  propertyLocation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
  },
  bookingDetails: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
  },
  bookingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  bookingLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  bookingValue: {
    fontSize: 16,
  },
  paymentOptions: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
  },
  paymentLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  paymentMethods: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  paymentMethod: {
    padding: 8,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    alignItems: 'center',
  },
  priceDetails: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
  },
  priceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  priceLabel: {
    fontSize: 16,
  },
  priceValue: {
    fontSize: 16,
  },
  grandTotal: {
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 8,
    marginTop: 8,
  },
  payButton: {
    backgroundColor: '#5d4940',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    color: '#5d4940',
    backgroundColor: '#5d4940',
  },
  payButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContainerKeyboard: {
    justifyContent: 'center',
  },
  modalContent: {
    width: '100%',
    backgroundColor: 'rgb(255, 255, 255)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  rowInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  addButton: {
    backgroundColor: '#5d4940',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ConfirmPay;

