import React, { useState } from 'react';
import { ScrollView, Modal, View, TouchableOpacity, Text, StyleSheet, Linking, FlatList } from 'react-native';
import { BlurView } from 'expo-blur';
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  ScrollViewStyled,
  Header,
  BackButton,
  OptionsButton,
  Features,
  HeaderTitle,
  ImageStyled,
  FeatureItem,
  FeatureText,
  Details,
  TitleRow,
  Title,
  Price,
  Subtitle,
  DescriptionHeading,
  Description,
  PreviewSection,
  Button,
  ButtonSecondary,
  ButtonText,
  SectionHeading,
  ButtonsRow,
} from '../styles/PropertyDetailStylesUser';
import { useNavigation } from "@react-navigation/native";

const PropertyDetail = ({ route, navigation }) => {
  // Get property from route params
  const property = route.params?.property || {};
  
  // States for modals and selections
  const [isBookingModalVisible, setBookingModalVisible] = useState(false);
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedRoomType, setSelectedRoomType] = useState(null);
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [numberOfRooms, setNumberOfRooms] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Find the lowest priced room
  const getLowestPrice = () => {
    if (!property.pricing || property.pricing.length === 0) return 'Price not available';
    const lowestPriceObj = property.pricing.reduce((min, room) => 
      (parseInt(room.price) < parseInt(min.price)) ? room : min, property.pricing[0]);
    return `Rs ${lowestPriceObj.price} /month`;
  };

  // Open map with the location
  const openMap = () => {
    const scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';
    const url = Platform.OS === 'ios' 
      ? `${scheme}?q=${property.latitude},${property.longitude}` 
      : `${scheme}${property.latitude},${property.longitude}`;
    Linking.openURL(url);
  };

  // Toggle booking details modal
  const toggleBookingModal = () => {
    setBookingModalVisible(!isBookingModalVisible);
  };

  // Toggle calendar modal
  const toggleCalendar = () => {
    setCalendarVisible(!isCalendarVisible);
  };

  // Handle date selection
  const handleDateSelect = (day) => {
    const newSelectedDates = [...selectedDates];
    const dateIndex = newSelectedDates.indexOf(day.dateString);

    if (dateIndex > -1) {
      newSelectedDates.splice(dateIndex, 1);
    } else {
      newSelectedDates.push(day.dateString);
    }

    setSelectedDates(newSelectedDates);
  };

  // Handle room type selection
  const handleRoomTypeSelect = (roomType) => {
    setSelectedRoomType(roomType);
  };

  // Toggle add-on selection
  const toggleAddOn = (addOn) => {
    const isSelected = selectedAddOns.some(item => item.type === addOn.type);
    if (isSelected) {
      setSelectedAddOns(selectedAddOns.filter(item => item.type !== addOn.type));
    } else {
      setSelectedAddOns([...selectedAddOns, addOn]);
    }
  };

  // Proceed to date selection
  const proceedToDateSelection = () => {
    if (selectedRoomType) {
      setBookingModalVisible(false);
      setCalendarVisible(true);
    } else {
      // Show some error that room type must be selected
      alert('Please select a room type');
    }
  };

  // Proceed to confirm payment
  const proceedToConfirmPay = () => {
    if (selectedDates.length > 0) {
      // Create booking details to pass to ConfirmPay
      const bookingDetails = {
        property: property,
        roomType: selectedRoomType,
        numberOfRooms: numberOfRooms,
        addOns: selectedAddOns,
        dates: selectedDates,
        totalPrice: calculateTotalPrice()
      };
      
      setCalendarVisible(false);
      navigation.navigate('ConfirmPay', { bookingDetails });
    } else {
      alert('Please select at least one date');
    }
  };

  // Calculate total price
  const calculateTotalPrice = () => {
    let total = 0;
    if (selectedRoomType) {
      total += parseInt(selectedRoomType.price) * numberOfRooms;
    }
    selectedAddOns.forEach(addOn => {
      total += parseInt(addOn.price);
    });
    return total;
  };

  return (
    <>
      <ScrollViewStyled>
        {/* Header */}
        <Header>
          <BackButton onPress={() => navigation.goBack()}>
            <Icon name="arrow-back-ios" size={24} color="#000" />
          </BackButton>
          <HeaderTitle>Property Detail</HeaderTitle>
          <OptionsButton>
            <Icon name="more-vert" size={24} color="#000" />
          </OptionsButton>
        </Header>
        

        {/* Property Images */}
        {property.propertyImages && property.propertyImages.length > 0 ? (
          <View>
            <Text>
              {console.log("Property Images:", property.propertyImages)}
            </Text>
            
            <FlatList
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={true}
              data={property.propertyImages}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <ImageStyled source={{ uri: item }} />
              )}
              onViewableItemsChanged={({ viewableItems }) => {
                if (viewableItems.length > 0) {
                  setCurrentImageIndex(viewableItems[0].index);
                }
              }}
            />
            {/* Image pagination indicators */}
            <View style={styles.paginationContainer}>
              {property.propertyImages.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.paginationDot,
                    { backgroundColor: index === currentImageIndex ? '#5d4940' : '#ccc' }
                  ]}
                />
              ))}
            </View>
          </View>
        ) : (
          <ImageStyled
            source={{
              uri: 'https://t4.ftcdn.net/jpg/02/19/66/93/360_F_219669327_v12pBKc7TB62E3uCJrgRRkDhfVENK3z5.jpg'
            }}
          />
        )}

        {/* Property Title and Price */}
        <Details>
          <TitleRow>
            <Title>{property.propertyTitle || 'Property Title Not Available'}</Title>
          </TitleRow>
          <TitleRow>
            <Price>{getLowestPrice()}</Price>
          </TitleRow>
          
          {/* Location with map link */}
          <TouchableOpacity onPress={openMap}>
            <Subtitle>
              <Icon name="location-on" size={16} color="#666" />
              {property.location || 'Location not available'}
            </Subtitle>
          </TouchableOpacity>
          
          {/* Description */}
          <DescriptionHeading>Description</DescriptionHeading>
          <Description>
            {property.description || 'No description available for this property.'}
          </Description>
        </Details>

        {/* Facilities */}
        <PreviewSection>
          <SectionHeading>Facilities</SectionHeading>
          <Features>
            {property.facilities && Object.entries(property.facilities).map(([key, value]) => {
              if (typeof value === 'boolean' && value) {
                let iconName = 'check-circle';
                switch (key) {
                  case 'cctv': iconName = 'videocam'; break;
                  case 'kitchen': iconName = 'restaurant'; break;
                  case 'laundry': iconName = 'local-laundry-service'; break;
                  case 'mess': iconName = 'fastfood'; break;
                  case 'security': iconName = 'security'; break;
                  case 'transport': iconName = 'directions-bus'; break;
                  default: iconName = 'check-circle';
                }
                return (
                  <FeatureItem key={key}>
                    <Icon name={iconName} size={20} color="#000" />
                    <FeatureText>{key.charAt(0).toUpperCase() + key.slice(1)}</FeatureText>
                  </FeatureItem>
                );
              }
              return null;
            })}
            {property.floors && (
              <FeatureItem>
                <Icon name="layers" size={20} color="#000" />
                <FeatureText>{property.floors} Floors</FeatureText>
              </FeatureItem>
            )}
          </Features>
        </PreviewSection>

        {/* Room Types */}
        <PreviewSection>
          <SectionHeading>Room Types</SectionHeading>
          {property.pricing && property.pricing.map((room, index) => (
            <View key={index} style={styles.roomTypeContainer}>
              <Text style={styles.roomTypeTitle}>
                {room.type.charAt(0).toUpperCase() + room.type.slice(1)} Room
              </Text>
              <Text style={styles.roomTypePrice}>Rs {room.price} /month</Text>
              <Text style={styles.roomTypeQuantity}>Available: {room.quantity}</Text>
              
              {/* Room Images */}
              {room.images && room.images.length > 0 && (
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={room.images}
                  keyExtractor={(item, index) => `${room.type}-${index}`}
                  renderItem={({ item }) => (
                    <View style={styles.roomImageContainer}>
                      <ImageStyled 
                        source={{ uri: item }} 
                        style={styles.roomImage}
                      />
                    </View>
                  )}
                />
              )}
            </View>
          ))}
        </PreviewSection>

        {/* Add-ons */}
        {property.addOns && property.addOns.length > 0 && (
          <PreviewSection>
            <SectionHeading>Additional Services</SectionHeading>
            {property.addOns.map((addon, index) => (
              <View key={index} style={styles.addOnContainer}>
                <Text style={styles.addOnTitle}>
                  {addon.type.charAt(0).toUpperCase() + addon.type.slice(1)}
                </Text>
                <Text style={styles.addOnPrice}>
                  Rs {addon.price} {addon.priceType}
                </Text>
              </View>
            ))}
          </PreviewSection>
        )}

        {/* Action Buttons */}
        <ButtonsRow>
          <Button onPress={toggleBookingModal}>
            <ButtonText>Book Now</ButtonText>
          </Button>
          <ButtonSecondary onPress={() => {}}>
            <ButtonText>Virtual Tour</ButtonText>
          </ButtonSecondary>
        </ButtonsRow>
      </ScrollViewStyled>

      {/* Booking Details Modal */}
      {isBookingModalVisible && (
        <Modal transparent animationType="fade" visible={isBookingModalVisible}>
          <BlurView intensity={50} style={StyleSheet.absoluteFill}>
            <View style={styles.modalContainer}>
              <View style={styles.bookingBox}>
                <View style={styles.modalHeader}>
                  <Text style={styles.headerText}>Booking Details</Text>
                  <TouchableOpacity onPress={toggleBookingModal}>
                    <Icon name="close" size={24} color="#000" />
                  </TouchableOpacity>
                </View>

                {/* Room Type Selection */}
                <View style={styles.sectionContainer}>
                  <Text style={styles.sectionLabel}>Select Room Type</Text>
                  {property.pricing && property.pricing.map((room, index) => (
                    <TouchableOpacity 
                      key={index} 
                      style={[
                        styles.selectionItem,
                        selectedRoomType && selectedRoomType.type === room.type ? styles.selectedItem : {}
                      ]}
                      onPress={() => handleRoomTypeSelect(room)}
                    >
                      <Text style={styles.selectionTitle}>
                        {room.type.charAt(0).toUpperCase() + room.type.slice(1)} Room
                      </Text>
                      <Text style={styles.selectionPrice}>Rs {room.price} /month</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* Number of Rooms */}
                <View style={styles.sectionContainer}>
                  <Text style={styles.sectionLabel}>Number of Rooms</Text>
                  <View style={styles.controlContainer}>
                    <TouchableOpacity 
                      onPress={() => setNumberOfRooms(Math.max(1, numberOfRooms - 1))}
                      style={styles.controlButton}
                    >
                      <Icon name="remove" size={24} color="#000" />
                    </TouchableOpacity>
                    <Text style={styles.controlValue}>{numberOfRooms}</Text>
                    <TouchableOpacity 
                      onPress={() => setNumberOfRooms(numberOfRooms + 1)}
                      style={styles.controlButton}
                    >
                      <Icon name="add" size={24} color="#000" />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Add-ons Selection */}
                {property.addOns && property.addOns.length > 0 && (
                  <View style={styles.sectionContainer}>
                    <Text style={styles.sectionLabel}>Select Add-ons</Text>
                    {property.addOns.map((addon, index) => (
                      <TouchableOpacity 
                        key={index} 
                        style={[
                          styles.selectionItem,
                          selectedAddOns.some(item => item.type === addon.type) ? styles.selectedItem : {}
                        ]}
                        onPress={() => toggleAddOn(addon)}
                      >
                        <Text style={styles.selectionTitle}>
                          {addon.type.charAt(0).toUpperCase() + addon.type.slice(1)}
                        </Text>
                        <Text style={styles.selectionPrice}>
                          Rs {addon.price} {addon.priceType}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}

                <TouchableOpacity style={styles.actionButton} onPress={proceedToDateSelection}>
                  <Text style={styles.actionButtonText}>Next</Text>
                </TouchableOpacity>
              </View>
            </View>
          </BlurView>
        </Modal>
      )}

      {/* Calendar Modal */}
      {isCalendarVisible && (
        <Modal transparent animationType="fade" visible={isCalendarVisible}>
          <BlurView intensity={50} style={StyleSheet.absoluteFill}>
            <View style={styles.modalContainer}>
              <View style={styles.calendarBox}>
                <View style={styles.modalHeader}>
                  <Text style={styles.headerText}>Select Dates</Text>
                  <TouchableOpacity onPress={toggleCalendar}>
                    <Icon name="close" size={24} color="#000" />
                  </TouchableOpacity>
                </View>

                <Calendar
                  onDayPress={handleDateSelect}
                  markedDates={{
                    ...selectedDates.reduce((acc, date) => {
                      acc[date] = {
                        selected: true,
                        marked: true,
                        selectedColor: '#5d4940',
                      };
                      return acc;
                    }, {}),
                  }}
                  theme={{
                    arrowColor: '#5d4940',
                    todayTextColor: '#5d4940',
                    selectedDayBackgroundColor: '#5d4940',
                    selectedDayTextColor: '#fff',
                    textDayFontSize: 16,
                    textMonthFontWeight: 'bold',
                  }}
                />

                {/* Summary of selection */}
                <View style={styles.summaryContainer}>
                  <Text style={styles.summaryTitle}>Booking Summary</Text>
                  <Text style={styles.summaryItem}>
                    Room Type: {selectedRoomType ? selectedRoomType.type.charAt(0).toUpperCase() + selectedRoomType.type.slice(1) : 'None'}
                  </Text>
                  <Text style={styles.summaryItem}>Number of Rooms: {numberOfRooms}</Text>
                  <Text style={styles.summaryItem}>Selected Dates: {selectedDates.length}</Text>
                  {selectedAddOns.length > 0 && (
                    <Text style={styles.summaryItem}>
                      Add-ons: {selectedAddOns.map(addon => addon.type.charAt(0).toUpperCase() + addon.type.slice(1)).join(', ')}
                    </Text>
                  )}
                  {/* <Text style={styles.summaryTotal}>Total: Rs {calculateTotalPrice()}</Text> */}
                </View>

                <TouchableOpacity style={styles.actionButton} onPress={proceedToConfirmPay}>
                  <Text style={styles.actionButtonText}>Book Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          </BlurView>
        </Modal>
      )}
    </>
  );
};

export default PropertyDetail;

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  bookingBox: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    maxHeight: '80%',
  },
  calendarBox: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionContainer: {
    marginBottom: 15,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  selectionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 8,
  },
  selectedItem: {
    borderColor: '#5d4940',
    backgroundColor: 'rgba(93, 73, 64, 0.1)',
  },
  selectionTitle: {
    fontSize: 15,
  },
  selectionPrice: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  controlContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 8,
  },
  controlButton: {
    padding: 5,
  },
  controlValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 20,
  },
  actionButton: {
    backgroundColor: '#5d4940',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  summaryContainer: {
    marginTop: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  summaryItem: {
    fontSize: 14,
    marginBottom: 5,
  },
  summaryTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  roomTypeContainer: {
    marginBottom: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  roomTypeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  roomTypePrice: {
    fontSize: 15,
    color: '#5d4940',
    fontWeight: 'bold',
    marginTop: 5,
  },
  roomTypeQuantity: {
    fontSize: 14,
    color: '#666',
    marginTop: 3,
    marginBottom: 10,
  },
  roomImageContainer: {
    marginRight: 10,
  },
  roomImage: {
    width: 150,
    height: 100,
    borderRadius: 8,
  },
  addOnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 8,
  },
  addOnTitle: {
    fontSize: 15,
  },
  addOnPrice: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});