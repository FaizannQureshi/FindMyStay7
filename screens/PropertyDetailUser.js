import React, { useState } from 'react';
import { ScrollView, Modal, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
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
  PreviewImage,
  PreviewSection,
  Button,
  ButtonSecondary,
  ButtonText,
  SectionHeading,
  PreviewImages,
  ButtonsRow,
} from '../styles/PropertyDetailStylesUser';
import { useNavigation } from "@react-navigation/native";


const PropertyDetail = ({ route, navigation }) => {
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const [selectedDates, setSelectedDates] = useState([]);
  const [isGuestModalVisible, setGuestModalVisible] = useState(false);
  const [numberOfPeople, setNumberOfPeople] = useState(2);
  const [numberOfRooms, setNumberOfRooms] = useState(1);

  // Correctly access the property from route params
  const property = route.params?.property || {};

  const toggleCalendar = () => {
    setCalendarVisible(!isCalendarVisible);
  };

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

  const toggleGuestModal = () => {
    setCalendarVisible(false);
    setGuestModalVisible(!isGuestModalVisible);
  };

  const handleBookingDetails = () => {
    console.log(`Number of People: ${numberOfPeople}, Number of Rooms: ${numberOfRooms}`);
    toggleGuestModal();
  };

  return (
    <>
      <ScrollViewStyled >
        <Header>
          <BackButton onPress={() => navigation.goBack()}>
            <Icon name="arrow-back-ios" size={24} color="#000" />
          </BackButton>
          <HeaderTitle>Property Detail</HeaderTitle>
          <OptionsButton>
            <Icon name="more-vert" size={24} color="#000" />
          </OptionsButton>
        </Header>

        <ImageStyled 
          source={{ 
            uri: property.image || 'https://t4.ftcdn.net/jpg/02/19/66/93/360_F_219669327_v12pBKc7TB62E3uCJrgRRkDhfVENK3z5.jpg' 
          }} 
        />

        <Features>
          <FeatureItem>
            <Icon name="wifi" size={20} color="#000" />
            <FeatureText>Free Wifi</FeatureText>
          </FeatureItem>
          <FeatureItem>
            <Icon name="free-breakfast" size={20} color="#000" />
            <FeatureText>Free Breakfast</FeatureText>
          </FeatureItem>
          <FeatureItem>
            <Icon name="star" size={20} color="#FFD700" />
            <FeatureText>{property.rating || '4.7'}</FeatureText>
          </FeatureItem>
        </Features>

        <Details>
          <TitleRow>
            <Title>{property.title || 'Zaviar Hostel For Boys'}</Title>
          </TitleRow>
          <TitleRow>
            <Price>{property.price || 'Rs 8000 /month'}</Price>
          </TitleRow>
          <Subtitle>
            <Icon name="location-on" size={16} color="#666" />
            {property.location || 'G-10/Islamabad'}
          </Subtitle>
          <DescriptionHeading>Description</DescriptionHeading>
          <Description>
            {property.title}Offers a clean, comfortable, and secure environment in {property.location}. 
            With spacious rooms, high-speed WiFi, 24/7 security, and freshly prepared meals, 
            it's an ideal choice for students and professionals seeking a cozy and convenient stay.
          </Description>
        </Details>

        <PreviewSection>
          <SectionHeading>Preview</SectionHeading>
          <PreviewImages>
            <PreviewImage source={{ uri: 'https://doonpublicschool.in/content/hostel.JPG' }} />
            <PreviewImage source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTGWD_RCV7tDbAPA_iVSWalOjpaYxfTxYjT4fe1podWxYJFRu_LYnt1yPdWD1n7v5xF7I&usqp=CAU' }} />
            <PreviewImage source={{ uri: 'https://media.istockphoto.com/id/182498079/photo/youth-hostel-dorm-room.jpg?s=612x612&w=0&k=20&c=HDbm6aOu-IxfLkU47lEQ9aBkDBGijPjtzokB74J5AMw=' }} />
          </PreviewImages>
        </PreviewSection>

        <ButtonsRow>
          <Button onPress={toggleCalendar}>
            <ButtonText>Book Now</ButtonText>
          </Button>
          <ButtonSecondary onPress={() => {}}>
            <ButtonText>Virtual Tour</ButtonText>
          </ButtonSecondary>
        </ButtonsRow>
      </ScrollViewStyled>

      {/* Calendar Modal */}
      {isCalendarVisible && (
        <Modal transparent animationType="fade" visible={isCalendarVisible}>
          <BlurView intensity={50} style={StyleSheet.absoluteFill}>
            <View style={styles.modalContainer}>
              <View style={styles.calendarBox}>
                <View style={styles.calendarHeader}>
                  <Text style={styles.headerText}>Select Date</Text>
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
        selectedColor: '#5d4940', // Correct color for the selected date
      };
      return acc;
    }, {}),
    [new Date().toISOString().split('T')[0]]: { 
      selected: true, 
      marked: true, 
      selectedColor: '#5d4940' 
    }, // Ensure current date is styled
  }}
  theme={{
    arrowColor: '#5d4940', // Ensures arrow color is the desired color
    todayTextColor: '#5d4940', // Ensures current day's text color
    selectedDayBackgroundColor: '#5d4940', // Background for selected day
    selectedDayTextColor: '#fff', // Text color for selected day
    textDayFontSize: 16,
    textMonthFontWeight: 'bold',
  }}
/>


                <TouchableOpacity style={styles.selectButton} onPress={toggleGuestModal}>
                  <Text style={styles.selectButtonText}>Booking Details</Text>
                </TouchableOpacity>
              </View>
            </View>
          </BlurView>
        </Modal>
      )}

      {/* Booking Details Modal */}
      {isGuestModalVisible && (
        <Modal transparent animationType="fade" visible={isGuestModalVisible}>
          <BlurView intensity={50} style={StyleSheet.absoluteFill}>
            <View style={styles.modalContainer}>
              <View style={styles.guestBox}>
                <View style={styles.guestHeader}>
                  <Text style={styles.headerText}>Booking Details</Text>
                  <TouchableOpacity onPress={toggleGuestModal}>
                    <Icon name="close" size={24} color="#000" />
                  </TouchableOpacity>
                </View>

                <View style={styles.guestSection}>
                  <Text style={styles.sectionLabel}>Number of People</Text>
                  <View style={styles.guestControl}>
                    <TouchableOpacity onPress={() => setNumberOfPeople(Math.max(1, numberOfPeople - 1))}>
                      <Icon name="remove" size={24} color="#000" />
                    </TouchableOpacity>
                    <Text style={styles.guestCount}>{numberOfPeople}</Text>
                    <TouchableOpacity onPress={() => setNumberOfPeople(numberOfPeople + 1)}>
                      <Icon name="add" size={24} color="#000" />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.guestSection}>
                  <Text style={styles.sectionLabel}>Number of Rooms</Text>
                  <View style={styles.guestControl}>
                    <TouchableOpacity onPress={() => setNumberOfRooms(Math.max(1, numberOfRooms - 1))}>
                      <Icon name="remove" size={24} color="#000" />
                    </TouchableOpacity>
                    <Text style={styles.guestCount}>{numberOfRooms}</Text>
                    <TouchableOpacity onPress={() => setNumberOfRooms(numberOfRooms + 1)}>
                      <Icon name="add" size={24} color="#000" />
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity style={styles.selectButton} onPress={() => {
                setGuestModalVisible(false);
                setCalendarVisible(false);
                navigation.navigate('ConfirmPay');}}>
                  <Text style={styles.selectButtonText}>Next</Text>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarBox: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  selectButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#5d4940',
    borderRadius: 10,
    alignItems: 'center',
  },
  selectButtonText: {
    color: 'white',
    fontSize: 16,
  },
  guestBox: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  guestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  guestSection: {
    marginVertical: 10,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },

guestControl: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Ensures even spacing
    paddingHorizontal: 10, // Adds space within
    paddingVertical: 5,
    borderWidth: 1, // Optional: Adds a border for better visibility
    borderRadius: 8,
    borderColor: '#ccc', // Optional: Border color
  },
  guestCount: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
});
