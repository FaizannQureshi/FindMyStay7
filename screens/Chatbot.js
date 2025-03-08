import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { id: '1', text: 'Welcome to our hostel! How can I help you today?', isBot: true },
  ]);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef(null);

  // Simple response logic - expand this based on your needs
  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('book') || message.includes('reservation')) {
      return "To make a booking, please specify your check-in date, duration of stay, and room preference. You can also use our booking section in the app.";
    }
    
    if (message.includes('price') || message.includes('cost') || message.includes('rate')) {
      return "Our rates start from $20/night for dormitory rooms and $50/night for private rooms. Prices may vary based on season and availability.";
    }
    
    if (message.includes('checkin') || message.includes('check-in') || message.includes('check in')) {
      return "Check-in time is from 2 PM onwards. Early check-in is subject to availability.";
    }
    
    if (message.includes('checkout') || message.includes('check-out') || message.includes('check out')) {
      return "Check-out time is 11 AM. Late check-out can be arranged subject to availability.";
    }
    
    if (message.includes('facilities') || message.includes('amenities')) {
      return "We offer free Wi-Fi, communal kitchen, laundry facilities, 24/7 reception, and a common room with TV and games.";
    }
    
    if (message.includes('location') || message.includes('address') || message.includes('directions')) {
      return "We're located at [Your Address]. The nearest public transport is [Station/Stop Name]. Would you like directions from your current location?";
    }
    
    return "I'm not sure I understand. Could you please rephrase your question? You can ask about bookings, prices, check-in/out times, facilities, or location.";
  };

  const handleSend = () => {
    if (inputText.trim() === '') return;

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      text: inputText.trim(),
      isBot: false,
    };

    // Get bot response
    const botResponse = {
      id: (Date.now() + 1).toString(),
      text: getBotResponse(inputText),
      isBot: true,
    };

    setMessages(prevMessages => [...prevMessages, userMessage, botResponse]);
    setInputText('');

    // Scroll to bottom
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 200);
  };

  const renderMessage = ({ item }) => (
    <View style={[
      styles.messageBubble,
      item.isBot ? styles.botBubble : styles.userBubble
    ]}>
      <Text style={[
        styles.messageText,
        item.isBot ? styles.botText : styles.userText
      ]}>
        {item.text}
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
        <View>
            <Text style={styles.title}>
                FindMyStay BOT
            </Text>
        </View>
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        style={styles.messageList}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type your message..."
          placeholderTextColor="#666"
          onSubmitEditing={handleSend}
        />
        <TouchableOpacity 
          style={styles.sendButton} 
          onPress={handleSend}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: '50',
    paddingBottom: '60',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  messageList: {
    flex: 1,
    padding: 10,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 20,
    marginVertical: 5,
  },
  botBubble: {
    backgroundColor: '#e3e3e3',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 5,
  },
  userBubble: {
    backgroundColor: '#007AFF',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 5,
  },
  messageText: {
    fontSize: 16,
  },
  botText: {
    color: '#000',
  },
  userText: {
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 15,
    paddingBottom: 25,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e3e3e3',
  },
  input: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ChatBot;