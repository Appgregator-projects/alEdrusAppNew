import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
	Text,
	Link,
	HStack,
	Center,
	Heading,
	Switch,
	useColorMode,
	NativeBaseProvider,
	extendTheme,
	VStack,
	Box,
	Button,
	Stack,
	Spinner,
	Flex,
	Image,

} from "native-base";
import { FlatList, SafeAreaView, Alert } from "react-native";
import { BleManager } from 'react-native-ble-plx';
import { Dimensions } from 'react-native';
import base64 from "react-native-base64";
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from "./src/Navigators/MainNavigator";
import HomeScreen from './src/Screens/HomeScreen';
import { AppProvider } from "./src/Context/context";

// Define the config
const config = {
	useSystemColorMode: false,
	initialColorMode: "dark",
};

// extend the theme
export const theme = extendTheme({ config });

export default function App() {
	const [bluetoothState, setBluetoothState] = useState(false);
	const [deviceScan, setDeviceScan] = useState(null);
	const [bluetoothValue, setBluetoothValue] = useState(null);
	const [scanning, setScanning] = useState(false);
	const [scannedDevices, setScannedDevices] = useState([]);
	const [connectedDevice, setConnectedDevice]= useState(null);
	const [count, setCount] = useState(0);
	const [autoConnect, setAutoConnect] = useState(false);


	const DEVICE_NAME = 'QB709'

	const Manager = useMemo(() => new BleManager(), [])

	const handleStatusBluetooth = () => {
		Manager.onStateChange((state) => {
		console.log(state, 'state')
		if (state === 'PoweredOn') {
			setBluetoothState(true)
		}
		if (state === 'PoweredOff') {
			setBluetoothState(false)
		}
		}, true)
	};

	const handleScan = () => {
		Manager.stopDeviceScan()
		{!bluetoothState ? Alert.alert("Bluetooth off","Please turn on bluetooth to connect Zikr ring"): 
			Manager.startDeviceScan(null, null, (error, device) => {
					let devices = [];
						setScanning(true)
					if (error) {
						console.log('Error Scanning : ', error)
						 setScanning(false)
					}
					if (device.isConnectable && device.name !== null) {
						console.log(device.name, device.id)
						devices.push({name : device.name, id : device.id})
					}
					setTimeout(()=>{
						Manager.stopDeviceScan()
					}, 5000);
		
					//stop
					// if (device.name === DEVICE_NAME) {
					// 	// setScanning(false)
					// 	Manager.stopDeviceScan()
					// 	setDeviceScan(device)
					// 	//terhubung ke perangkat arduino
					// }
					// console.log(devices, "after")
					setScannedDevices(prevState => [...prevState, ...devices])
			})
		}
	};


	// D0B43DAA-F904-02AC-25C3-7114BC0805A6 this is deviceScan.id for ceramic
	// D0B43DAA-F904-02AC-25C3-7114BC0805A6 this is id for ceramic

	const handleConnect = async (id) => {
		// console.log(deviceScan.id)
		console.log(id)
		// Manager.connectToDevice('68:67:25:EC:47:6A')

		Manager.connectToDevice(id)
		.then(async (device) => {
			await device.discoverAllServicesAndCharacteristics()
			Manager.stopDeviceScan()
			console.log(`Device connected with ${device.name}`)
			console.log(device, 'ini device')
			await device.services().then((service) => {
			for (const ser of service) {
				console.log(service, 'ini service')
				ser.characteristics().then(async (characteristic) => {
				console.log(characteristic, 'ini characteristic')
				// console.log(characteristic[1].serviceUUID, 'ini serviceUUID')
				// console.log(characteristic[1].uuid, 'ini serviceUUID')
				device.monitorCharacteristicForService("0000d0ff-0000-1000-8000-00805f9b34fb", "0000d002-0000-1000-8000-00805f9b34fb", (error, val) => {
					if(val){
						console.log(parseInt(base64.decode(val.value).split(',')[1]), 'ini val')
						setBluetoothValue(parseInt(base64.decode(val.value).split(',')[1]))
					}

					if (error) {
						console.log(error, 'ini error')
						setAutoConnect(!autoConnect)
					}
				})

				}).catch((error) => console.log(error, 'error characteristic'))
			}

			}).catch((error) => { console.log(error, 'ini error service') })

		})
		.catch((error) => console.log(error, 'ini errorr'))
	}

	const handleDisconnect = (device) => {
		console.log(device.id, 'ini id')
		Manager.onDeviceDisconnected(device.id, (error, res) => {
		console.log(res, 'success disconnected')
		setDeviceScan(null)
		if (error) {
			console.log(error)
		}
		})
		setDeviceScan(null)
	};



	useEffect(() => {
		handleStatusBluetooth()

		return () => {
		Manager.destroy()
		}
	}, [])

	useEffect(()=>{
		if (deviceScan){
			setScanning(false)
		}
	},[deviceScan])

	useEffect(()=>{
		handleConnect("9E52F397-5BDF-529A-0915-9BCE9546AA0E");
	},[autoConnect])


	return (
		<NavigationContainer>
			<NativeBaseProvider>
				<AppProvider>
					<MainNavigator />
				</AppProvider>
				{/* <HomeScreen bluetoothState={bluetoothState} setAutoConnect={setAutoConnect}/> */}
			</NativeBaseProvider>
		</NavigationContainer>
	);
}

// Color Switch Component
function ToggleDarkMode() {
	const { colorMode, toggleColorMode } = useColorMode();
	return (
		<HStack space={2} alignItems="center">
			<Text>Theme</Text>
			<Switch
				isChecked={colorMode === "light"}
				onToggle={toggleColorMode}
				aria-label={
					colorMode === "light" ? "switch to dark mode" : "switch to light mode"
				}
			/>
		</HStack>
	);
}
