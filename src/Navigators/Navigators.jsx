import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useAppDispatch, useAuthState } from '../Context/context';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Button } from 'native-base';
import DevicesScreen from '../Screens/DevicesScreen';
import PrayerScreen from '../Screens/PrayerScreen';
import * as Location from 'expo-location';
import dayjs from 'dayjs';
import axios from 'axios';
import QiblaScreen from '../Screens/QiblaScreen';
import * as Notifications from "expo-notifications";

const Tab = createBottomTabNavigator();

const Navigators = () => {
    const { user } = useAuthState();
    const dispatch = useAppDispatch();
    const notificationListener = useRef();
    const responseListener = useRef();

	const getLocation = async () => {
		console.log('getting location...')
        let { status } = await Location.getForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log("permission not granted")
            await Location.requestForegroundPermissionsAsync();
        } else {
            console.log("permission granted")
            const coords = {
                "latitude": -5.147665,
                "longitude": 119.361992,
            };

            let location = await Location.getCurrentPositionAsync();
            let address = await Location.reverseGeocodeAsync(location.coords);
            // let address = await Location.reverseGeocodeAsync(coords);
            // console.log(address, "address")
            // console.log(location, "location")
            if (address) {
                dispatch({
                    type : 'UPDATE_ADDRESS',
                    payload : {
                        address : address
                    }
                });
                dispatch({
                    type : "UPDATE_LOCATION",
                    payload : {
                        location : location
                    }
                })
                return;
            };
        };
	};

    useEffect(()=>{
        getLocation();

            // This listener is fired whenever a notification is received while the app is foregrounded
            notificationListener.current =
            Notifications.addNotificationReceivedListener((notification) => {
            // setNotification(notification);
            // console.log(notification,'this is data inside notifcation listener')
            notifShow({
                title: notification.request.content.title,
                message: notification.request.content.body,
                color: "success",
                duration: 4000,
            });
            });

        responseListener.current =
            Notifications.addNotificationResponseReceivedListener((response) => {
            //mau di apain ini ?
            console.log("responsenotificationresponsereceived", response);
            });

        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current =
            Notifications.addNotificationResponseReceivedListener((response) => {
            console.log(response);
        });
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
            		} else if (route.name === 'Qibla') {
                        return <FontAwesome5 name="kaaba" size={size} color={color} />
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
            	component={MainNavigator}
             />
            <Tab.Screen 
            	name="Devices" 
            	component={!user ?  AuthNavigator : DevicesScreen}
             />
            <Tab.Screen 
            	name="Prayer" 
            	component={PrayerScreen}
             />
            <Tab.Screen 
            	name="Qibla" 
            	component={QiblaScreen}
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