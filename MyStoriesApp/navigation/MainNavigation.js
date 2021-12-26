import React from 'react';
import 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { StyleSheet, Text, View, Image, StatusBar } from 'react-native';
import HomePage from '../screen/homeScreen';
import SearchScreen from '../screen/searchScreen';
import ProfileScreen from '../screen/profileScreen';
import SettingScreen from '../screen/settingScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
// const avatar = require('../assets/maxresdefault.jpg');


const Tab = createMaterialBottomTabNavigator();
const Drawer = createDrawerNavigator();

function Home() {
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Home') {
                    iconName = focused
                        ? 'md-home'
                        : 'md-home';
                } else if (route.name === 'Search') {
                    iconName = focused ? 'md-search' : 'md-search';
                } else if (route.name === 'Profile') {
                    iconName = focused ? 'md-person' : 'md-person';
                }

                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
            },
        })}
            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
            }}>
            <Tab.Screen name="Home" component={HomePage} />
            <Tab.Screen name="Search" component={SearchScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}

export default function AppContainer(props) {
    return (
        // </NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Setting" component={SettingScreen} />
        </Drawer.Navigator>

    );
}

const styles = StyleSheet.create({
    profilImage: {
        width: 250,
        height: 200,
        borderRadius: 100,
        overflow: "hidden"
    },
    image: {
        flex: 1,
        width: undefined,
        height: undefined
    }
});
