import { createStackNavigator } from '@react-navigation/stack';
import React, { useMemo } from 'react'
import HomeScreen from '../Screens/HomeScreen';
import DevicesScreen from '../Screens/DevicesScreen';
import DeviceCounterScreen from '../Screens/DeviceCounterScreen';
import { BleManager } from 'react-native-ble-plx';


const Stack = createStackNavigator();


function MainNavigator() {



	return (
		<Stack.Navigator
				initialRouteName='MainScreen'
				screenOptions={{
					headerShown : false
				}}
		>
				<Stack.Screen name="MainScreen" component={HomeScreen} />
				<Stack.Screen name="Devices" component={DevicesScreen} />
				<Stack.Screen name="DeviceCounter" component={DeviceCounterScreen} />
		</Stack.Navigator>
	);
}

export default MainNavigator;