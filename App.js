import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Screens/Auth/Login/Login';
import Signup from './Screens/Auth/Signup/Signup';
import AccountSetup from './Screens/Auth/Signup/AccountSetup';
import ProfileImage from './Screens/Auth/Signup/ProfileImage';

const Stack = createNativeStackNavigator(); // Use only one stack navigator

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{
              headerShown: false,
            }}/>
        <Stack.Screen name="Signup" component={Signup} options={{
              headerShown: false,
            }}/>
        <Stack.Screen name="AccountSetup" component={AccountSetup} options={{
              headerShown: false,
            }}/>
        <Stack.Screen name="ProfileImage" component={ProfileImage} options={{
              headerShown: false,
            }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
