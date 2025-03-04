import * as React from "react";
import { StatusBar, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "../../screens/Welcome";
import Login from "../../screens/Login";
import Signup from "../../screens/Signup";
import HomeScreen from "../../screens/HomeScreen";
import LandlordHome from "../../screens/LandlordHome";
import PropertyDetailUser from "../../screens/PropertyDetailUser";
import Notifications from "../../screens/Notifications";
import Bookings from "../../screens/Bookings";
import ProfilePage from "../../screens/ProfilePage";
import ConfirmPay from "../../screens/ConfirmPay";
import SuccessPage from "../../screens/SuccessPage";
import EditProfile from "../../screens/EditProfile";
import PropertyList from "../../screens/PropertyList";
import SuccessPagePropertyUpload from "../../screens/SuccessPagePropertyUpload";
import LandlordNotifications from "../../screens/LandlordNotifications";
import YourProperties from "../../screens/YourProperties";
import LandlordProfile from "../../screens/LandlordProfile";
import LandlordEditProfile from "../../screens/LandlordEditProfile";
import VerificationWaiting from "../../screens/VerificationWaiting";
import PropertyCard from "../../screens/PropertyCard";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Welcome"
      >
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="LandlordHome" component={LandlordHome} />
        <Stack.Screen name="PropertyDetailUser"component={PropertyDetailUser}/>
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="Bookings" component={Bookings} />
        <Stack.Screen name="ProfilePage" component={ProfilePage} />
        <Stack.Screen name="ConfirmPay" component={ConfirmPay} />
        <Stack.Screen name="SuccessPage" component={SuccessPage} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="PropertyList" component={PropertyList} />
        <Stack.Screen name="SuccessPagePropertyUpload" component={SuccessPagePropertyUpload}/>
        <Stack.Screen name="LandlordNotifications" component={LandlordNotifications} />
        <Stack.Screen name="YourProperties" component={YourProperties} />
        <Stack.Screen name="LandlordProfile" component={LandlordProfile} />
        <Stack.Screen name="LandlordEditProfile" component={LandlordEditProfile}/>
        <Stack.Screen name="VerificationWaiting" component={VerificationWaiting}/>
        <Stack.Screen name="PropertyCard" component={PropertyCard} />
      </Stack.Navigator>
    </>
  );
};

export default App;
