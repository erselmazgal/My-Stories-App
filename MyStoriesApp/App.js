//import { StatusBar } from 'expo-status-bar';
import React from 'react';
import 'react-native-gesture-handler';
import AuthLoadingScreen from "./screen/AuthLoadingScreen"
import MainFeed from "./navigation/MainNavigation"
import Login from "./screen/Login"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
Stack.Navigator.defaultProps = {
  headerMode: 'none', 
};
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AuthLogin">
        <Stack.Screen name="AuthLogin" component={AuthLoadingScreen} />
        <Stack.Screen name="Home" component={MainFeed} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

