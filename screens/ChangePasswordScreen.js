// import React, { useState } from "react";
// import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
// import { getAuth, reauthenticateWithCredential, EmailAuthProvider, updatePassword, signOut } from "firebase/auth";
// import styles from "../styles/ChangePasswordStyles";

// const ChangePasswordScreen = ({ navigation }) => {
//   const [oldPassword, setOldPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const auth = getAuth();
//   const user = auth.currentUser;

//   const handleChangePassword = async () => {
//     if (!oldPassword || !newPassword) {
//       Alert.alert("Error", "Please fill in both fields.");
//       return;
//     }

//     if (newPassword.length < 6) {
//       Alert.alert("Error", "New password should be at least 6 characters.");
//       return;
//     }

//     try {
//       // Re-authenticate user
//       const credential = EmailAuthProvider.credential(user.email, oldPassword);
//       await reauthenticateWithCredential(user, credential);

//       // Update password
//       await updatePassword(user, newPassword);
//       Alert.alert("Success", "Password updated successfully! Please log in again.");
      
//       // Log out user
//       await signOut(auth);
//       navigation.navigate("Login");

//     } catch (error) {
//       console.error("Error changing password:", error);
//       Alert.alert("Error", "Old password is incorrect. Please try again.");
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Change Password</Text>

//       <Text style={styles.label}>Old Password</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter Old Password"
//         secureTextEntry
//         value={oldPassword}
//         onChangeText={setOldPassword}
//       />

//       <Text style={styles.label}>New Password</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter New Password"
//         secureTextEntry
//         value={newPassword}
//         onChangeText={setNewPassword}
//       />

//       <TouchableOpacity style={styles.updateButton} onPress={handleChangePassword}>
//         <Text style={styles.updateButtonText}>Update Password</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default ChangePasswordScreen;
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { 
  getAuth, 
  reauthenticateWithCredential, 
  EmailAuthProvider, 
  updatePassword, 
  signOut 
} from "firebase/auth";
import styles from "../styles/ChangePasswordStyles";

const ChangePasswordScreen = ({ navigation }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const auth = getAuth();
  const user = auth.currentUser;

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword) {
      Alert.alert("Error", "Please fill in both fields.");
      return;
    }

    // Password validation: At least one uppercase, one number, one special character, and 8+ characters
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    
    if (!passwordRegex.test(newPassword)) {
      Alert.alert("Invalid Password", "Password must be at least 8 characters long and include:\n• One uppercase letter\n• One number\n• One special character.");
      return;
    }

    try {
      // Re-authenticate user
      const credential = EmailAuthProvider.credential(user.email, oldPassword);
      await reauthenticateWithCredential(user, credential);

      // Update password
      await updatePassword(user, newPassword);
      Alert.alert("Success", "Password updated successfully! Please log in again.");
      
      // Log out user
      await signOut(auth);
      navigation.navigate("Login");

    } catch (error) {
      console.error("Error changing password:", error);
      Alert.alert("Error", "Old password is incorrect. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change Password</Text>

      <Text style={styles.label}>Old Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Old Password"
        secureTextEntry
        value={oldPassword}
        onChangeText={setOldPassword}
      />

      <Text style={styles.label}>New Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter New Password"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />

      <TouchableOpacity style={styles.updateButton} onPress={handleChangePassword}>
        <Text style={styles.updateButtonText}>Update Password</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChangePasswordScreen;
