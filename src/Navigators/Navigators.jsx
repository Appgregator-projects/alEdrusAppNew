import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useAppDispatch, useAuthState } from '../Context/context';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Button } from 'native-base';
import DevicesScreen from '../Screens/DevicesScreen';
import PrayerScreen from '../Screens/PrayerScreen';
import * as Location from 'expo-location';
import dayjs from 'dayjs';
import axios from 'axios';

const Tab = createBottomTabNavigator();

const Navigators = () => {
    const { user } = useAuthState();
    const dispatch = useAppDispatch()

	const getLocation = async () => {
		console.log('getting location...')
        let { status } = await Location.getForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log("permission not granted")
            await Location.requestForegroundPermissionsAsync();
        };
        let location = await Location.getCurrentPositionAsync();
        let address = await Location.reverseGeocodeAsync(location.coords);

		if (address) {
			dispatch({
                type : 'UPDATE_ADDRESS',
                payload : {
                    address : address
                }
            });
            return;
		};
	};

    useEffect(()=>{
        getLocation();
    },[])

  return (
    <>
        <Tab.Navigator
            initialRouteName="Prayer"
            screenOptions={({ route }) => ({
            	headerShown : false,
            	tabBarStyle : styles.tabBarStyle,
            	tabBarActiveTintColor : "#FFD600",
            	tabBarIcon: ({ color, size }) => {
            		let iconName;
            		if (route.name === 'Home') {
            			iconName = 'home';
            		} else if (route.name === 'Devices') {
            			iconName = 'add-circle-outline';
            		} else if (route.name === 'Prayer') {
                        return <MaterialCommunityIcons name="hands-pray" size={size} color={color} />
            		}
            		return <Ionicons name={iconName} size={size} color={color} />;
            	},
                    activeTintColor: '#FFD600',
                    tabBarActiveBackgroundColor :"054705",
                    // inactiveTintColor: 'gray',
                    tabBarShowLabel:false,
                })}
			    >
            <Tab.Screen 
            	name="Home" 
            	component={!user ? AuthNavigator  : MainNavigator}
             />
            <Tab.Screen 
            	name="Devices" 
            	component={!user ?  AuthNavigator : DevicesScreen}
             />
            <Tab.Screen 
            	name="Prayer" 
            	component={PrayerScreen}
             />
		</Tab.Navigator>
    </>
         
    );
};

export default Navigators

const styles = StyleSheet.create({
	overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(47,49,54,0.5)',
  },
	tabBarStyle : {
		backgroundColor : "#054705",
		borderTopWidth : 0,
		// marginHorizontal: Dimensions.get('window')*0.2,
		// justifyContent : 'space-evenly',
		// borderRadius:100,
		// position:"absolute",
		// bottom : 7,
		// right : 10,
		// left : 10
	},
})